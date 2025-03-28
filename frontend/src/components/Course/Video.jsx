import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Video({ module }) {
  const [transcript, setTranscript] = useState(null);
  const [isTranscriptVisible, setIsTranscriptVisible] = useState(false);
  const { toast } = useToast();

  // Reset transcript visibility and content when the video URL changes
  useEffect(() => {
    setTranscript(null); // Clear the transcript content
    setIsTranscriptVisible(false); // Hide the transcript
  }, [module.url]); // Dependency on module.url

  // Function to clean up the transcript
  function cleanTranscript(text) {
    // Replace multiple spaces with a single space
    let cleanedText = text.replace(/\s+/g, " ").trim();

    // Optional: Break long sentences into shorter lines (e.g., max 80 characters)
    const maxLineLength = 80;
    let finalText = "";
    let currentLine = "";

    cleanedText.split(" ").forEach((word) => {
      if (currentLine.length + word.length + 1 > maxLineLength) {
        finalText += currentLine + "\n";
        currentLine = word;
      } else {
        currentLine += (currentLine ? " " : "") + word;
      }
    });

    finalText += currentLine; // Append the last part of the sentence
    return finalText;
  }

  function showTranscript() {
    if (!isTranscriptVisible) {
      axios
        .get(`${apiUrl}/video-transcript?videoURL=${module.url}`)
        .then((response) => {
          const cleanedTranscript = cleanTranscript(response.data.transcript);
          setTranscript(cleanedTranscript);
          setIsTranscriptVisible(true); // Show the transcript after fetching it
        })
        .catch((error) => {
          toast({
            title: "Error fetching transcript",
            description: "Unable to fetch transcript. Please try again later.",
            variant: "destructive",
            duration: 3000,
          });
        });
    } else {
      setIsTranscriptVisible(false); // Hide the transcript if already visible
    }
  }

  return (
    <>
      <div className="relative" style={{ paddingBottom: "56.25%", height: 0 }}>
        <iframe
          src={module.url}
          title={module.title}
          className="absolute top-0 left-0 w-full h-full rounded-md"
          allowFullScreen
        ></iframe>
      </div>
      <Button className="mt-4" onClick={() => showTranscript()}>
        {isTranscriptVisible ? "Hide Transcript" : "Show Transcript"}
      </Button>
      <br />
      {isTranscriptVisible && transcript && (
        <div
          className="transcript-box"
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            marginTop: "10px",
          }}
        >
          <pre>{transcript}</pre> {/* Use <pre> to preserve formatting */}
        </div>
      )}
    </>
  );
}
