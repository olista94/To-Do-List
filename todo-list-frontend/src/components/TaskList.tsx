import React from "react";
import { Task } from "../types/task";
import TaskItem from "./TaskItem";
import { Grid, Typography } from "@mui/material";
import { deleteTask } from "../services/api";

interface TaskListProps {
  tasks: Task[];
  onTaskDeleted: () => void;
  onTaskUpdated: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskDeleted, onTaskUpdated }) => {
  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      onTaskDeleted();
    } catch (err) {
      console.error("Error al eliminar la tarea:", err);
      alert("Error al intentar eliminar la tarea.");
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Lista de Tareas
      </Typography>
      <Grid container spacing={2}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <TaskItem
              task={task}
              onTaskDeleted={handleDelete}
              onTaskUpdated={onTaskUpdated}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TaskList;

