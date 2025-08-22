// frontend/src/pages/SessionEditor.jsx
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box, Button, FormControl, FormLabel, Heading, Input, Textarea,
  HStack, useToast, Badge, VStack, Spinner
} from "@chakra-ui/react";
import api from "../utils/axiosConfig";

export default function SessionEditor() {
  const { id } = useParams();               // undefined => new
  const navigate = useNavigate();
  const toast = useToast();

  const [title, setTitle] = useState("");
  const [tagsInput, setTagsInput] = useState(""); // comma separated
  const [jsonUrl, setJsonUrl] = useState("");
  const [status, setStatus] = useState("draft");
  const [saving, setSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState(null);
  const [loading, setLoading] = useState(false);

  const timerRef = useRef(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  // Load existing session if editing
  useEffect(() => {
    (async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await api.get(`/my-sessions/${id}`);
        const s = res.data;
        setTitle(s.title || "");
        setTagsInput((s.tags || []).join(", "));
        setJsonUrl(s.json_file_url || "");
        setStatus(s.status || "draft");
      } catch (e) {
        toast({ title: "Failed to load session", status: "error" });
      } finally {
        if (mountedRef.current) setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Debounced autosave: 5s inactivity
  const triggerAutoSave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      handleSaveDraft(true);
    }, 5000);
  };

  useEffect(() => {
    // Only trigger auto-save when user types, not on initial load
    if (!mountedRef.current) return;
    triggerAutoSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, tagsInput, jsonUrl]);

  // Helper to check if payload has meaningful content
  const hasMeaningfulContent = () => {
    const t = (title || "").toString().trim();
    const j = (jsonUrl || "").toString().trim();
    const tags = (tagsInput || "").split(",").map(s => s.trim()).filter(Boolean);
    return t.length > 0 || j.length > 0 || tags.length > 0;
  };

  const handleSaveDraft = async (isAuto = false) => {
    // Don't save empty drafts
    if (!hasMeaningfulContent()) {
      if (!isAuto) toast({ title: "Nothing to save", status: "info" });
      return;
    }

    try {
      setSaving(true);
      const payload = {
        id: id || null,
        title: (title || "").toString().trim(),
        tags: (tagsInput || "").split(",").map(t => t.trim()).filter(Boolean),
        json_file_url: (jsonUrl || "").toString().trim(),
      };
      const res = await api.post("/my-sessions/save-draft", payload);
      if (!id && res.data?._id) {
        navigate(`/editor/${res.data._id}`, { replace: true });
      }
      setStatus("draft");
      setLastSavedAt(new Date());
      if (!isAuto) {
        toast({ title: "Draft saved", status: "success", duration: 1500 });
      } else {
        
      }
    } catch (e) {

      const msg = e?.response?.data?.message || "Save failed";
      if (!isAuto) toast({ title: msg, status: "error" });
    } finally {
      if (mountedRef.current) setSaving(false);
    }
  };

  const handlePublish = async () => {
    const trimmedTitle = (title || "").toString().trim();
    if (!trimmedTitle) {
      toast({ title: "Title required to publish", status: "warning" });
      return;
    }

    try {
      setSaving(true);
      const payload = {
        id: id || null,
        title: trimmedTitle,
        tags: (tagsInput || "").split(",").map(t => t.trim()).filter(Boolean),
        json_file_url: (jsonUrl || "").toString().trim(),
      };
      const res = await api.post("/my-sessions/publish", payload);
      setStatus("published");
      toast({ title: "Session published", status: "success" });
      navigate("/my-sessions");
    } catch (e) {
      const msg = e?.response?.data?.message || "Publish failed";
      toast({ title: msg, status: "error" });
    } finally {
      if (mountedRef.current) setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box bg="white" p={6} rounded="md" shadow="sm" textAlign="center">
        <Spinner /> Loading...
      </Box>
    );
  }

  return (
    <Box bg="white" p={6} rounded="md" shadow="sm">
      <HStack mb={4} justify="space-between" align="center">
        <Heading size="lg">{id ? "Edit Session" : "New Session"}</Heading>
        <Badge colorScheme={status === "published" ? "green" : "yellow"}>{status}</Badge>
      </HStack>

      <VStack align="stretch" spacing={4}>
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g., Morning Yoga Flow"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Tags (comma separated)</FormLabel>
          <Textarea
            value={tagsInput}
            onChange={e => setTagsInput(e.target.value)}
            placeholder="yoga, beginner, 20min"
            rows={2}
          />
        </FormControl>

        <FormControl>
          <FormLabel>JSON File URL</FormLabel>
          <Input
            value={jsonUrl}
            onChange={e => setJsonUrl(e.target.value)}
            placeholder="https://example.com/session.json"
          />
        </FormControl>

        <HStack>
          <Button isLoading={saving} onClick={() => handleSaveDraft(false)} variant="outline">
            Save Draft
          </Button>
          <Button isLoading={saving} colorScheme="teal" onClick={handlePublish}>
            Publish
          </Button>
          <Button variant="ghost" onClick={() => {
            // cancel edits: go back
            navigate("/my-sessions");
          }}>
            Cancel
          </Button>
        </HStack>

        {lastSavedAt && (
          <Box mt={3} color="gray.500" fontSize="sm">
            Auto-saved at {lastSavedAt.toLocaleTimeString()}
          </Box>
        )}
      </VStack>
    </Box>
  );
}
