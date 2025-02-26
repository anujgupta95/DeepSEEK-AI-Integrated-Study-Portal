import React, { useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/Course/Card";

export default function Profile() {
  const { profile } = useUser();
  // const [completedCourses, setCompletedCourses] = React.useState([]);

  // Dummy Completed Courses Data
  const completedCourses = [
    { id: 1, name: "Introduction to Python"},
    { id: 2, name: "Data Structures & Algorithms"},
    { id: 3, name: "Machine Learning Theory"},
  ];

  // Dummy Certificates Data
  const certificates = [
    { id: 1, title: "Python Programming Certificate", file: "#" },
    { id: 2, title: "DSA Certificate", file: "#" },
  ];

  return (
    <div className="max-w-5xl mx-auto mt-6 mb-10 space-y-6">
      {/* Profile Section */}
      <Card className="flex items-center justify-between p-6 shadow-md">
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

      {/* Completed Courses */}
      <Card className="p-6 shadow-md">
        <h3 className="text-xl font-semibold mb-4">Completed Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {completedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </Card>

      {/* Certificates Section */}
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
  );
}
