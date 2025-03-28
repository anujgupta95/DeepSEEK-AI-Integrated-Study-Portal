import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";
import { useUser } from "@/context/UserContext"; // Import UserContext
import { useToast } from "@/hooks/use-toast";

const LoginButton = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, setProfile } = useUser(); // Use context for profile state
  const [user, setUser] = React.useState(null);
  const { toast } = useToast();
  const apiUrl = import.meta.env.VITE_API_URL;

  // Google Login Handler
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  // Fetch User Profile
  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          axios
            .post(`${apiUrl}/login`, res.data)
            .then((response) => {
              if (response.status === 200) {
                setProfile(response.data);
                toast({
                  title: "Login Successful",
                  description: "You have successfully logged in.",
                  variant: "default",
                  duration: 3000,
                });
                navigate("/course");
              } else {
                console.log("Failed to save user data to DB");
              }
            })
            .catch((err) => {
              console.log("Error saving user data to DB:", err);
              toast({
                title: "Error logging in",
                description: "Unable to log in. Please try again later.",
                variant: "destructive",
                duration: 3000,
              });
            });
        }) // Store profile in context
        .catch((err) => console.log(err));
    }
  }, [user, setProfile]);

  // Logout Function
  const logOut = () => {
    googleLogout();
    setProfile(null);
    setUser(null);
  };

  return (
    <div>
      {profile ? (
        <Button
          variant="outline"
          onClick={logOut}
          className="flex items-center gap-2 btn-color"
        >
          <LogOut size={16} />
          Logout
        </Button>
      ) : (
        <Button
          onClick={login}
          className={`flex items-center gap-2 text-lg btn-color ${props.className}`}
        >
          <LogIn size={16} />
          {location.pathname === "/authenticate" ? "Sign Up" : "Login"}
        </Button>
      )}
    </div>
  );
};

export default LoginButton;
