import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setToken, setUser } from "../utils/auth";
import qr from "../assets/qr.png";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [transactionId, setTransactionId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentImage, setPaymentImage] = useState(null);
  const [showApprovalMessage, setShowApprovalMessage] = useState(false);
  const formData = location.state?.formData;

  React.useEffect(() => {
    if (!formData || formData.college === "kluniversity") {
      navigate("/register");
    }
  }, [formData, navigate]);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "midland");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/vishnu2005/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let paymentImageUrl = "";
      if (paymentImage) {
        paymentImageUrl = await handleImageUpload(paymentImage);
      }

      const dataToSubmit = {
        ...formData,
        paymentId: transactionId,
        college: formData.otherCollegeName,
        paymentScreenshot: paymentImageUrl,
      };

      const response = await fetch(
        "https://surabhi-final.onrender.com/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSubmit),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      if (data.paymentStatus === "pending") {
        setShowApprovalMessage(true);
      } else {
        setToken(data.token);
        setUser({
          fullName: data.fullName,
          email: data.email,
          college: data.college,
          collegeId: data.collegeId,
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (showApprovalMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-6">
        <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-purple-500/20">
          <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center">
            Registration Pending
          </h2>
          <div className="text-gray-300 space-y-4">
            <p className="text-center">
              Your registration is currently pending admin approval.
            </p>
            <p className="text-center">
              Please wait while we verify your payment details.
            </p>
            <p className="text-center">
              You will be notified once your registration is approved.
            </p>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="mt-8 w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-purple-900 transition duration-300 shadow-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-purple-500/20">
        <h2 className="text-3xl font-bold text-purple-400 text-center mb-8">
          Complete Payment
        </h2>

        <div className="bg-black p-6 rounded-xl mb-8">
          <img
            src={qr}
            alt="Payment QR Code"
            className="w-64 h-64 mx-auto rounded-lg shadow-lg"
          />
          <p className="text-purple-300 text-center mt-4 font-medium">
            Scan QR code to pay ₹500
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="transactionId"
              className="block text-purple-300 mb-2 font-medium"
            >
              Transaction ID
            </label>
            <input
              type="text"
              id="transactionId"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-black border border-purple-500/30 text-white focus:outline-none focus:border-purple-500 transition duration-200"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor="paymentScreenshot"
              className="block text-purple-300 mb-2 font-medium"
            >
              Payment Screenshot
            </label>
            <input
              type="file"
              id="paymentScreenshot"
              accept="image/*"
              onChange={(e) => setPaymentImage(e.target.files[0])}
              className="w-full px-4 py-3 rounded-lg bg-black border border-purple-500/30 text-white focus:outline-none focus:border-purple-500 transition duration-200"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-purple-900 transition duration-300 disabled:opacity-50 shadow-lg mt-8"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              "Complete Registration"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
