import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Box, Text, Button, VStack, List, ListItem } from "@chakra-ui/react";

export const FileUploader = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <ListItem key={file.path}>
      {file.path} - {(file.size / 1024).toFixed(2)} KB
    </ListItem>
  ));

  useEffect(() => {
    if (acceptedFiles.length === 0) return;
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    axios
      .post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Upload successful:", response.data);
      })
      .catch((error) => {
        console.error("Upload failed:", error);
      });
  }, [acceptedFiles]);

  return (
    <Box
      maxW="500px"
      mx="auto"
      mt={8}
      p={6}
      border="2px dashed"
      borderColor="gray.300"
      borderRadius="xl"
      textAlign="center"
      _hover={{ borderColor: "blue.400", cursor: "pointer" }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <VStack spacing={3}>
        <Text fontSize="lg" fontWeight="bold" color="gray.600">
          Drag & Drop your files here
        </Text>
        <Text fontSize="sm" color="gray.500">
          or click to select
        </Text>
        <Button colorScheme="blue" size="sm">
          Browse Files
        </Button>
      </VStack>

      {files.length > 0 && (
        <Box mt={6} textAlign="left">
          <Text fontWeight="semibold" mb={2}>
            Selected Files:
          </Text>
          <List spacing={1}>{files}</List>
        </Box>
      )}
    </Box>
  );
};
