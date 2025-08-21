import { useEffect, useState } from "react";
import api from "../utils/axiosConfig";
import { Box, Grid, Heading, Tag, Text, VStack } from "@chakra-ui/react";

export default function Dashboard() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/sessions");
        setSessions(res.data || []);
      } catch {
        setSessions([]);
      }
    })();
  }, []);

  return (
    <VStack align="stretch" spacing={4}>
      <Heading size="lg">Published Sessions</Heading>
      <Grid templateColumns={["1fr", "repeat(2, 1fr)"]} gap={4}>
        {sessions.map((s) => (
          <Box key={s._id} bg="white" p={4} rounded="md" shadow="xs" border="1px" borderColor="gray.100">
            <Heading size="md" mb={2}>{s.title}</Heading>
            <Text fontSize="sm" color="gray.600" mb={2}>JSON URL: {s.json_file_url}</Text>
            <Box>
              {(s.tags || []).map((t, i) => <Tag key={i} mr={2} mb={2}>{t}</Tag>)}
            </Box>
          </Box>
        ))}
        {sessions.length === 0 && <Text>No published sessions yet.</Text>}
      </Grid>
    </VStack>
  );
}
