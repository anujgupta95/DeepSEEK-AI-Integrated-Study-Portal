import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/hooks/use-toast";
import { python } from "@codemirror/lang-python";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github"; // Themes
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { Loader } from "lucide-react";
import axios from "axios";

import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

// Import ShadCN Components
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const apiUrl = import.meta.env.VITE_API_URL;

export default function CodeEditor({ module, deadline, isGraded }) {
  const { profile } = useUser();
  const { toast } = useToast();
  const formattedDeadline = deadline ? new Date(deadline).toLocaleString() : "No deadline provided";
  const [code, setCode] = useState(module.codeTemplate);
  const [isDarkMode, setIsDarkMode] = useState(true); // Theme mode
  const [showHint, setShowHint] = useState(false); // State to toggle hint
  const [showDebug, setShowDebug] = useState(false); // State to toggle hint
  const [testResults, setTestResults] = useState([]); // Store results of test cases
  const [loading, setLoading] = useState(false);
  const [debugLoading, setDebugLoading] = useState(false); // New state for debug button loading
  const [totalTestCases, setTotalTestCases] = useState(module.testCases.length); // Store total test cases
  const [passedTestCases, setPassedTestCases] = useState(0); // Store passed test cases
  const [showConfetti, setShowConfetti] = useState(false); // State to control confetti visibility
  const { width, height } = useWindowSize()
  const [debug, setDebug] = useState("");

  // Function to toggle theme
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    setCode(module.codeTemplate); // Reset code template when module changes
    setTotalTestCases(module.testCases.length); // Reset total test cases when module changes
  }, [module.moduleId]); // Dependency on module.url

  // Submit code and handle results
  const submitCode = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/submit/code`,
        {
          code: code,
          moduleId: module.moduleId,
          email: profile.email,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
      // Handle the success response
      const { results, totalTestCases } = response.data;

      // Calculate the number of passed test cases
      const passedCount = results.filter(result => result.isCorrect).length;

      setTestResults(results);
      setTotalTestCases(totalTestCases);
      setPassedTestCases(passedCount);

      // Show confetti if all test cases passed
      if (passedCount === totalTestCases) {
        setShowConfetti(true);
        // Hide confetti after 3 seconds
        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);
      }

      toast({
        title: "Submission successful",
        description: "Your code has been submitted successfully.",
        variant: "default",
        duration: 3000,
      });
      setShowDebug(false); // Hide debug output after submission
    } catch (error) {
      if (error.response) {
        // Check if the error response has a status code of 400 (bad request)
        if (error.response.status === 400) {
          const { message, line, syntaxError } = error.response.data;
          toast({
            title: "Syntax Error",
            description: `Error at line ${line}: ${syntaxError}`,
            variant: "destructive",
            duration: 3000,
          });
        } else {
          // Handle other errors (e.g., network error, server issues)
          toast({
            title: "Error submitting code",
            description: "Failed to submit code. Please try again later.",
            variant: "destructive",
            duration: 3000,
          });
        }
      } else {
        // In case of a network error or other unknown error
        toast({
          title: "Network Error",
          description: "Unable to connect to the server. Please check your internet connection.",
          variant: "destructive",
          duration: 3000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const debugCode = async () => {
    if (debugLoading) return; // Prevent multiple submissions

    setDebugLoading(true); // Set debug loading to true
    try {
      const response = await axios.post(
        `${apiUrl}/debug/code`,
        {
          code: code,
          moduleId: module.moduleId,
          email: profile.email,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data.choices[0].message.content);
      setDebug(response.data.choices[0].message.content);
      setShowDebug(true);
    }
    catch (error) {
      toast({
        title: "Error",
        description: "Failed to debug code. Please try again later.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setDebugLoading(false); // Set debug loading to false once request is complete
    }
  };

  return (
    <div className="relative w-full pb-9">
      <h3 className="font-semibold">Deadline: {formattedDeadline}</h3>
      <div className="flex justify-between items-end">
        <p className="text-gray-700">{module.description}</p>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="flex items-center border rounded-lg px-4 py-2 bg-gray-200 hover:bg-gray-300 transition duration-300"
        >
          {isDarkMode ? <MdDarkMode className="text-xl" /> : <MdLightMode className="text-xl" />}
          <span className="ml-2">{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
        </button>
      </div>

      {/* Code Editor */}
      <CodeMirror
        value={code}
        height="400px"
        style={{ padding: "10px", fontSize: 16 }}
        theme={isDarkMode ? githubLight : githubDark}
        extensions={[python()]} // ✅ Enables Python syntax highlighting
        onChange={(value) => setCode(value)}
      />

      {/* Buttons Section */}
      <div className="flex justify-end gap-4 mt-4">
        <Button variant="secondary" onClick={() => setShowHint(!showHint)}>
          {showHint ? "Hide Hint" : "Show Hint"}
        </Button>
        <Button 
          variant="outline" 
          onClick={debugCode} 
          disabled={debugLoading} // Disable button when loading
        >
          {debugLoading ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            <p>Debug</p>
          )}
        </Button>
        <Button variant="default" onClick={submitCode} disabled={loading}>
          {loading ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            <p>Submit</p>
          )}
        </Button>
      </div>

      {/* Hint Section */}
      {showHint && (
        <div className="mt-4 p-3 bg-blue-100 border-l-4 border-blue-500 rounded-md">
          <p className="text-blue-700 text-sm">💡 Hint: {module.hint || "No hint available."}</p>
        </div>
      )}

      {/* Debug Section */}
      {showDebug && (
        <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 rounded-md">
          <p className="text-green-700 text-sm">{debug || "Something went wrong."}</p>
        </div>
      )}

      {/* Test Cases Section */}
      <div className="mt-6">
        <h4 className="font-semibold text-lg mb-2">Test Cases: {passedTestCases}/{totalTestCases} passed</h4>

        {/* ShadCN Table */}
        <Table className="border rounded-lg shadow-md">
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead className="py-2 px-4 text-left">Input</TableHead>
              <TableHead className="py-2 px-4 text-left">Expected Output</TableHead>
              <TableHead className="py-2 px-4 text-left">Actual Output</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {module.testCases.map((testCase, index) => {
              const result = testResults.find((r) => r.input === testCase.inputData);
              return (
                <TableRow key={index} className="border-t">
                  <TableCell className="py-2 px-4">{testCase.inputData}</TableCell>
                  <TableCell className="py-2 px-4">{testCase.expectedOutput}</TableCell>
                  <TableCell className="py-2 px-4">
                    {result ? result.actualOutput : "------------"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Show Confetti if All Test Cases Passed */}
      {showConfetti && (
        <Confetti width={width} height={height} />
      )}
    </div>
  );
}
