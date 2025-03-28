import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "@/context/UserContext";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

import Home from "@/pages/Home";
import UserDashboard from "@/pages/Dashboard/UserDashboard";
import AdminDashboard from "@/pages/Dashboard/AdminDashboard";
import InstructorDashboard from "@/pages/Dashboard/InstructorDashboard";
import Course from "@/pages/Course";
import CourseContent from "@/pages/CourseContent";
import Registration from "@/pages/Registration";
import Users from "@/pages/Users";
import UserPage from "@/pages/UserPage";
import Login from "@/pages/Login";
import AboutUs from "@/pages/AboutUs";

function ProtectedRoute({ element }) {
  const { profile } = useUser();
  return profile ? element : <Navigate to="/" replace />;
}

function RestrictedRoute({ element }) {
  const { profile } = useUser();
  return !profile ? element : <Navigate to="/course" replace />;
}

function AdminRoute({ element }) {
  const { profile } = useUser();
  return profile?.role === "admin" ? element : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Toaster />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/authenticate" element={<RestrictedRoute element={<Login />} />} />
              <Route path="/dashboard" element={<ProtectedRoute element={<UserDashboard />} />} />
              <Route path="/course" element={<ProtectedRoute element={<Course />} />} />
              <Route path="/course/:courseId" element={<ProtectedRoute element={<CourseContent />} />} />
              <Route path="/registration" element={<ProtectedRoute element={<Registration />} />} />
              <Route path="/instructor/dashboard" element={<ProtectedRoute element={<InstructorDashboard />} />} />
              <Route path="/users" element={<AdminRoute element={<Users />} />} />
              <Route path="/user/:userId" element={<AdminRoute element={<UserPage />} />} />
              <Route path="/admin/dashboard" element={<AdminRoute element={<AdminDashboard />} />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

