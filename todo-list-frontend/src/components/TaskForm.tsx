import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { createTask } from "../services/api";

interface TaskFormProps {
  onTaskAdded: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("El título es obligatorio.");
      return;
    }

    if (description.trim().length < 10) {
      setError("La descripción debe tener al menos 10 caracteres.");
      return;
    }

    try {
      await createTask({
        title: title.trim(),
        description: description.trim(),
        isCompleted: false,
      });

      setTitle("");
      setDescription("");
      setError(null);
      onTaskAdded();
    } catch (err) {
      console.error("Error al crear la tarea:", err);
      setError("Error al crear la tarea.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
      }}
    >
      <Typography variant="h6">Agregar Tarea</Typography>
      <TextField
        label="Título"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Descripción"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        required
        multiline
        rows={4}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit" variant="contained" color="primary">
        Crear Tarea
      </Button>
    </Box>
  );
};

export default TaskForm;
