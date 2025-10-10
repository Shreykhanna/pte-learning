import { useState } from "react";
import { Box, Button, Textarea } from "@chakra-ui/react";
import axios from "axios";

const ReadAloud = () => {
  const [sentence, setSentence] = useState("");

  const handleSave = () => {
    console.log("lecture", sentence);
    axios
      .post("http://localhost:5000/api/admin/read-aloud", {
        params: sentence,
      })
      .then(() => alert("Saved succesfully"))
      .catch(() => {
        console.log("Retry again!");
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
      <Box margin={4}>
        <h1>Read Alouds</h1>
      </Box>
      <Textarea
        onChange={(event) => {
          setSentence(event.target.value);
        }}
      />
      <Box mt={4}>
        <Button onClick={() => handleSave()}>Save</Button>
      </Box>
    </Box>
  );
};

export default ReadAloud;
