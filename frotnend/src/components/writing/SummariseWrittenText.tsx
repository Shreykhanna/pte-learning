import { useEffect, useState } from "react";
import { Textarea } from "@chakra-ui/react";
import { Box, Button } from "@chakra-ui/react";
import { CountdownTimer } from "../timer/CountdownTimer";

export const SummariseWrittenText = () => {
  const [answer, setAnswer] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [wordCount, setWordCount] = useState<number>(0);
  const instructions = `Summarise Written Text`;

  useEffect(() => {
    // fetch data from backend
    setQuestion("What is React?");
  }, []);
  const onHandleSubmit = (answer: string) => {};

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
        <h1>{instructions}</h1>
      </Box>
      <Box mb={6} fontSize={20} sx={{ color: "black" }}>
        <h1>{question}</h1>
        {/* <Countdown date={Date.now() + 10000} />, */}
      </Box>
      <Box width={"full"}>
        <CountdownTimer duration={10 * 60} />
      </Box>
      <Box sx={{ mb: 4 }}>{`Word count : ${wordCount}`}</Box>
      <Box width={"full"}>
        <Textarea
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            setWordCount(e.target.value.split(" ").length);
          }}
        />
      </Box>

      <Box>
        <Button
          sx={{
            mt: 4,
            background: "linear-gradient(to right, #7928CA, #FF0080)",
          }}
          onClick={() => onHandleSubmit(answer)}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};
