import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import CodeEditor from "@/components/Course/CodeEditor";
import Video from "@/components/Course/Video";
import Assignment from "@/components/Course/Assignment";
import ChatBot from "@/components/Course/ChatBot";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL

export default function CourseContent() {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();

  const initialWeekIndex = searchParams.get("weekIndex");
  const initialModuleIndex = searchParams.get("moduleIndex");

  const [courseData, setCourseData] = useState(null);
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(
    initialWeekIndex !== null ? parseInt(initialWeekIndex) : null
  );
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(
    initialModuleIndex !== null ? parseInt(initialModuleIndex) : null
  );

  const selectedWeek = selectedWeekIndex !== null ? courseData?.weeks[selectedWeekIndex] : null;
  const selectedModule = selectedWeek && selectedWeek.modules.length > 0
    ? selectedWeek.modules[selectedModuleIndex]
    : null;

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
    // setCourseData(courseDataStatic);
  }, [courseId]);

  if (!courseData) {
    return <div className="text-center text-lg">Loading Course Data...</div>;
  }

  return (
    <div className="flex h-[calc(100vh-95px)] bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/5 bg-white border-r overflow-y-auto">
        <div className="p-4 border-b">
          <h1 className="text-lg font-bold">{courseData.title}</h1>
        </div>
        {courseData.weeks.map((week, weekIndex) => (
          <div key={weekIndex}>
            <button
              onClick={() => setSelectedWeekIndex(weekIndex === selectedWeekIndex ? null : weekIndex)}
              className={`w-full text-left p-3 transition ${
                selectedWeekIndex === weekIndex ? "bg-gray-200 font-semibold" : ""
              }`}
            >
              {week.title}
              <span className="float-right">
                {selectedWeekIndex === weekIndex ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
              </span>
            </button>
            {selectedWeekIndex === weekIndex &&
              week.modules.map((module, moduleIndex) => (
                <button
                  key={moduleIndex}
                  onClick={() => setSelectedModuleIndex(moduleIndex)}
                  className={`w-full text-left pl-6 py-2 ${
                    selectedModuleIndex === moduleIndex ? "bg-gray-300 font-medium" : ""
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
            {selectedModule.type === "coding" && <CodeEditor module={selectedModule} />}
            {selectedModule.type === "assignment" && <Assignment module={selectedModule} />}
            {selectedModule.type === "document" && (
              <iframe
                src={selectedModule.url}
                width="100%"
                height="600px"
                style={{ border: "none" }}
              ></iframe>
            )}
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">About the course</h2>
            <p>{courseData.description}</p>
          </>
        )}
      </div>

      {/* Chatbot */}
      <div className="w-1/4 bg-white border-l overflow-y-auto h-[89vh]">
        <ChatBot />
      </div>
    </div>
  );
}
