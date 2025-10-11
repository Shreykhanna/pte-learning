// CountdownTimer.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Progress,
  Text,
  VStack,
  useTheme,
} from "@chakra-ui/react";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";

export interface CountdownTimerProps {
  duration: number; // seconds
  autoStart?: boolean;
  warnAt?: number; // seconds remaining when warning state should apply
  onComplete?: () => void;
  showProgress?: boolean;
  size?: "md" | "lg" | "xl";
  beepOnComplete?: boolean;
}

const formatTime = (totalSeconds: number) => {
  const s = Math.max(0, Math.floor(totalSeconds));
  const mm = Math.floor(s / 60)
    .toString()
    .padStart(2, "0");
  const ss = (s % 60).toString().padStart(2, "0");
  return `${mm}:${ss}`;
};

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  duration,
  autoStart = false,
  warnAt = 10,
  onComplete,
  showProgress = true,
  size = "lg",
  beepOnComplete = true,
}) => {
  const [remaining, setRemaining] = useState<number>(duration);
  const [running, setRunning] = useState<boolean>(autoStart);
  const intervalRef = useRef<number | null>(null);
  const startedAtRef = useRef<number | null>(null);
  const theme = useTheme();

  // small beep (short sinewave) as data URI
  const beepRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    if (beepOnComplete) {
      // tiny 440Hz beep encoded as base64 WAV (very small)
      // fallback: user agent may block autoplay if not user-interacted; the sound should play on user action
      const beepData =
        "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=";
      beepRef.current = new Audio(beepData);
    }
  }, [beepOnComplete]);

  // start / stop interval
  useEffect(() => {
    if (running && intervalRef.current == null) {
      // store start time to improve accuracy
      startedAtRef.current = Date.now();
      intervalRef.current = window.setInterval(() => {
        setRemaining((prev) => {
          // compute more accurate decrement using startedAtRef
          if (startedAtRef.current != null) {
            const elapsedMs = Date.now() - startedAtRef.current;
            const newRemaining = Math.max(
              0,
              duration - Math.floor(elapsedMs / 1000)
            );
            if (newRemaining === 0) {
              // stop interval
              if (intervalRef.current) {
                window.clearInterval(intervalRef.current);
                intervalRef.current = null;
              }
              setRunning(false);
              if (beepOnComplete && beepRef.current) {
                // try to play, may be blocked until user interaction
                void beepRef.current.play().catch(() => {});
              }
              onComplete && onComplete();
            }
            return newRemaining;
          }
          // fallback
          const next = prev - 1;
          if (next <= 0) {
            if (intervalRef.current) {
              window.clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            setRunning(false);
            if (beepOnComplete && beepRef.current) {
              void beepRef.current.play().catch(() => {});
            }
            onComplete && onComplete();
            return 0;
          }
          return next;
        });
      }, 250); // tick frequently for responsive UI (we compute precisely)
    }

    if (!running && intervalRef.current != null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
      startedAtRef.current = null;
    }

    return () => {
      if (intervalRef.current != null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running, duration, onComplete, beepOnComplete]);

  // reset handler
  const reset = (newDuration?: number) => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setRemaining(typeof newDuration === "number" ? newDuration : duration);
    setRunning(false);
    startedAtRef.current = null;
  };

  // start/pause handlers
  const handleStart = () => {
    // if starting again after pause, calibrate startedAtRef so elapsed continues correctly
    if (!running) {
      // calculate offset if remaining changed
      startedAtRef.current = Date.now() - (duration - remaining) * 1000;
    }
    setRunning(true);
  };
  const handlePause = () => setRunning(false);

  const percent = Math.max(
    0,
    Math.min(100, ((duration - remaining) / duration) * 100)
  );
  const isWarn = remaining <= warnAt;

  const sizeStyles: Record<
    string,
    { fontSize: string; px: number; py: number }
  > = {
    md: { fontSize: "lg", px: 3, py: 2 },
    lg: { fontSize: "4xl", px: 4, py: 3 },
    xl: { fontSize: "6xl", px: 6, py: 4 },
  };

  const styles = sizeStyles[size] || sizeStyles.lg;

  return (
    <VStack spacing={4} align="stretch">
      <Box textAlign="center">
        <Text
          as="div"
          fontWeight="700"
          fontSize={styles.fontSize}
          color={isWarn ? "red.500" : "gray.800"}
          aria-live="polite"
        >
          {formatTime(remaining)}
        </Text>
        <Text fontSize="sm" color="gray.500">
          {running ? "Running" : remaining === 0 ? "Time's up" : "Paused"}
        </Text>
      </Box>

      {showProgress && (
        <Progress
          value={percent}
          size="md"
          colorScheme={isWarn ? "red" : "green"}
          borderRadius="md"
          aria-label="time progress"
        />
      )}

      <HStack justify="center" spacing={3}>
        {!running ? (
          <IconButton
            aria-label="Start timer"
            icon={<Icon as={FaPlay as React.ElementType} />}
            onClick={handleStart}
            colorScheme="green"
            size="md"
          />
        ) : (
          <IconButton
            aria-label="Pause timer"
            icon={<Icon as={FaPause as React.ElementType} />}
            onClick={handlePause}
            colorScheme="yellow"
            size="md"
          />
        )}

        <IconButton
          aria-label="Reset timer"
          icon={<Icon as={FaRedo as React.ElementType} />}
          onClick={() => reset()}
          size="md"
        />
      </HStack>
    </VStack>
  );
};

export default CountdownTimer;
