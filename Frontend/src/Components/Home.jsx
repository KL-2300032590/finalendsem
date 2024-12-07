import React from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import video from "../assets/intro3.mp4";
import logo from "../assets/logo.png";
import poster2025 from "../assets/2025.jpg";
import poster2024 from "../assets/2024.jpg";
import poster2023 from "../assets/2023.jpg";
import poster2022 from "../assets/2022.jpg";
import { loadSlim } from "tsparticles-slim";
import Particles from "react-tsparticles";
const timelineData = [
  {
    year: 2025,
    title: "The Future",
    description:
      "Celebrating cultural diversity with groundbreaking performances",
    image: poster2025,
  },
  {
    year: 2024,
    title: "New Heights",
    description: "Introduced new art forms and collaborative performances",
    image: poster2024,
  },
  {
    year: 2023,
    title: "Growing Strong",
    description:
      "Expanded to include international participants and professional artists",
    image: poster2023,
  },
  {
    year: 2022,
    title: "The Beginning",
    description:
      "First edition of Surabhi with over 1000 participants from across India",
    image: poster2022,
  },
];

const videoTeasers = [
  {
    title: "Dance Performances",
    thumbnail: poster2024,
    description: "Spectacular dance performances from previous years",
  },
  {
    title: "Music Shows",
    thumbnail: poster2023,
    description: "Mesmerizing musical performances",
  },
  {
    title: "Cultural Events",
    thumbnail: poster2025,
    description: "Highlights of our cultural celebrations",
  },
];

const Home = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 102,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="relative w-full">
      <div className="bg-black text-white overflow-x-hidden">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fullScreen: {
              enable: true,
              zIndex: -100,
            },
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 120,
            particles: {
              number: {
                value: 50,
                density: {
                  enable: true,
                  value_area: 900,
                },
              },
              color: {
                value: ["#e9d5ff", "#d8b4fe"], // Light purple colors
              },
              shape: {
                type: "circle",
              },
              opacity: {
                value: 0.5, // Reduced opacity
                random: false,
                animation: {
                  enable: true,
                  speed: 1,
                  minimumValue: 0.2,
                  sync: false,
                },
              },
              size: {
                value: 4,
                random: {
                  enable: true,
                  minimumValue: 2,
                },
                animation: {
                  enable: true,
                  speed: 2,
                  minimumValue: 2,
                  sync: false,
                },
              },
              move: {
                enable: true,
                speed: 1.5,
                direction: "none",
                random: false,
                straight: false,
                outModes: {
                  default: "out",
                },
                attract: {
                  enable: false,
                },
              },
            },
            interactivity: {
              detectsOn: "canvas",
              events: {
                onHover: {
                  enable: true,
                  mode: "grab",
                },
                onClick: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                grab: {
                  distance: 150,
                  links: {
                    opacity: 0.8, // Reduced link opacity
                  },
                },
              },
            },
            detectRetina: true,
          }}
          className="absolute inset-0 z-0 hidden md:block pointer-events-none"
        />
        <div
          className="relative min-h-screen flex items-center justify-center bg-black p-4"
          ref={containerRef}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full rounded-3xl h-full object-cover"
          >
            <source src={video} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-black/70" />
          <motion.img
            src={logo}
            alt="SURABHI"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-48 object-contain sm:w-64 md:w-96 z-10"
          />
        </div>
        <div className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-4 z-50 gap-4 text-center"
            >
              <div className="bg-purple-900/20 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-4xl md:text-6xl font-bold flip-card">
                  {String(timeLeft.days).padStart(2, "0")}
                </div>
                <div className="text-sm mt-2">Days</div>
              </div>
              <div className="bg-purple-900/20 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-4xl md:text-6xl font-bold flip-card">
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <div className="text-sm mt-2">Hours</div>
              </div>
              <div className="bg-purple-900/20 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-4xl md:text-6xl font-bold flip-card">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>
                <div className="text-sm mt-2">Minutes</div>
              </div>
              <div className="bg-purple-900/20 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-4xl md:text-6xl font-bold flip-card">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
                <div className="text-sm mt-2">Seconds</div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
          <motion.h1
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-saint-carell font-bold mb-6 md:mb-8 text-center text-white"
          >
            What about Surabhi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-300 max-w-3xl mx-auto z-50 text-center px-4"
          >
            Surabhi 2025 is a two-day National cultural fest at KL University
            that highlights student creativity through music, dance, drama, and
            artistic expressions. With renowned artists and exceptional student
            talent, this event embodies diversity in a supportive and vibrant
            environment. This year, we are dedicated to overcoming past
            challenges to provide an enriched experience for participants and
            attendees.
          </motion.p>
        </div>

        {/* Video Teasers Section */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-saint-carell font-bold mb-12 text-center z-50"
          >
            Event Highlights
          </motion.h2>
          <div className="grid grid-cols-1 z-50 md:grid-cols-3 gap-8">
            {videoTeasers.map((teaser, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-purple-900/20 rounded-lg overflow-hidden"
              >
                <img
                  src={teaser.thumbnail}
                  alt={teaser.title}
                  className="w-full h-48 z-50 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 ">
                  <h3 className="text-xl font-bold  text-purple-300 mb-2">
                    {teaser.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{teaser.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative max-w-6xl mx-auto px-4 py-16"
          style={{ overflow: "hidden" }}
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-saint-carell font-bold mb-12 text-center z-50"
          >
            Our Journey
          </motion.h2>

          <div className="relative">
            {/* Timeline line */}
            <motion.div
              className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 w-1 h-full bg-purple-900"
              style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
            />

            {/* Timeline items */}
            {timelineData.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`flex flex-col  sm:flex-row items-start sm:items-center mb-16 sm:mb-24 ${
                  index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                <div className="w-full sm:w-1/2 pl-12 sm:px-8 mb-4 sm:mb-0">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="rounded-lg z-50 shadow-xl w-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="w-full sm:w-1/2 pl-12 sm:px-8">
                  <div className="bg-purple-900/20 p-4 sm:p-6 rounded-lg">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">
                      {item.year}
                    </h3>
                    <h4 className="text-lg sm:text-xl text-purple-400 mb-3">
                      {item.title}
                    </h4>
                    <p className="text-sm sm:text-base text-gray-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full py-12 sm:py-16 px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-saint-carell font-bold mb-8 sm:mb-12 text-center z-50  "
          >
            Find Us Here
          </motion.h2>
          <div className="max-w-6xl flex justify-center rounded-2xl mx-auto h-[300px] sm:h-[400px] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.6199592497847!2d80.62045731486546!3d16.441945088657577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35f0a2a7d81943%3A0x8ba5d78f65df94b8!2sK%20L%20University!5e0!3m2!1sen!2sin!4v1677834271952!5m2!1sen!2sin&key=YOUR_GOOGLE_MAPS_API_KEY"
              width="80%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="rounded-2xl z-50"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
