import React, { useState } from "react";
import { Task } from "../types/task";
import { updateTask } from "../services/api";
import { Box, TextField, Button, Typography, Checkbox, FormControlLabel } from "@mui/material";

interface TaskEditFormProps {
  task: Task;
  onTaskUpdated: () => void;
  onCancel: () => void;
}

const TaskEditForm: React.FC<TaskEditFormProps> = ({ task, onTaskUpdated, onCancel }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("El título es obligatorio");
      return;
    }
    if (description.trim().length < 10) {
      setError("La descripción debe tener al menos 10 caracteres");
      return;
    }

    const updatedTask = {
      id: task.id,
      title: title.trim(),
      description: description.trim(),
      isCompleted,
      createdAt: task.createdAt,
    };

    try {
      await updateTask(task.id, updatedTask);
      setError(null);
      onTaskUpdated();
    } catch (err) {
      console.error(err);
      setError("Error al actualizar la tarea");
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
      <Typography variant="h6">Editar Tarea</Typography>
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
      <FormControlLabel
        control={
          <Checkbox
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
          />
        }
        label="Completada"
      />
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button type="button" onClick={onCancel} variant="outlined" color="secondary">
          Cancelar
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Actualizar Tarea
        </Button>
      </Box>
    </Box>
  );
};

export default TaskEditForm;
