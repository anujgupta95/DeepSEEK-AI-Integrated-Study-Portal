import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast"; // Import ShadCN toast
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Skeleton} from "@/components/ui/skeleton"; // Import Skeleton for loading state
import { TypeAnimation } from "react-type-animation";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Registration() {
  const navigate = useNavigate();
  const { profile } = useUser();
  const { toast } = useToast();

  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState(null); // Store registered courses
  const [loading, setLoading] = useState(true); // Track API loading state

  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        const response = await fetch(`${apiUrl}/registered-courses?email=${profile?.email}`);
        if (!response.ok) throw new Error("Failed to fetch registered courses");
        const data = await response.json();
        setRegisteredCourses(data.registeredCourses || []);
        // toast({
        //   title: "Already Registered",
        //   description: "You have already registered for courses.",
        //   variant: "destructive",
        //   duration: 4000,
        // });
      } catch (error) {
        toast({
          title: "Error fetching registered courses",
          description: "Unable to check your registration status.",
          variant: "destructive",
          duration: 4000,
        });
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserCourses();
  }, []);

  useEffect(() => {
    if (registeredCourses && registeredCourses.length > 0) {
        toast({
          title: "Already Registered",
          description: "You have already registered for courses.",
          variant: "destructive",
          duration: 4000,
        });
      navigate("/course"); // Redirect if user is already registered
    }
  }, [registeredCourses, navigate]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${apiUrl}/courses`);
        if (!response.ok) throw new Error("Failed to fetch courses");
        const data = await response.json();
        setCourses(data.courses);
      } catch (error) {
        toast({
          title: "Error fetching courses",
          description: "Unable to load available courses. Try again later.",
          variant: "destructive",
          duration: 5000,
        });
      }
    };

    fetchCourses();
  }, []);

  const handleCheckboxChange = (courseId) => {
    setSelectedCourses((prevSelected) =>
      prevSelected.includes(courseId)
        ? prevSelected.filter((id) => id !== courseId)
        : [...prevSelected, courseId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedCourses.length === 0) {
      toast({
        title: "No Course Selected",
        description: "Please select at least one course before submitting.",
        variant: "destructive",
        duration: 4000,
      });
      return;
    }

    const registrationData = {
      name: profile?.name || "",
      email: profile?.email || "",
      courses: selectedCourses,
    };

    try {
      const response = await fetch(`${apiUrl}/registered-courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) throw new Error("Registration failed");

      toast({
        title: "Registration Successful",
        description: "You have been successfully registered!",
        variant: "default",
        duration: 3000,
      });

      navigate("/course"); // Redirect after successful registration
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <TypeAnimation
        sequence={[
          "Welcome to the DeepSEEK Portal",
          1000, // Waits 1s
          "",
          () => {
            console.log("Sequence completed");
          },
        ]}
        wrapper="span"
        cursor={true}
        repeat={Infinity}
        style={{ fontSize: "3.5em", display: "inline-block", fontFamily: "sans-serif", color: "#7D0A0A " }}
      />
  
      {/* ✅ Content Below the Animation */}
      {loading ? (
        /* ✅ Skeleton Loader */
        <Card className="w-full max-w-lg shadow-lg p-6 mt-6">
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mx-auto" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </CardContent>
        </Card>
      ) : (
        /* ✅ Show Registration Form Only If User Isn't Registered */
        registeredCourses?.length === 0 && (
          <Card className="w-full max-w-lg shadow-lg p-6 mt-6">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold">Course Registration</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Full Name</Label>
                  <Input value={profile?.name || ""} disabled />
                </div>
  
                <div>
                  <Label>Email</Label>
                  <Input type="email" value={profile?.email || ""} disabled />
                </div>
  
                {/* ✅ Multiple Course Selection */}
                <div>
                  <p className="text-lg font-semibold">Select Courses:</p>
                  <p className="text-sm text-gray-600 mb-2">You can select multiple courses.</p>
                  <div className="border p-3 rounded-md bg-gray-50">
                    {courses.length === 0 ? (
                      <p className="text-sm text-gray-500">Loading courses...</p>
                    ) : (
                      courses.map((course) => (
                        <label
                          key={course.id}
                          className="flex items-center space-x-3 my-2 p-2 border rounded-md bg-white cursor-pointer hover:bg-gray-100"
                        >
                          <input
                            type="checkbox"
                            className="h-5 w-5 accent-blue-500"
                            checked={selectedCourses.includes(course.id)}
                            onChange={() => handleCheckboxChange(course.id)}
                          />
                          <div>
                            <p className="text-md font-semibold">{course.name}</p>
                            <p className="text-sm text-gray-600">{course.description}</p>
                          </div>
                        </label>
                      ))
                    )}
                  </div>
                </div>
  
                <Button type="submit" className="w-full">Register</Button>
              </form>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
  
}
