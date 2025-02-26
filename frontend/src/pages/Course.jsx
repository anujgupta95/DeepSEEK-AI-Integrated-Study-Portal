import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import CourseCard from "@/components/Course/Card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/context/UserContext";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Course() {
  const { profile } = useUser(); // Get user info from context
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const { toast } = useToast(); // Get toast function

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/registered-courses?email=${profile.email}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data.registeredCourses || []);
      } catch (error) {
        toast({
          title: "Error fetching courses",
          description: "Unable to load course data. Please try again later.",
          variant: "destructive",
          duration: 3000,
        });
        setCourses([]);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchCourses();
  }, [profile.email]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="text-right mt-4 text-gray-600">
        <p className="text-lg">{formattedDate}</p>
        <p className="text-sm uppercase">January 2025 Term</p>
      </div>

      {/* Conditional Rendering */}
      {loading ? (
        // Show skeletons while loading
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="h-40 w-full rounded-md" />
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
          <p className="text-lg font-medium">You seem to be new here.</p>
          <Link to="/registration">
            <Button variant="default" className="mt-4">
              Course Registration &gt;
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold">My Current Courses</h1>
          </div>

          {/* Course List */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
