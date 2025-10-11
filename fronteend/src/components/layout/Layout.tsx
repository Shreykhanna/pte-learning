import { Box } from "@chakra-ui/react";
import { Header } from "../header/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box bg="gray.50" minH="100vh">
      <Header />
      <Box maxW="container.lg" py={8} mx="auto">
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
