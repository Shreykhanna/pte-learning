import { useEffect, useState } from "react";
import { Box, Button, Textarea } from "@chakra-ui/react";
import axios from "axios";
const ReTellLecture = () => {
  const [lecture, setLecture] = useState("");

  const handleSave = () => {
    console.log("lecture", lecture);
    axios
      .post("http://localhost:5000/api/admin/retell-lecture", {
        params: lecture,
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
        <h1>Retell lecture</h1>
      </Box>

      <Textarea
        onChange={(event) => {
          setLecture(event.target.value);
        }}
      />
      <Box mt={4}>
        <Button onClick={() => handleSave()}>Save</Button>
      </Box>
    </Box>
  );
};

export default ReTellLecture;
