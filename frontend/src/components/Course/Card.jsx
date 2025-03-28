import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function CourseCard(props) {
    const course = props.course;
    const disableGoToCourse = props.disableGoToCourse;
    return (
        <Card key={course.id} className="bg-gray-100 text-black flex flex-col h-full max-w-sm" {...props}>
            <CardHeader>
              <CardTitle className="text-lg">{course.name}</CardTitle>
              {/* <p className="text-sm text-gray-600">NEW COURSE</p> */}
            </CardHeader>
            {!disableGoToCourse && (
            <CardContent className="p-4 flex flex-col flex-grow">
              <div className="flex-grow"></div>
              <div className="mt-auto">
                <Link to={`/course/${course.id}`}>
                  <Button variant="outline" className="w-full bg-white text-black hover:bg-gray-200">
                    Go to Course Page &gt;
                  </Button>
                </Link>
              </div>
            </CardContent>
            )}
          </Card>
    );
}