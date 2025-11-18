import { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import AudioRecorder from "../recorder/AudioRecorder";
import CountdownTimer from "../timer/CountdownTimer";
import ProgressBar from "../progressbar/ProgressBar";
import PTEAudioRecorder from "../recorder/PTEAudioRecorder";
import { OpenAI } from "openai";

import axios from "axios";
const ReadAloud: React.FC = () => {
  const [sentence, setSentence] = useState<string>("");
  const [recording, setRecording] = useState<any>();
  const [countdown, setCountdown] = useState(45);
  const [timeLeft, setTimeLeft] = useState(60);
  const [phase, setPhase] = useState<"prep" | "recording" | "done">("prep");
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  useEffect(() => {
    // fetch data from backend
    setSentence("The quick brown fox jumps over the lazy dog.");
  }, []);

  const handleStart = (recording: any) => {
    // Logic to start reading aloud
    console.log("Reading started");
    setRecording(recording);
  };

  const handleClickSubmit = () => {
    // AI to evaluate the recording and give score and suggestions for improvements
    axios
      .post("/api/speech-to-text", {
        audio: recording,
      })
      .then(async (response) => {
        const improved = await client.chat.completions.create({
          model: "gpt-4.1",
          messages: [
            {
              role: "system",
              content: "Fix grammar and suggest improvements.",
            },
            { role: "user", content: response.data.text },
          ],
        });

        const suggestions = improved.choices[0].message.content;
        <Box mt={4} fontSize={18} sx={{ color: "black" }}>
          <h2>Suggestions for Improvement:</h2>
          <p>{suggestions}</p>
        </Box>;
      })
      .catch((error) => {
        console.error("Error during transcription:", error);
      });
  };
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      border={"1px solid gray"}
      p={4}
      m={4}
      borderRadius={8}
      borderColor={"gray.300"}
      background={"white"}
      color={"black"}
    >
      <Box mb={6} fontSize={22} fontWeight={"bold"} textAlign={"center"}>
        <h1>Read Aloud</h1>
      </Box>
      <Box sx={{ width: "100%", mb: 6 }}>
        <ProgressBar
          countdown={countdown}
          timeLeft={timeLeft}
          phase={phase}
          prepTime={45}
          recordTime={60}
        />
      </Box>

      <Box mb={6} fontSize={20} sx={{ color: "black" }}>
        <h1>{sentence}</h1>
      </Box>

      <Box>
        {/* Audio recording component goes here */}
        <PTEAudioRecorder
          countdown={countdown}
          setCountdown={setCountdown}
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          setPhase={setPhase}
          phase={phase}
          recordTime={45}
          prepTime={45}
        />
      </Box>

      <Box mt={4}>
        <Button
          onClick={() => handleStart(recording)}
          sx={{ background: "linear-gradient(to right, #4caf50, #81c784)" }}
        >
          Start
        </Button>
      </Box>
      <Box mt={4}>
        <Button
          onClick={() => handleClickSubmit()}
          sx={{ background: "linear-gradient(to right, #7928CA, #FF0080)" }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};
export default ReadAloud;
