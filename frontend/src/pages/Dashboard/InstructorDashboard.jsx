import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@/context/UserContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton"; // For loading animation

const apiUrl = import.meta.env.VITE_API_URL;

export default function InstructorDashboard() {
  const { profile } = useUser();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [questionsData, setQuestionsData] = useState({ allQuestions: [], topQuestions: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile?.email) return;

    // Fetch available courses
    const fetchCourses = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/courses`);

    if (data?.courses && Array.isArray(data.courses)) {
      setCourses(data.courses); // ✅ Extracts the array correctly
      setSelectedCourse(data.courses[0]?.id || ""); // ✅ Auto-select first course
    } else {
      console.error("Unexpected response format:", data);
      setCourses([]); // Ensure it remains an array
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
    setCourses([]); // Prevent errors if API fails
  }
};

    fetchCourses();
  }, [profile?.email]);

  useEffect(() => {
    if (!profile?.email || !selectedCourse) return;

    setLoading(true); // Show skeleton before fetching

    // Fetch top questions and all questions
    const fetchQuestions = async () => {
      try {
        const { data } = await axios.post(`${apiUrl}/top-questions`, {
          email: profile.email,
          courseId: selectedCourse,
        });

        setQuestionsData(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false); // Hide skeleton after fetching
      }
    };

    fetchQuestions();
  }, [profile?.email, selectedCourse]);

  return (
    <div className="max-w-6xl mx-auto mt-6 mb-10 space-y-6">
      {/* Profile Section */}
      <Card className="flex items-center justify-between p-6 shadow-md card-color">
        <div className="flex items-center gap-6">
          <img src={profile?.picture || "/default-avatar.png"} alt="Profile" className="w-24 h-24 rounded-full" />
          <div>
            <h2 className="text-2xl font-semibold">{profile?.name || "Instructor Name"}</h2>
            <p className="text-gray-600">{profile?.email || "instructor@ds.study.iitm.ac.in"}</p>
          </div>
        </div>
      </Card>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section - Questions Asked */}
        <div className="space-y-6">
          <Card className="p-6 shadow-md h-full">
            <h3 className="text-xl font-semibold mb-4">Recent Questions</h3>

            {/* Course Selection Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">
                {courses.length > 0 ? (courses.find(course => course.id === selectedCourse)?.name || "Select Course") : "Loading..."}
              </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {courses.map((course) => (
                  <DropdownMenuItem key={course.id} onClick={() => setSelectedCourse(course.id)}>
                    {course.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="mb-4"></div>

            {/* Skeleton Loader for Questions */}
            {loading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, index) => (
                  <Skeleton key={index} className="h-12 w-full rounded-lg" />
                ))}
              </div>
            ) : (
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {questionsData.allQuestions.length > 0 ? (
                    questionsData.allQuestions.map((q, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <p className="font-medium">{q}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No questions asked for this course.</p>
                  )}
                </div>
              </ScrollArea>
            )}
          </Card>
        </div>

        {/* Right Section - Hot Topics */}
        <div className="space-y-6">
          <Card className="p-6 shadow-md h-full">
            <h3 className="text-xl font-semibold mb-4">Hot Topics</h3>

            {/* Skeleton Loader for Hot Topics */}
            {loading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, index) => (
                  <Skeleton key={index} className="h-12 w-full rounded-lg" />
                ))}
              </div>
            ) : (
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {questionsData.topQuestions.length > 0 ? (
                    questionsData.topQuestions.map((topic, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <p className="font-medium">{topic}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No trending topics for this course.</p>
                  )}
                </div>
              </ScrollArea>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
