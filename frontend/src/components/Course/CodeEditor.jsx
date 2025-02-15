import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github"; // Themes
import { MdLightMode, MdDarkMode } from "react-icons/md";

// Import ShadCN Components
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function CodeEditor({ module }) {
  const [code, setCode] = useState(module.codeTemplate);
  const [isDarkMode, setIsDarkMode] = useState(true); // Mode

  // Function to toggle theme
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="relative w-full pb-9">
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
        <Button variant="outline">Test Run</Button>
        <Button variant="default">Submit</Button>
      </div>

      {/* Test Cases Section */}
      <div className="mt-6">
        <h4 className="font-semibold text-lg mb-2">Test Cases</h4>

        {/* ShadCN Table */}
        <Table className="border rounded-lg shadow-md">
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead className="py-2 px-4 text-left">Input</TableHead>
              <TableHead className="py-2 px-4 text-left">Expected Output</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {module.testCases.map((testCase, index) => (
              <TableRow key={index} className="border-t">
                <TableCell className="py-2 px-4">{testCase.inputData}</TableCell>
                <TableCell className="py-2 px-4">{testCase.expectedOutput}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
