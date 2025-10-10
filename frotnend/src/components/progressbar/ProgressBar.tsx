import { Box, Progress, Text } from "@chakra-ui/react";

type ProgressBarProps = {
  prepTime: number;
  countdown: number;
  recordTime: number;
  timeLeft: number;
  phase: string;
};

const ProgressBar = ({
  prepTime,
  countdown,
  recordTime,
  timeLeft,
  phase,
}: ProgressBarProps) => {
  const percent = Math.max(
    0,
    phase === "prep"
      ? Math.min(100, ((prepTime - countdown) / prepTime) * 100)
      : phase === "recording"
      ? Math.min(100, ((recordTime - timeLeft) / recordTime) * 100)
      : 0
  );
  const isWarn = countdown <= 10;
  const label =
    phase === "prep"
      ? `Recording starts in ${countdown}s`
      : phase === "recording"
      ? `Time left: ${timeLeft}s`
      : "";

  return (
    <Box textAlign="center" width="100%">
      <Text mb={1} fontWeight="bold">
        {label}
      </Text>
      <Progress
        value={percent}
        size="md"
        colorScheme={isWarn ? "red" : "green"}
        borderRadius="md"
      />
    </Box>
  );
};

export default ProgressBar;
