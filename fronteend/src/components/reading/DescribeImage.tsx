import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Button, Select, Image } from "@chakra-ui/react";
import AudioRecorder from "../recorder/AudioRecorder";
import CountdownTimer from "../timer/CountdownTimer";
import ProgressBar from "../progressbar/ProgressBar";
import PTEAudioRecorder from "../recorder/PTEAudioRecorder";

type DescribeImageProps = {
  question: string;
  options: string[];
  answer: string;
  _id: number;
};
export const DescribeImage = () => {
  const [images, setImages] = useState<{ image: string }>({
    image: "",
  });
  const [limit, setLimit] = useState(0);

  const [answer, setAnswer] = useState<string>("");
  const [correctAnswer, setCorrectAnswer] = useState();
  const [countdown, setCountdown] = useState(45);
  const [timeLeft, setTimeLeft] = useState(60);
  const [phase, setPhase] = useState<"prep" | "recording" | "done">("prep");
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/describeImage", {
        params: { index: limit },
      })
      .then((res) => {
        setImages(res.data);
      });
  }, [limit]);

  const handleChange = (value: string) => {
    setAnswer(value);
  };

  console.log("images", images);
  const handleClickSubmit = () => {};

  //   const handleAIReasoning = (answer: string) => {
  //     console.log("question", question);
  //     console.log("answer", answer);
  //   };

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
      <Box
        mb={6}
        fontSize={24}
        fontWeight={"bold"}
        sx={{ textAlign: "center" }}
      >
        <h1>Describe Image</h1>
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

      <Box mb={6} p={4} width="600px" textAlign="center">
        <Image src={images?.image} alt="Describe" maxH="300px" mx="auto" />
      </Box>
      <Box alignContent={"center"}>
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
      <Box
        display={"flex"}
        gap={4}
        alignContent={"center"}
        justifyContent={"center"}
        mt={4}
      >
        <Button
          onClick={() => {
            setLimit((prev) => prev - 1);
            setCountdown(45);
            setTimeLeft(50);
          }}
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            setLimit((prev) => prev + 1);
            setCountdown(45);
            setTimeLeft(50);
          }}
        >
          Next
        </Button>
      </Box>
      <Box mt={4}>
        <Button onClick={handleClickSubmit}>Submit</Button>
      </Box>
      <Box mt={4} fontSize={12} color="gray">
        <Button
          onClick={() => {}}
          sx={{ background: "linear-gradient(to right, #7928CA, #FF0080)" }}
        >
          Reveal Reasoning
        </Button>
      </Box>
    </Box>
  );
};
