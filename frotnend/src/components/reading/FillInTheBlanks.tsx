import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Button, Select } from "@chakra-ui/react";

type FillInTheBlanksProps = {
  question: string;
  options: string[];
  answer: string;
  _id: number;
};
export const FillInTheBlanks = () => {
  const [result, setResult] = useState<FillInTheBlanksProps>({
    question: "",
    options: [],
    answer: "",
    _id: 0,
  });
  const [limit, setLimit] = useState(0);

  const [answers, setAnswers] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/fillintheblanks", {
        params: { index: limit },
      })
      .then((res) => {
        setResult(res.data);
      });
  }, [limit]);

  const handleChange = (value: string) => {
    setAnswers(value);
  };

  const handleClickSubmit = () => {
    console.log("Submitted answers:", answers);
    console.log("Correct answer:", result.answer);
    console.log("All selected answers:", answers);

    if (result.answer === answers) {
      alert("Correct answer!");
      setIsCorrect((prev) => !prev);
    } else {
      setIsCorrect((prev) => !prev);
    }
  };

  const handleAIReasoning = (question: string, answer: string) => {
    console.log("question", question);
    console.log("answer", answer);
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
      <Box
        mb={6}
        fontSize={24}
        fontWeight={"bold"}
        sx={{ textAlign: "center" }}
      >
        <h1>Fill in the blanks</h1>
      </Box>
      <Box
        mb={6}
        p={4}
        gap={4}
        width={"600px"}
        textAlign={"center"}
        fontSize={18}
        fontStyle={"italic"}
      >
        {result.question
          .split("____")
          .map((part: string, bIndex: number, arr: string[]) => (
            <span key={bIndex}>
              {part}
              {bIndex < arr.length - 1 && (
                <>
                  <Select
                    placeholder="Select option"
                    value={answers || ""}
                    onChange={(e) => handleChange(e.target.value)}
                    width="200px"
                    display="inline-block"
                    mx={2}
                    borderColor={isCorrect === false ? "red" : "gray.200"}
                  >
                    {result.options.map((opt: string, optIdx: number) => (
                      <option key={optIdx} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </Select>
                  <Box>
                    {isCorrect === false && (
                      <span style={{ color: "red" }}>Incorrect!</span>
                    )}
                  </Box>
                </>
              )}
            </span>
          ))}
      </Box>
      <Box
        display={"flex"}
        gap={4}
        alignContent={"center"}
        justifyContent={"center"}
      >
        <Button onClick={() => setLimit((prev) => prev - 1)}>Previous</Button>
        <Button onClick={() => setLimit((prev) => prev + 1)}>Next</Button>
      </Box>
      <Box mt={4}>
        <Button onClick={handleClickSubmit}>Submit</Button>
      </Box>
      <Box mt={4} fontSize={12} color="gray">
        <Button
          onClick={() => handleAIReasoning(result.question, result.answer)}
          sx={{ background: "linear-gradient(to right, #7928CA, #FF0080)" }}
        >
          Reveal Reasoning
        </Button>
      </Box>
    </Box>
  );
};
