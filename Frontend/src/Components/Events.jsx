import React, { useState, useEffect } from "react";
import poster1 from "../assets/2025.jpg";
import axios from "axios";
import { IoLocationSharp } from "react-icons/io5";
import { IoCalendarClear } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [error, setError] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "https://surabhi-final.onrender.com/api/events"
      );
      const data = response.data;
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to load events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCategoryClick = (chartIndex, catIndex) => {
    const categoryId = `${chartIndex}-${catIndex}`;
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleRegisterClick = (categoryId, event) => {
    setSelectedEvent({ ...event, categoryId });
    setShowRegisterPopup(true);
  };

  const handleRegistrationSubmit = async () => {
    if (!acceptedTerms) {
      alert("Please accept the terms and conditions");
      return;
    }

    if (!selectedEvent || !selectedEvent.categoryId || !selectedEvent._id) {
      alert("Invalid event data");
      return;
    }

    setRegistrationStatus({ loading: true, error: null, success: false });

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to register for events");
        navigate("/login");
        return;
      }

      const response = await axios.put(
        `https://surabhi-final.onrender.com/api/events/${selectedEvent.categoryId}/events/${selectedEvent._id}/register`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setRegistrationStatus({ loading: false, error: null, success: true });
        setShowRegisterPopup(false);
        setShowSuccessPopup(true);
        setSelectedEvent(null);
        setAcceptedTerms(false);
        fetchEvents();
      }
    } catch (error) {
      console.error("Registration error:", error);
      setRegistrationStatus({
        loading: false,
        error: error.response?.data?.message || "Failed to register for event",
        success: false,
      });
    }
  };

  const SuccessPopup = () => (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-xl max-w-md w-full mx-4">
        <h3 className="text-2xl font-bold text-green-400 mb-4">Success!</h3>
        <p className="text-gray-300 mb-6">Successfully registered for event!</p>
        <button
          onClick={() => setShowSuccessPopup(false)}
          className="w-full bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-all duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );

  const RegisterPopup = () => (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-xl max-w-md w-full mx-4">
        <h3 className="text-2xl font-bold text-purple-400 mb-4">
          Register for {selectedEvent?.title}
        </h3>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-2">
            Event Details:
          </h4>
          <p className="text-gray-300">
            Venue: {selectedEvent?.details?.venue}
          </p>
          <p className="text-gray-300">Date: {selectedEvent?.details?.date}</p>
          <p className="text-gray-300">Time: {selectedEvent?.details?.time}</p>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-2">
            Terms and Conditions:
          </h4>
          <div className="bg-gray-700 p-4 rounded-md mb-4 max-h-40 overflow-y-auto text-gray-300 text-sm">
            {selectedEvent?.termsandconditions ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: selectedEvent.termsandconditions,
                }}
              />
            ) : (
              <p>
                1. By registering for this event, you agree to follow all event
                guidelines and rules.
              </p>
            )}
          </div>
          <label className="flex items-center gap-2 text-white cursor-pointer">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="rounded border-gray-300 text-purple-500 focus:ring-purple-500"
            />
            I accept the terms and conditions
          </label>
        </div>

        {registrationStatus.error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-100">
            {registrationStatus.error}
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={handleRegistrationSubmit}
            disabled={!acceptedTerms || registrationStatus.loading}
            className={`flex-1 bg-purple-500 text-white px-6 py-2 rounded-md transition-all duration-300 
              ${
                !acceptedTerms || registrationStatus.loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-purple-600"
              }`}
          >
            {registrationStatus.loading
              ? "Registering..."
              : "Confirm Registration"}
          </button>
          <button
            onClick={() => {
              setShowRegisterPopup(false);
              setSelectedEvent(null);
              setAcceptedTerms(false);
              setRegistrationStatus({
                loading: false,
                error: null,
                success: false,
              });
            }}
            className="px-6 py-2 border border-gray-500 text-gray-300 rounded-md hover:bg-gray-700 transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="flex justify-center items-center pt-14">
        <h1 className="text-4xl font-bold text-purple-400">Events</h1>
      </div>
      <div className="max-w-6xl mx-auto">
        {error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          events.map((chart, chartIndex) => (
            <div key={chartIndex} className="mb-12">
              <div className="border-b-2 border-purple-500 mb-6">
                <h2 className="text-2xl font-bold text-purple-400 mb-4">
                  {chart.categoryName}
                </h2>
              </div>

              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-purple-500"></div>

                <div className="space-y-8">
                  {chart.Events &&
                    chart.Events.map((event, eventIndex) => (
                      <div key={eventIndex} className="flex items-start ml-8">
                        <div className="absolute left-4 -ml-6 mt-2">
                          <div className="w-4 h-4 bg-purple-500 rounded-full relative">
                            <div className="absolute w-4 h-4 bg-purple-500 rounded-full animate-ping opacity-75"></div>
                          </div>
                        </div>

                        <div
                          className={`bg-gray-800 rounded-lg p-4 w-full cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:bg-gray-700 ${
                            expandedCategory === `${chartIndex}-${eventIndex}`
                              ? "ring-2 ring-purple-500"
                              : ""
                          }`}
                          onClick={() =>
                            handleCategoryClick(chartIndex, eventIndex)
                          }
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-purple-300">
                              {event.title}
                            </h3>
                            <div
                              className={`transform transition-transform duration-300 ${
                                expandedCategory ===
                                `${chartIndex}-${eventIndex}`
                                  ? "rotate-180"
                                  : ""
                              }`}
                            >
                              ▼
                            </div>
                          </div>

                          <div
                            className={`transition-all duration-500 ease-in-out ${
                              expandedCategory === `${chartIndex}-${eventIndex}`
                                ? "max-h-[800px] opacity-100 mt-4"
                                : "max-h-0 opacity-0 overflow-hidden"
                            }`}
                          >
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                              <div className="w-full md:w-1/3">
                                <img
                                  src={event.image}
                                  alt={event.title}
                                  className="w-full h-48 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                                />
                              </div>
                              <div className="flex-1 space-y-4">
                                <h4 className="text-xl text-purple-300 font-semibold">
                                  {event.title}
                                </h4>
                                <p className="text-gray-300">
                                  {event.details.description}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 text-sm">
                                  <div className="flex items-center">
                                    <IoLocationSharp className="text-purple-400" />
                                    <span className="ml-2">
                                      {event.details.venue}
                                    </span>
                                  </div>
                                  <div className="flex items-center">
                                    <IoCalendarClear className="text-purple-400" />
                                    <span className="ml-2">
                                      {event.details.date}
                                    </span>
                                  </div>
                                  <div className="flex items-center">
                                    <IoCalendarClear className="text-purple-400" />
                                    <span className="ml-2">
                                      {event.details.time}
                                    </span>
                                  </div>
                                </div>
                                {event.registeredStudents?.includes(
                                  localStorage.getItem("userId")
                                ) ? (
                                  <button
                                    disabled
                                    className="bg-gray-500 text-white px-6 py-2 rounded-md cursor-not-allowed"
                                  >
                                    Already Registered
                                  </button>
                                ) : (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRegisterClick(chart._id, event);
                                    }}
                                    className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                                  >
                                    Register Now
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {showRegisterPopup && <RegisterPopup />}
      {showSuccessPopup && <SuccessPopup />}
    </div>
  );
};

export default Events;
