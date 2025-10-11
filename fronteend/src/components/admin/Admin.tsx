import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { FileUploader } from "../fileuploader/FileUploader";
import ReTellLecture from "./ReTellLecture";
import ReadAloud from "./ReadAloud";

const Admin = () => {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <Flex h="100vh" bg="gray.100">
      {/* Sidebar */}
      <Box
        w="250px"
        bg="white"
        p={6}
        boxShadow="lg"
        display="flex"
        flexDirection="column"
      >
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          Admin Panel
        </Text>

        <VStack align="stretch" spacing={3}>
          <Button
            variant={activePage === "dashboard" ? "solid" : "ghost"}
            colorScheme="blue"
            onClick={() => setActivePage("dashboard")}
          >
            Dashboard
          </Button>
          <Button
            variant={activePage === "describe-image" ? "solid" : "ghost"}
            colorScheme="blue"
            onClick={() => setActivePage("describe-image")}
          >
            Describe Image
          </Button>
          <Button
            variant={activePage === "read-alouds" ? "solid" : "ghost"}
            colorScheme="blue"
            onClick={() => setActivePage("read-alouds")}
          >
            Read Alouds
          </Button>
          <Button
            variant={activePage === "retell-lecture" ? "solid" : "ghost"}
            colorScheme="blue"
            onClick={() => setActivePage("retell-lecture")}
          >
            Retell Lecture
          </Button>
        </VStack>

        <Divider my={6} />
        <Button colorScheme="red" variant="outline">
          Logout
        </Button>
      </Box>

      {/* Main Content */}
      <Flex flex="1" flexDirection="column" p={6}>
        {/* Top bar */}
        <HStack justify="space-between" mb={6}>
          <Text fontSize="xl" fontWeight="bold">
            {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
          </Text>
          <Button colorScheme="blue">+ New</Button>
        </HStack>

        {/* Content Area */}
        <Box
          flex="1"
          p={6}
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          overflowY="auto"
        >
          {activePage === "dashboard" && (
            <Text>Welcome to the dashboard 🎉</Text>
          )}
          {activePage === "describe-image" && <FileUploader />}
          {activePage === "read-alouds" && <ReadAloud />}
          {activePage === "retell-lecture" && <ReTellLecture />}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Admin;
