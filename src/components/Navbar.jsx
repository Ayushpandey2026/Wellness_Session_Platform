import { Box, Flex, Heading, HStack, Link as CLink, Button, Spacer } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <Box bg="white" boxShadow="sm" px={4}>
      <Flex h={16} align="center" maxW="960px" mx="auto">
        <Heading size="md" color="teal.600">Arvyax Wellness</Heading>
        <HStack spacing={6} ml={8}>
          {isAuthenticated && (
            <>
              <CLink as={Link} to="/dashboard">Dashboard</CLink>
              <CLink as={Link} to="/my-sessions">My Sessions</CLink>
              <CLink as={Link} to="/editor">New Session</CLink>
            </>
          )}
        </HStack>
        <Spacer />
        {isAuthenticated ? (
          <HStack spacing={4}>
            <Box fontSize="sm" color="gray.600">{user?.email}</Box>
            <Button size="sm" colorScheme="red" onClick={() => { logout(); navigate("/login"); }}>
              Logout
            </Button>
          </HStack>
        ) : (
          <HStack spacing={3}>
            <Button as={Link} to="/login" size="sm" variant="ghost">Login</Button>
            <Button as={Link} to="/register" size="sm" colorScheme="teal">Register</Button>
          </HStack>
        )}
      </Flex>
    </Box>
  );
}
