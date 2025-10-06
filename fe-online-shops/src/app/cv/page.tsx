"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Github, Download } from "lucide-react";

export default function CVPage() {
  const [activeTab, setActiveTab] = useState("about");

  const personalInfo = {
    name: "Your Name",
    title: "Full Stack Developer",
    email: "your.email@example.com",
    phone: "+1 (555) 123-4567",
    location: "City, Country",
    linkedin: "linkedin.com/in/yourprofile",
    github: "github.com/yourusername",
  };

  const skills = [
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js", 
    "Python", "Java", "SQL", "MongoDB", "Git", "Docker", "AWS"
  ];

  const experience = [
    {
      company: "Tech Company",
      position: "Senior Developer",
      period: "2022 - Present",
      description: "Led development of web applications using React and Node.js. Managed team of 5 developers."
    },
    {
      company: "Startup Inc",
      position: "Full Stack Developer",
      period: "2020 - 2022",
      description: "Built and maintained multiple web applications. Implemented CI/CD pipelines."
    }
  ];

  const education = [
    {
      degree: "Bachelor of Computer Science",
      school: "University Name",
      year: "2016 - 2020"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">{personalInfo.name}</h1>
              <p className="text-xl text-gray-600 mt-2">{personalInfo.title}</p>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href={`mailto:${personalInfo.email}`} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <Mail size={20} />
                <span>{personalInfo.email}</span>
              </a>
              <a href={`tel:${personalInfo.phone}`} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <Phone size={20} />
                <span>{personalInfo.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex space-x-4 border-b">
          {["about", "experience", "skills", "contact"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium capitalize ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {activeTab === "about" && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">About Me</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              I am a passionate Full Stack Developer with 4+ years of experience in building 
              scalable web applications. I specialize in modern JavaScript frameworks, cloud 
              technologies, and agile development methodologies. I enjoy solving complex problems 
              and creating user-friendly applications that make a difference.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Education</h3>
                {education.map((edu, index) => (
                  <div key={index} className="mb-3">
                    <p className="font-medium text-gray-800">{edu.degree}</p>
                    <p className="text-gray-600">{edu.school}</p>
                    <p className="text-sm text-gray-500">{edu.year}</p>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} className="text-gray-500" />
                    <span className="text-gray-600">{personalInfo.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Linkedin size={16} className="text-gray-500" />
                    <a href={`https://${personalInfo.linkedin}`} className="text-blue-600 hover:underline">
                      {personalInfo.linkedin}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Github size={16} className="text-gray-500" />
                    <a href={`https://${personalInfo.github}`} className="text-blue-600 hover:underline">
                      {personalInfo.github}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "experience" && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Work Experience</h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{exp.position}</h3>
                    <span className="text-sm text-gray-500">{exp.period}</span>
                  </div>
                  <p className="text-blue-600 font-medium mb-2">{exp.company}</p>
                  <p className="text-gray-600">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "skills" && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Skills & Technologies</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-center font-medium hover:bg-blue-100 transition-colors"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Get In Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail size={20} className="text-gray-500" />
                    <a href={`mailto:${personalInfo.email}`} className="text-blue-600 hover:underline">
                      {personalInfo.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone size={20} className="text-gray-500" />
                    <a href={`tel:${personalInfo.phone}`} className="text-blue-600 hover:underline">
                      {personalInfo.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin size={20} className="text-gray-500" />
                    <span className="text-gray-600">{personalInfo.location}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Social Links</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Linkedin size={20} className="text-gray-500" />
                    <a href={`https://${personalInfo.linkedin}`} className="text-blue-600 hover:underline">
                      LinkedIn Profile
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Github size={20} className="text-gray-500" />
                    <a href={`https://${personalInfo.github}`} className="text-blue-600 hover:underline">
                      GitHub Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t">
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                <Download size={20} />
                <span>Download CV</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 