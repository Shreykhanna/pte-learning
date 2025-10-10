import { useState, useEffect } from "react";
import { Box, Button, Textarea } from "@chakra-ui/react";
import CountdownTimer from "../timer/CountdownTimer";

const SummariseSpokenText = () => {
  const [answer, setAnswer] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const onHandleSubmit = () => {};
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
        <h1>{"Summarise Spoken Text"}</h1>
      </Box>
      {/* <Box mb={6} fontSize={20} sx={{ color: "black" }}>
        <h1>{question}</h1>
      </Box> */}
      <Box width="full">
        <CountdownTimer duration={20 * 60} />
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
          onClick={() => onHandleSubmit()}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default SummariseSpokenText;
