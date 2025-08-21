import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, useToast } from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/axiosConfig";

export default function Register() {
  const toast = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register", { email, password });
      toast({ title: "Account created", status: "success" });
      navigate("/login");
    } catch (err) {
      toast({ title: "Register failed", description: err?.response?.data?.message || "Try again", status: "error" });
    }
  };

  return (
    <Box bg="white" p={6} rounded="md" shadow="sm" maxW="sm" mx="auto" mt={10}>
      <Heading size="md" mb={4}>Register</Heading>
      <VStack as="form" spacing={4} onSubmit={onSubmit}>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="teal" w="full">Create Account</Button>
        <Button as={Link} to="/login" variant="link" colorScheme="teal">Back to Login</Button>
      </VStack>
    </Box>
  );
}
