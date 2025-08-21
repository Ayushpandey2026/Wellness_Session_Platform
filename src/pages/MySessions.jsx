import { useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Tag, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosConfig";

export default function MySessions() {
  const [mine, setMine] = useState([]);
  const navigate = useNavigate();

  const load = async () => {
    try {
      const res = await api.get("/my-sessions");
      setMine(res.data || []);
    } catch {
      setMine([]);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <VStack align="stretch" spacing={4}>
      <Flex align="center">
        <Heading size="lg">My Sessions</Heading>
        <Button ml="auto" colorScheme="teal" onClick={() => navigate("/editor")}>
          + New Session
        </Button>
      </Flex>

      {mine.map((s) => (
        <Box key={s._id} bg="white" p={4} rounded="md" shadow="xs" border="1px" borderColor="gray.100">
          <Flex align="center" mb={2}>
            <Heading size="md">{s.title}</Heading>
            <Button ml="auto" size="sm" onClick={() => navigate(`/editor/${s._id}`)}>
              Edit
            </Button>
          </Flex>
          <Text fontSize="sm" color="gray.600" mb={2}>Status: {s.status}</Text>
          <Text fontSize="sm" color="gray.600" mb={2}>JSON URL: {s.json_file_url}</Text>
          <Box>
            {(s.tags || []).map((t, i) => <Tag key={i} mr={2} mb={2}>{t}</Tag>)}
          </Box>
        </Box>
      ))}

      {mine.length === 0 && <Text>No sessions yet. Create your first.</Text>}
    </VStack>
  );
}
