import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import LoginForm from "./components/LoginForm";
import { fetchTasks } from "./services/api";
import { Task } from "./types/task";
import { AppBar, Toolbar, Typography, Fab, Modal, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  // Cargar tareas desde la API
  const loadTasks = async () => {
    try {
      const response = await fetchTasks();
      setTasks(response.data);
    } catch (err) {
      console.error("Error al cargar las tareas:", err);
    }
  };

  // Manejar login exitoso
  const handleLoginSuccess = (username: string) => {
    setIsAuthenticated(true);
    setUsername(username);
    loadTasks(); // Cargar las tareas tras autenticarse
  };

  // Abrir y cerrar el modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Mostrar formulario de login si no está autenticado
  if (!isAuthenticated) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div>
      {/* Encabezado estilizado */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            To-Do List
          </Typography>
          {isAuthenticated && (
            <Typography variant="body1">Hola, {username}</Typography>
          )}
        </Toolbar>
      </AppBar>

      {/* Contenido principal */}
      <Box sx={{ padding: 2 }}>
        <TaskList tasks={tasks} onTaskDeleted={loadTasks} onTaskUpdated={loadTasks} />

        {/* Botón flotante para añadir nueva tarea */}
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleOpen}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
          }}
        >
          <AddIcon />
        </Fab>

        {/* Modal para crear nueva tarea */}
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              Crear Nueva Tarea
            </Typography>
            <TaskForm
              onTaskAdded={() => {
                loadTasks();
                handleClose();
              }}
            />
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default App;
