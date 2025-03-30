import React from "react";
import { Mail, Linkedin } from "lucide-react"; // Import icons
import Anuj from "/Anuj.jpeg";
import Anand from "/Anand.jpeg";
import Vasu from "/Vasu.png";
import Ghanashyam from "/Ghanashyam.jpeg";
import Jalaj from "/Jalaj.jpg";
import Niraj from "/Niraj.jpeg";
import Ajay from "/Ajay.png";

const teamMembers = [
  {
    name: "Anuj Gupta",
    role: "Frontend Developer",
    image: Anuj,
    linkedin: "https://www.linkedin.com/in/anujgupta95/",
    email: "21f1001185@ds.study.iitm.ac.in",
  },
  {
    name: "Anand K Iyer",
    role: "Tester",
    image: Anand,
    linkedin: "https://www.linkedin.com/in/ananddotiyer/",
    email: "21f1001185@ds.study.iitm.ac.in",
  },
  {
    name: "AJR Vasu",
    role: "Scrum & PM",
    image: Vasu,
    linkedin: "https://www.linkedin.com/in/ajrvasu/",
    email: "21f1001185@ds.study.iitm.ac.in",
  },
  {
    name: "Ajay Thiagarajan",
    role: "Backend Developer",
    image: Ajay,
    linkedin: "https://www.linkedin.com/in/ajay-thiagarajan/",
    email: "21f1003242@ds.study.iitm.ac.in",
  },
  {
    name: "Ghanashyam R",
    role: "Documentation",
    image: Ghanashyam,
    linkedin: "https://www.linkedin.com/in/ghanashyam-r-/",
    email: "21f1003387@ds.study.iitm.ac.in",
  },
  {
    name: "Jalaj Trivedi",
    role: "RAG & AI Developer",
    image: Jalaj,
    linkedin: "www.linkedin.com/in/jalaj-trivedi-961b62221",
    email: "21f2000730@ds.study.iitm.ac.in",
  },
  {
    name: "Niraj Kumar",
    role: "RAG & AI Developer",
    image: Niraj,
    linkedin: "www.linkedin.com/in/niraj-kumar123",
    email: "21f1006589@ds.study.iitm.ac.in",
  },
];

const Team = () => {
    return (
      <section className="bg-white text-gray-900 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Our Team</h2>
          <p className="italic text-gray-600 mb-8">
            “Alone we can do so little; together we can do so much. Our team is
            not just a group of individuals, but a synergy of talents, passions,
            and dedication that propels us towards greatness.”
          </p>
        </div>
  
        {/* Grid layout with 4 in 1st row and 3 in 2nd */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow-md text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
              <div className="mt-4 flex justify-center gap-4">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Linkedin size={20} />
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="text-green-600 hover:text-green-800"
                  >
                    <Mail size={20} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

export default Team;
