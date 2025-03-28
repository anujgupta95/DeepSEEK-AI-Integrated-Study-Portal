import React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginButton from "@/components/LoginButton";
import logo from "/logo.png"; // Import the logo

export default function Login({ className, ...props }) {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 ">
      <div className="w-full max-w-5xl "> {/* Increased max-width for a bigger card */}
        <div className={cn("flex flex-col items-center gap-6", className)} {...props}>

          <Card className="w-full shadow-2xl rounded-3xl p-12 "> {/* Bigger padding and rounded corners */}
            <CardHeader className="flex flex-col items-center text-center gap-6 p-8">

              {/* Huge Logo */}
              <img src={logo} alt="Deepseek Logo" className="w-32 h-32" /> {/* Super big logo */}

              {/* Huge App Name */}
              <h2 className="text-6xl font-bold text-gray-900">DeepSEEK</h2>

              {/* Bigger App Description */}
              <CardDescription className="text-gray-600 text-2xl">
                IITM Study Portal with AI Assistance
              </CardDescription>

            </CardHeader>

            <CardContent className="flex flex-col items-center">
              {/* Large Login Title */}
              {/* <CardTitle className="text-4xl font-bold text-center">Sign Up</CardTitle> */}

              {/* Bigger Button */}
              <div className=" w-full flex justify-center">
                <LoginButton className="px-10 py-5 text-3xl p-10" /> {/* Huge button */}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
