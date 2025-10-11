import React from "react";
import { Button, ButtonProps, Flex, Link } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouterLink,
} from "react-router-dom";
import { LinkProps as RouterLinkProps } from "react-router-dom";
import "../../styles/Header.css";

type RouterButtonProps = ButtonProps & RouterLinkProps;

const RouterButton: React.FC<RouterButtonProps> = (props) => {
  return <Button as={RouterLink} {...props} />;
};

export const Header = () => {
  const orangishGradient = "linear-gradient(to right, #7928CA, #FF0080)";
  return (
    <>
      <Flex
        gap={5}
        p={4}
        border="1px solid gray"
        wrap="wrap"
        background={orangishGradient}
        className="nav-bar"
      >
        <Link
          href="/home"
          colorScheme="teal"
          variant="outline"
          sx={{ fontWeight: "bold", color: "black", textDecoration: "none" }}
        >
          Home
        </Link>
        <div className="dropdown">
          <Link
            href="/reading"
            colorScheme="teal"
            variant="outline"
            sx={{ fontWeight: "bold", color: "black", textDecoration: "none" }}
            className="nav-link"
          >
            Reading
          </Link>
          <div className="dropdown-content">
            <Link
              href="/reading/describe-image"
              sx={{ textDecoration: "none" }}
            >
              Describe Image
            </Link>
            <Link
              href="/reading/retell-lecture"
              sx={{ textDecoration: "none" }}
            >
              Retell Lecture
            </Link>
            <Link href="/reading/read-aloud" sx={{ textDecoration: "none" }}>
              Read Aloud
            </Link>
            <Link
              href="/reading/repeat-sentence"
              sx={{ textDecoration: "none" }}
            >
              Repeat Sentence
            </Link>
            <Link
              href="/reading/answer-short-question"
              sx={{ textDecoration: "none" }}
            >
              Answer Short Question
            </Link>
          </div>
        </div>
        <div className="dropdown">
          <Link
            href="/about"
            colorScheme="teal"
            variant="outline"
            sx={{ fontWeight: "bold", color: "black", textDecoration: "none" }}
            className="nav-link"
          >
            Listening
          </Link>
          <div className="dropdown-content">
            <Link
              href="/listening/summarise-spoken-text"
              sx={{ textDecoration: "none" }}
            >
              Summarise Spoken Text
            </Link>
            <Link
              href="/listening/write-from-dictation"
              sx={{ textDecoration: "none" }}
            >
              Write From Dictation
            </Link>
          </div>
        </div>
        <div className="dropdown">
          <Link
            href="/writing"
            colorScheme="teal"
            variant="outline"
            sx={{ fontWeight: "bold", color: "black", textDecoration: "none" }}
            className="nav-link dropdown-button"
          >
            Writing
          </Link>
          <div className="dropdown-content">
            <Link href="/writing/write-essay" sx={{ textDecoration: "none" }}>
              Write Essay
            </Link>
            <Link
              href="/writing/summarise-written-text"
              sx={{ textDecoration: "none" }}
            >
              Summarise Written Text
            </Link>
          </div>
        </div>
      </Flex>
    </>
  );
};
