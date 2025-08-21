import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, useToast } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate, Link } from "react-router-dom";
import api from "../utils/axiosConfig";

export default function Login() {
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const from = location.state?.from?.pathname || "/dashboard";

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { email, password });
      login(res.data.token, res.data.user);
      toast({ title: "Logged in", status: "success", duration: 1500 });
      navigate(from, { replace: true });
    } catch (err) {
      toast({ title: "Login failed", description: err?.response?.data?.message || "Invalid credentials", status: "error" });
    }
  };

  return (
    <Box bg="white" p={6} rounded="md" shadow="sm" maxW="sm" mx="auto" mt={10}>
      <Heading size="md" mb={4}>Login</Heading>
      <VStack as="form" spacing={4} onSubmit={onSubmit}>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="teal" w="full">Login</Button>
        <Button as={Link} to="/register" variant="link" colorScheme="teal">Create an account</Button>
      </VStack>
    </Box>
  );
}
