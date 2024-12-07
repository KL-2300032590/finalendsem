import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram, FaLinkedin, FaChevronDown } from "react-icons/fa";
import poster2024 from "../assets/chief.jpg";
const Team = () => {
  const [selectedMember, setSelectedMember] = useState(
    "Design and Vfx Committee"
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const teamCategories = [
    "Chief Executive Officer",
    "Chief Secretary",
    "Joint Secretary",
    "Student Coordinator",
    "Treasurer",
    "Design and Vfx Committee",
    "Broadcasting Committee",
    "Campus Relations Committee",
    "Events Committee",
    "Hospitality Committee",
    "HR & Communication Committee",
    "Logistics Committee",
    "PR & Marketing Committee",
    "Registration & Certifications Committee",
    "Sponsorship Committee",
    "Stage Management Committee",
    "Transportation Committee",
    "Website Committee",
    "Emergency Response Committee",
    "Creative Arts Committee",
  ];

  const coreTeamMembers = {
    "Chief Executive Officer": {
      name: "Rahul Kumar",
      image:
        "https://imgs.search.brave.com/b5_mQaf-d6cHGX5imauBFjWxcQBzzcwLecVVk7Pk1Cs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/aS13YWxrLWEtbG9u/ZWx5LXJvYWQuanBn/P3dpZHRoPTEwMDAm/Zm9ybWF0PXBqcGcm/ZXhpZj0wJmlwdGM9/MA",
      instagram: "https://instagram.com/rahul_kumar",
      linkedin: "https://linkedin.com/in/rahul-kumar",
      description: "Leading the team with vision and strategy",
      role: "Overall leadership and decision making",
    },
    "Chief Secretary": {
      name: "Priya Singh",
      image: "/team/secretary.jpg",
      instagram: "https://instagram.com/priya_singh",
      linkedin: "https://linkedin.com/in/priya-singh",
      description: "Managing administrative operations",
      role: "Documentation and coordination",
    },
    "Joint Secretary": {
      name: "Amit Patel",
      image: "/team/joint-secretary.jpg",
      instagram: "https://instagram.com/amit_patel",
      linkedin: "https://linkedin.com/in/amit-patel",
      description: "Supporting secretarial functions",
      role: "Administrative support",
    },
    "Student Coordinator": {
      name: "Neha Sharma",
      image: "/team/coordinator.jpg",
      instagram: "https://instagram.com/neha_sharma",
      linkedin: "https://linkedin.com/in/neha-sharma",
      description: "Liaison between students and management",
      role: "Student engagement",
    },
    Treasurer: {
      name: "Vikram Malhotra",
      image: "/team/treasurer.jpg",
      instagram: "https://instagram.com/vikram_malhotra",
      linkedin: "https://linkedin.com/in/vikram-malhotra",
      description: "Managing finances and budgets",
      role: "Financial planning",
    },
  };

  const committeeMembers = {
    "Design and Vfx Committee": {
      members: [
        {
          name: "Aditya Verma",
          image: poster2024,
          instagram: "https://instagram.com/aditya_verma",
          linkedin: "https://linkedin.com/in/aditya-verma",
          description: "Creating visual content and effects",
          role: "Chief Designer",
        },
        {
          name: "Roshni Kapoor",
          image: poster2024,
          instagram: "https://instagram.com/roshni_kapoor",
          linkedin: "https://linkedin.com/in/roshni-kapoor",
          description: "3D modeling and animation",
          role: "Core Designer",
        },
        {
          name: "Kunal Mehta",
          image: poster2024,
          instagram: "https://instagram.com/kunal_mehta",
          linkedin: "https://linkedin.com/in/kunal-mehta",
          description: "Motion graphics and VFX",
          role: "Core Designer",
        },
      ],
    },
    "Broadcasting Committee": {
      members: [
        {
          name: "Riya Kapoor",
          image: "/team/broadcast-head.jpg",
          instagram: "https://instagram.com/riya_kapoor",
          linkedin: "https://linkedin.com/in/riya-kapoor",
          description: "Managing live streams and recordings",
          role: "Broadcast Head",
        },
        {
          name: "Akash Singh",
          image: "/team/broadcast-member1.jpg",
          instagram: "https://instagram.com/akash_singh",
          linkedin: "https://linkedin.com/in/akash-singh",
          description: "Technical stream management",
          role: "Technical Director",
        },
        {
          name: "Pooja Reddy",
          image: "/team/broadcast-member2.jpg",
          instagram: "https://instagram.com/pooja_reddy",
          linkedin: "https://linkedin.com/in/pooja-reddy",
          description: "Content planning and scheduling",
          role: "Content Manager",
        },
      ],
    },
    "Campus Relations Committee": {
      members: [
        {
          name: "Arjun Reddy",
          image: "/team/campus-relations.jpg",
          instagram: "https://instagram.com/arjun_reddy",
          linkedin: "https://linkedin.com/in/arjun-reddy",
          description: "Building campus partnerships",
          role: "Campus Relations Head",
        },
        {
          name: "Shreya Gupta",
          image: "/team/campus-member1.jpg",
          instagram: "https://instagram.com/shreya_gupta",
          linkedin: "https://linkedin.com/in/shreya-gupta",
          description: "Student outreach coordinator",
          role: "Outreach Manager",
        },
        {
          name: "Rahul Sharma",
          image: "/team/campus-member2.jpg",
          instagram: "https://instagram.com/rahul_sharma",
          linkedin: "https://linkedin.com/in/rahul-sharma",
          description: "Faculty liaison",
          role: "Faculty Coordinator",
        },
      ],
    },
    "Events Committee": {
      members: [
        {
          name: "Sneha Gupta",
          image: "/team/events-head.jpg",
          instagram: "https://instagram.com/sneha_gupta",
          linkedin: "https://linkedin.com/in/sneha-gupta",
          description: "Planning and executing events",
          role: "Events Head",
        },
        {
          name: "Raj Malhotra",
          image: "/team/events-member1.jpg",
          instagram: "https://instagram.com/raj_malhotra",
          linkedin: "https://linkedin.com/in/raj-malhotra",
          description: "Technical events coordinator",
          role: "Technical Events Manager",
        },
        {
          name: "Priya Patel",
          image: "/team/events-member2.jpg",
          instagram: "https://instagram.com/priya_patel",
          linkedin: "https://linkedin.com/in/priya-patel",
          description: "Cultural events coordinator",
          role: "Cultural Events Manager",
        },
      ],
    },
    "Hospitality Committee": {
      members: [
        {
          name: "Rohan Mehta",
          image: "/team/hospitality-head.jpg",
          instagram: "https://instagram.com/rohan_mehta",
          linkedin: "https://linkedin.com/in/rohan-mehta",
          description: "Managing guest relations",
          role: "Hospitality Head",
        },
        {
          name: "Neha Verma",
          image: "/team/hospitality-member1.jpg",
          instagram: "https://instagram.com/neha_verma",
          linkedin: "https://linkedin.com/in/neha-verma",
          description: "Guest experience coordinator",
          role: "Guest Relations",
        },
        {
          name: "Arun Kumar",
          image: "/team/hospitality-member2.jpg",
          instagram: "https://instagram.com/arun_kumar",
          linkedin: "https://linkedin.com/in/arun-kumar",
          description: "Accommodation coordinator",
          role: "Logistics Coordinator",
        },
      ],
    },
    "HR & Communication Committee": {
      members: [
        {
          name: "Anjali Desai",
          image: "/team/hr-head.jpg",
          instagram: "https://instagram.com/anjali_desai",
          linkedin: "https://linkedin.com/in/anjali-desai",
          description: "Internal communications and HR",
          role: "HR Head",
        },
        {
          name: "Vikram Singh",
          image: "/team/hr-member1.jpg",
          instagram: "https://instagram.com/vikram_singh",
          linkedin: "https://linkedin.com/in/vikram-singh",
          description: "Team building coordinator",
          role: "Team Development",
        },
        {
          name: "Meera Shah",
          image: "/team/hr-member2.jpg",
          instagram: "https://instagram.com/meera_shah",
          linkedin: "https://linkedin.com/in/meera-shah",
          description: "Internal communications",
          role: "Communications Manager",
        },
      ],
    },
    "Logistics Committee": {
      members: [
        {
          name: "Karan Shah",
          image: "/team/logistics-head.jpg",
          instagram: "https://instagram.com/karan_shah",
          linkedin: "https://linkedin.com/in/karan-shah",
          description: "Managing event logistics",
          role: "Logistics Head",
        },
        {
          name: "Deepak Kumar",
          image: "/team/logistics-member1.jpg",
          instagram: "https://instagram.com/deepak_kumar",
          linkedin: "https://linkedin.com/in/deepak-kumar",
          description: "Equipment management",
          role: "Equipment Manager",
        },
        {
          name: "Riya Sharma",
          image: "/team/logistics-member2.jpg",
          instagram: "https://instagram.com/riya_sharma",
          linkedin: "https://linkedin.com/in/riya-sharma",
          description: "Venue coordination",
          role: "Venue Coordinator",
        },
      ],
    },
    "PR & Marketing Committee": {
      members: [
        {
          name: "Nisha Jain",
          image: "/team/pr-head.jpg",
          instagram: "https://instagram.com/nisha_jain",
          linkedin: "https://linkedin.com/in/nisha-jain",
          description: "Handling public relations",
          role: "PR Head",
        },
        {
          name: "Aryan Patel",
          image: "/team/pr-member1.jpg",
          instagram: "https://instagram.com/aryan_patel",
          linkedin: "https://linkedin.com/in/aryan-patel",
          description: "Social media management",
          role: "Social Media Manager",
        },
        {
          name: "Kavya Reddy",
          image: "/team/pr-member2.jpg",
          instagram: "https://instagram.com/kavya_reddy",
          linkedin: "https://linkedin.com/in/kavya-reddy",
          description: "Content creation",
          role: "Content Strategist",
        },
      ],
    },
    "Registration & Certifications Committee": {
      members: [
        {
          name: "Varun Khanna",
          image: "/team/registration-head.jpg",
          instagram: "https://instagram.com/varun_khanna",
          linkedin: "https://linkedin.com/in/varun-khanna",
          description: "Managing registrations",
          role: "Registration Head",
        },
        {
          name: "Priya Sharma",
          image: "/team/registration-member1.jpg",
          instagram: "https://instagram.com/priya_sharma",
          linkedin: "https://linkedin.com/in/priya-sharma",
          description: "Database management",
          role: "Database Manager",
        },
        {
          name: "Rohit Kumar",
          image: "/team/registration-member2.jpg",
          instagram: "https://instagram.com/rohit_kumar",
          linkedin: "https://linkedin.com/in/rohit-kumar",
          description: "Certificate generation",
          role: "Certification Manager",
        },
      ],
    },
    "Sponsorship Committee": {
      members: [
        {
          name: "Meera Iyer",
          image: "/team/sponsorship-head.jpg",
          instagram: "https://instagram.com/meera_iyer",
          linkedin: "https://linkedin.com/in/meera-iyer",
          description: "Securing sponsorships",
          role: "Sponsorship Head",
        },
        {
          name: "Aditya Shah",
          image: "/team/sponsorship-member1.jpg",
          instagram: "https://instagram.com/aditya_shah",
          linkedin: "https://linkedin.com/in/aditya-shah",
          description: "Corporate relations",
          role: "Corporate Liaison",
        },
        {
          name: "Neha Gupta",
          image: "/team/sponsorship-member2.jpg",
          instagram: "https://instagram.com/neha_gupta",
          linkedin: "https://linkedin.com/in/neha-gupta",
          description: "Partnership development",
          role: "Partnership Manager",
        },
      ],
    },
    "Stage Management Committee": {
      members: [
        {
          name: "Raj Malhotra",
          image: "/team/stage-head.jpg",
          instagram: "https://instagram.com/raj_malhotra",
          linkedin: "https://linkedin.com/in/raj-malhotra",
          description: "Managing stage events",
          role: "Stage Head",
        },
        {
          name: "Ananya Singh",
          image: "/team/stage-member1.jpg",
          instagram: "https://instagram.com/ananya_singh",
          linkedin: "https://linkedin.com/in/ananya-singh",
          description: "Performance coordination",
          role: "Performance Manager",
        },
        {
          name: "Rahul Verma",
          image: "/team/stage-member2.jpg",
          instagram: "https://instagram.com/rahul_verma",
          linkedin: "https://linkedin.com/in/rahul-verma",
          description: "Technical setup",
          role: "Technical Manager",
        },
      ],
    },
    "Transportation Committee": {
      members: [
        {
          name: "Sanjay Kumar",
          image: "/team/transport-head.jpg",
          instagram: "https://instagram.com/sanjay_kumar",
          linkedin: "https://linkedin.com/in/sanjay-kumar",
          description: "Coordinating transportation",
          role: "Transport Head",
        },
        {
          name: "Amit Sharma",
          image: "/team/transport-member1.jpg",
          instagram: "https://instagram.com/amit_sharma",
          linkedin: "https://linkedin.com/in/amit-sharma",
          description: "Route planning",
          role: "Route Manager",
        },
        {
          name: "Priya Reddy",
          image: "/team/transport-member2.jpg",
          instagram: "https://instagram.com/priya_reddy",
          linkedin: "https://linkedin.com/in/priya-reddy",
          description: "Vehicle coordination",
          role: "Fleet Manager",
        },
      ],
    },
    "Website Committee": {
      members: [
        {
          name: "Ankit Sharma",
          image: "/team/web-head.jpg",
          instagram: "https://instagram.com/ankit_sharma",
          linkedin: "https://linkedin.com/in/ankit-sharma",
          description: "Managing web presence",
          role: "Web Head",
        },
        {
          name: "Riya Patel",
          image: "/team/web-member1.jpg",
          instagram: "https://instagram.com/riya_patel",
          linkedin: "https://linkedin.com/in/riya-patel",
          description: "Frontend development",
          role: "Frontend Developer",
        },
        {
          name: "Arjun Kumar",
          image: "/team/web-member2.jpg",
          instagram: "https://instagram.com/arjun_kumar",
          linkedin: "https://linkedin.com/in/arjun-kumar",
          description: "Backend development",
          role: "Backend Developer",
        },
      ],
    },
    "Emergency Response Committee": {
      members: [
        {
          name: "Divya Patel",
          image: "/team/emergency-head.jpg",
          instagram: "https://instagram.com/divya_patel",
          linkedin: "https://linkedin.com/in/divya-patel",
          description: "Emergency preparedness",
          role: "Emergency Response Head",
        },
        {
          name: "Rahul Singh",
          image: "/team/emergency-member1.jpg",
          instagram: "https://instagram.com/rahul_singh",
          linkedin: "https://linkedin.com/in/rahul-singh",
          description: "First aid coordination",
          role: "First Aid Coordinator",
        },
        {
          name: "Priya Mehta",
          image: "/team/emergency-member2.jpg",
          instagram: "https://instagram.com/priya_mehta",
          linkedin: "https://linkedin.com/in/priya-mehta",
          description: "Safety protocols",
          role: "Safety Manager",
        },
      ],
    },
    "Creative Arts Committee": {
      members: [
        {
          name: "Maya Rao",
          image: "/team/creative-head.jpg",
          instagram: "https://instagram.com/maya_rao",
          linkedin: "https://linkedin.com/in/maya-rao",
          description: "Managing creative activities",
          role: "Creative Arts Head",
        },
        {
          name: "Arun Verma",
          image: "/team/creative-member1.jpg",
          instagram: "https://instagram.com/arun_verma",
          linkedin: "https://linkedin.com/in/arun-verma",
          description: "Visual arts coordination",
          role: "Visual Arts Coordinator",
        },
        {
          name: "Neha Kumar",
          image: "/team/creative-member2.jpg",
          instagram: "https://instagram.com/neha_kumar",
          linkedin: "https://linkedin.com/in/neha-kumar",
          description: "Performing arts coordination",
          role: "Performing Arts Coordinator",
        },
      ],
    },
  };

  const handleMemberSelect = (category) => {
    setSelectedMember(category);
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white py-8 md:py-16 px-4 md:px-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-16 text-purple-500">
        Our Team
      </h1>

      {/* Desktop Committee Selection */}
      <div className="hidden md:flex justify-center mb-8">
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => setSelectedMember(null)}
            className={`px-6 py-3 rounded-lg transition-all text-sm md:text-base ${
              !selectedMember
                ? "bg-purple-500 text-white"
                : "bg-gray-900 hover:bg-purple-900/30 border border-white/30"
            }`}
          >
            Zero Order
          </button>
          {teamCategories.slice(5).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedMember(category)}
              className={`px-6 py-3 rounded-lg transition-all text-sm md:text-base ${
                selectedMember === category
                  ? "bg-purple-500 text-white"
                  : "bg-gray-900 hover:bg-purple-900/30 border border-white/30"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div className="md:hidden mb-6 relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full bg-gray-900 px-4 py-3 rounded-lg flex justify-between items-center border border-white/30"
        >
          <span>{selectedMember || "Zero Order"}</span>
          <FaChevronDown
            className={`transform transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isDropdownOpen && (
          <div className="mt-2 bg-gray-900 rounded-lg overflow-hidden absolute left-0 right-0 z-50 max-h-60 overflow-y-auto border border-white/30 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-900">
            <button
              onClick={() => {
                setSelectedMember(null);
                setIsDropdownOpen(false);
              }}
              className={`w-full text-left px-4 py-3 ${
                !selectedMember
                  ? "bg-purple-500 text-white"
                  : "hover:bg-purple-900/30"
              }`}
            >
              Zero Order
            </button>
            {teamCategories.slice(5).map((category) => (
              <button
                key={category}
                onClick={() => handleMemberSelect(category)}
                className={`w-full text-left px-4 py-3 ${
                  selectedMember === category
                    ? "bg-purple-500 text-white"
                    : "hover:bg-purple-900/30"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Zero Order Section */}
      {!selectedMember && (
        <div className="mb-12 md:mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
            {Object.entries(coreTeamMembers).map(([position, member]) => (
              <motion.div
                key={position}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900 rounded-lg p-4 text-center border border-white/30"
              >
                <img
                  src={poster2024}
                  alt={member.name}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-base md:text-lg mb-2 text-purple-300">
                  Venkat Vuddagiri
                </h3>
                <p className="text-gray-400 text-xs md:text-sm mb-2">
                  {position}
                </p>
                <p className="text-gray-500 text-xs mb-4">
                  {member.description}
                </p>
                <div className="flex justify-center gap-4">
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="text-lg md:text-xl hover:text-purple-500" />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="text-lg md:text-xl hover:text-purple-500" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Committee Members Section */}
      {selectedMember && (
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMember}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="rounded-lg p-6 md:p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {committeeMembers[selectedMember].members.map((member, index) => (
                <div
                  key={index}
                  className="text-center bg-gray-900 rounded-lg p-4 border border-white/30"
                >
                  <img
                    src={poster2024}
                    alt={member.name}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-2 text-purple-300">
                    Venkat Vuddagiri
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">{member.role}</p>
                  <p className="text-gray-500 text-sm mb-4">
                    {member.description}
                  </p>
                  <div className="flex justify-center gap-4">
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-purple-500"
                    >
                      <FaInstagram className="text-xl" />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-purple-500"
                    >
                      <FaLinkedin className="text-xl" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Team;
