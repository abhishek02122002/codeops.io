import { useState, useEffect } from "react";
import { Box, Button, Heading, Text, Input, Tag, Progress, useToast } from "@chakra-ui/react";
import { challenges } from "./challenges";
import { FaShare, FaCheck } from "react-icons/fa";

const ChallengeSection = () => {
  const [userName, setUserName] = useState("Guest");
  const [completed, setCompleted] = useState([]);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const toast = useToast();

  // Load saved progress from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem("challengeUsername");
    const savedProgress = JSON.parse(localStorage.getItem("challengeProgress")) || [];
    if (savedName) setUserName(savedName);
    if (savedProgress) setCompleted(savedProgress);
  }, []);

  // Save progress
  const markComplete = (id) => {
    if (!completed.includes(id)) {
      const newCompleted = [...completed, id];
      setCompleted(newCompleted);
      localStorage.setItem("challengeProgress", JSON.stringify(newCompleted));
      toast({ title: "Challenge completed!", status: "success" });
    }
  };

  // Calculate score
  const totalScore = challenges.reduce(
    (sum, challenge) => (completed.includes(challenge.id) ? sum + challenge.points : sum),
    0
  );

  // Share results
  const shareResults = () => {
    const shareText = `I scored ${totalScore} points on @CodeOps challenges! ${window.location.href}`;
    navigator.clipboard.writeText(shareText);
    toast({ title: "Copied to clipboard!", status: "info" });
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <Input
        value={userName}
        onChange={(e) => {
          setUserName(e.target.value);
          localStorage.setItem("challengeUsername", e.target.value);
        }}
        mb={4}
        placeholder="Enter your name"
      />

      <Heading size="md">{challenges[currentChallenge].title}</Heading>
      <Text my={2}>{challenges[currentChallenge].description}</Text>
      <Tag>{challenges[currentChallenge].difficulty}</Tag>

      <Button
        leftIcon={<FaCheck />}
        mt={4}
        onClick={() => markComplete(challenges[currentChallenge].id)}
      >
        Mark Complete
      </Button>

      <Progress
        value={(completed.length / challenges.length) * 100}
        mt={6}
        colorScheme="green"
      />

      <Text mt={2}>
        Score: {totalScore} ({completed.length}/20 done)
      </Text>

      <Button leftIcon={<FaShare />} mt={4} onClick={shareResults}>
        Share Progress
      </Button>
    </Box>
  );
};

export default ChallengeSection;