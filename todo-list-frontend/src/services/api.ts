import axios from "../../node_modules/axios/index";

const api = axios.create({
  baseURL: "http://localhost:5052/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Obtener todas las tareas
export const fetchTasks = async () => {
  return api.get("/tasks");
};

// Crear una nueva tarea
export const createTask = async (task: { title: string; description: string; isCompleted: boolean }) => {
  return api.post("/tasks", task);
};

// Actualizar una tarea existente
export const updateTask = async (id: number, updatedTask: { title: string; description: string; isCompleted: boolean }) => {
  return api.put(`/tasks/${id}`, updatedTask);
};

// Eliminar una tarea
export const deleteTask = async (id: number) => {
  return api.delete(`/tasks/${id}`);
};

export default api;
