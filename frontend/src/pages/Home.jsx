import React from "react";
import { Button } from "@/components/ui/button";
import backgroundImage from "/banner.jpg";

export default function Home() {
    return (
        <div className="relative w-full h-[90vh] flex items-center justify-start ps-16 bg-gray-900 text-gray-700">
            {/* Background Image */}
            <div className="absolute inset-0">
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                />
                {/* Transparent White Overlay for Fading Effect */}
                <div className="absolute inset-0 bg-white opacity-50"></div>
            </div>

            {/* Content */}
            <div className="relative">
                <h1 className="text-4xl font-bold">
                    Welcome to the Deepseek Portal
                </h1>
                <p className="mt-2 text-lg">
                    IITM students can join us to avail the best assistance.
                </p>
                <Button className="mt-4 p-4 ps-8 pe-8">Join Us</Button>
            </div>
        </div>
    );
}
