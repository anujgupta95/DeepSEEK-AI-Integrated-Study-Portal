import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/Course/Card"; // Assuming you have a CourseCard component

const apiUrl = import.meta.env.VITE_API_URL;

export default function UserPage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`${apiUrl}/user-statistics/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user data");
        const userData = await response.json();
        setUser(userData);

        // Fetch course details
        const coursePromises = userData.registeredCourses.map((courseId) =>
          fetch(`${apiUrl}/course/${courseId}`).then((res) => res.json())
        );
        const courseData = await Promise.all(coursePromises);
        setCourses(courseData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Skeleton className="h-10 w-40 rounded-lg" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-6">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* User Profile Card */}
      <Card className="mb-6 card-color">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={user.profilePictureUrl || "/default-avatar.png"} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <p className="text-gray-500">{user.email}</p>
            <span className="px-3 py-1 mt-2 inline-block text-sm bg-gray-200 rounded-full">
              {user.role.toUpperCase()}
            </span>
          </div>
        </CardHeader>
      </Card>

      {/* Statistics Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">User Statistics</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-lg font-semibold">{user.statistics.modulesCompleted}</p>
            <p className="text-gray-600 text-sm">Modules Completed</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-lg font-semibold">{user.statistics.questionsAttempted}</p>
            <p className="text-gray-600 text-sm">Questions Attempted</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-lg font-semibold">
              {user.statistics.averageScore !== null ? user.statistics.averageScore.toFixed(2) : "N/A"}
            </p>
            <p className="text-gray-600 text-sm">Average Score</p>
          </div>
        </CardContent>
      </Card>

      {/* Registered Courses Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Registered Courses</h2>
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No registered courses.</p>
        )}
      </div>

      {/* Back Button */}
      <div className="mt-6">
        <Button onClick={() => window.history.back()} variant="outline">
          ⬅ Back
        </Button>
      </div>
    </div>
  );
}
