import React, { useState } from "react";
import { Task } from "../types/task";
import { Card, CardContent, Typography, CardActions, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskEditForm from "./TaskEditForm";

interface TaskItemProps {
  task: Task;
  onTaskDeleted: (id: number) => void;
  onTaskUpdated: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onTaskDeleted, onTaskUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`¿Seguro que deseas eliminar la tarea "${task.title}"?`);
    if (!confirmDelete) return;

    try {
      await onTaskDeleted(task.id);
    } catch (err) {
      console.error("Error al eliminar la tarea:", err);
      alert("Ocurrió un error al intentar eliminar la tarea.");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleUpdate = () => {
    onTaskUpdated();
    setIsEditing(false);
  };

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        {isEditing ? (
          <TaskEditForm task={task} onTaskUpdated={handleUpdate} onCancel={handleCancelEdit} />
        ) : (
          <>
            <Typography variant="h6">{task.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {task.description}
            </Typography>
            <Typography variant="body2">
              Estado: {task.isCompleted ? "Completada" : "Pendiente"}
            </Typography>
          </>
        )}
      </CardContent>
      {!isEditing && (
        <CardActions>
          <IconButton color="primary" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};

export default TaskItem;
