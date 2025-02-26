import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "@/context/UserContext";

import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import Course from "@/pages/Course";
import CourseContent from "@/pages/CourseContent";
import Registration from "@/pages/Registration";
import Users from "@/pages/Users";
import UserPage from "@/pages/UserPage";

function ProtectedRoute({ element }) {
  const { profile } = useUser();
  return profile ? element : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/course" element={<ProtectedRoute element={<Course />} />} />
          <Route path="/users" element={<ProtectedRoute element={<Users />} />} />
          <Route path="/user/:userId" element={<ProtectedRoute element={<UserPage />} />} />
          <Route path="/course/:courseId" element={<ProtectedRoute element={<CourseContent />} />} />
          <Route path="/registration" element={<ProtectedRoute element={<Registration />} />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}
