import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@/context/UserContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area"; 

import CourseCard from "@/components/Course/Card";

const apiUrl = import.meta.env.VITE_API_URL;

export default function UserDashboard() {
  const { profile } = useUser();
  const [questionsData, setQuestionsData] = useState({});
  const [courseOptions, setCourseOptions] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const completedCourses = [
    { id: 1, name: "Introduction to Python" },
    { id: 2, name: "Data Structures & Algorithms" },
    { id: 3, name: "Machine Learning Theory" },
  ]
  const certificates = [
    { id: 1, title: "Python Programming Certificate", file: "#" },
    { id: 2, title: "DSA Certificate", file: "#" },
  ]

  useEffect(() => {
    if (!profile?.email) return;

    const fetchQuestions = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/dashboard/user/questions`, {
          params: { email: profile.email },
        });

        if (data.success) {
          setQuestionsData(data.data);

          // Extract course options
          const courses = Object.entries(data.data).map(([id, details]) => ({
            id,
            name: details.course_name,
          }));

          setCourseOptions(courses);
          setSelectedCourse(courses[0]?.id || ""); // Select first course by default
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [profile?.email]);

  const selectedQuestions = questionsData[selectedCourse]?.questions || [];

  return (
    <div className="max-w-6xl mx-auto mt-6 mb-10 space-y-6">
      {/* Profile Section */}
      <Card className="flex items-center justify-between p-6 shadow-md card-color">
        <div className="flex items-center gap-6">
          <img src={profile?.picture || "/default-avatar.png"} alt="Profile" className="w-24 h-24 rounded-full" />
          <div>
            <h2 className="text-2xl font-semibold">{profile?.name || "User Name"}</h2>
            <p className="text-gray-600">{profile?.email || "user@ds.study.iitm.ac.in"}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-medium">Completed Credits: <span className="font-bold">96</span></p>
          <p className="text-lg font-medium">Current Level: <span className="font-bold">DEGREE</span></p>
        </div>
      </Card>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section */}
        <div className="space-y-6">
          {/* Completed Courses */}
          <Card className="p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Completed Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedCourses.map((course) => (
                <CourseCard key={course.id} course={course} disableGoToCourse={true}/>
              ))}
            </div>
          </Card>

          {/* Certificates */}
          <Card className="p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Certificates</h3>
            <div className="grid grid-cols-1 gap-4">
              {certificates.map((cert) => (
                <div key={cert.id} className="p-4 border rounded-lg flex justify-between items-center">
                  <span>{cert.title}</span>
                  <Button variant="outline" onClick={() => window.open(cert.file, "_blank")}>Download</Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Section - Asked Questions */}
        <div className="space-y-6">
          <Card className="p-6 shadow-md h-full">
            <h3 className="text-xl font-semibold mb-4">Asked Questions</h3>

            {/* ShadCN Dropdown for Course Selection (Full Width) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full">
                  {courseOptions.find(course => course.id === selectedCourse)?.name || "Select Course"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {courseOptions.map((course) => (
                  <DropdownMenuItem key={course.id} onClick={() => setSelectedCourse(course.id)}>
                    {course.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Added space below dropdown */}
            <div className="mb-4"></div>

            {/* Questions List */}
            <ScrollArea className="h-[400px]">
              <div className="space-y-3">
                {selectedQuestions.length > 0 ? (
                  selectedQuestions.map((q, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <p className="font-medium">{q.question}</p>
                      <p className="text-sm text-gray-500">{q.date}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No questions asked for this course.</p>
                )}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
}
