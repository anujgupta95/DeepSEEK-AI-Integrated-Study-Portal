import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import CodeEditor from "@/components/Course/CodeEditor";
import Video from "@/components/Course/Video";
import Assignment from "@/components/Course/Assignment";
import ChatBot from "@/components/Course/ChatBot";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export default function CourseContent() {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const moduleIdFromURL = searchParams.get("moduleId");
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [chatbotWidth, setChatbotWidth] = useState(350);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    async function fetchCourseData() {
      try {
        const response = await axios.get(`${apiUrl}/course/${courseId}`);
        setCourseData(response.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    }

    fetchCourseData();
  }, [courseId]);

  useEffect(() => {
    if (!courseData || !moduleIdFromURL) return;

    let foundModule = null;
    for (const week of courseData.weeks) {
      foundModule = week.modules.find((mod) => mod.moduleId === moduleIdFromURL);
      if (foundModule) break;
    }

    setSelectedModule(foundModule);
  }, [courseData, moduleIdFromURL]);

  useEffect(() => {
    if (!isResizing) return;
    
    const handleMouseMove = (e) => {
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth >= 250 && newWidth <= 600) {
        setChatbotWidth(newWidth);
      }
    };

    const handleMouseUp = () => setIsResizing(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  if (!courseData) return <div className="text-center text-lg">Loading Course Data...</div>;

  return (
    <div className="flex h-[calc(100vh-95px)] bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/5 bg-white border-r overflow-y-auto">
        <div className="p-4 border-b">
          <h1 className="text-lg font-bold">{courseData.name}</h1>
        </div>
        {courseData.weeks.map((week) => (
          <div key={week.weekId}>
            <button
              onClick={() => setSelectedWeek(week === selectedWeek ? null : week)}
              className={`w-full text-left p-3 transition ${selectedWeek === week ? "bg-gray-200 font-semibold" : ""}`}
            >
              {week.title}
              <span className="float-right">
                {selectedWeek === week ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
              </span>
            </button>
            {selectedWeek === week &&
              week.modules.map((module) => (
                <button
                  key={module.moduleId}
                  onClick={() => navigate(`?moduleId=${module.moduleId}`)}
                  className={`block text-left pl-6 py-2 w-full ${
                    selectedModule?.moduleId === module.moduleId ? "bg-gray-300 font-medium" : ""
                  }`}
                >
                  {module.title}
                </button>
              ))}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto scrollbar-hide">
        {selectedModule ? (
          <>
            <h2 className="text-xl font-bold mb-4">{selectedModule.title}</h2>
            {selectedModule.type === "video" && <Video module={selectedModule} />}
            {selectedModule.type === "coding" && <CodeEditor module={selectedModule} deadline={selectedWeek?.deadline} isGraded={selectedModule.graded} />}
            {selectedModule.type === "assignment" && (
              <Assignment module={selectedModule} deadline={selectedWeek?.deadline} isGraded={selectedModule.graded} />
            )}

            {selectedModule.type === "document" && (
              <iframe src={selectedModule.url} width="100%" height="600px" style={{ border: "none" }}></iframe>
            )}
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">About the Course</h2>
            <p>{courseData.description}</p>
          </>
        )}
      </div>

      {/* Resizable Chatbot Panel */}
      <div
        style={{ width: `${chatbotWidth}px` }}
        className="relative bg-white overflow-y-auto h-[89vh]"
      >
        <div onMouseDown={() => setIsResizing(true)} className="absolute left-0 top-0 h-full w-1 bg-gray-200 cursor-ew-resize" />
        <ChatBot />
      </div>
    </div>
  );
}
