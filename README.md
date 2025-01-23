# To-Do List App

Esta es una aplicación de gestión de tareas (To-Do List) desarrollada con React en el frontend y .NET Core en el backend. La aplicación permite a los usuarios realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre tareas.

## Instrucciones para ejecutar el proyecto localmente

### Requisitos previos

1. Node.js (versión 16 o superior).

2. .NET Core SDK (versión 6.0 o superior).

3. Un editor de código, como Visual Studio Code.

### Pasos

1. Clona este repositorio:
    ```
    git clone https://github.com/olista94/to-do-list.git
    cd todo-list-app
    ```
2. Inicia el backend:
- Navega a la carpeta del backend:
    ```
    cd To-Do-List
    ```
- Restaura las dependencias e inicia el servidor:
    ```
    dotnet restore
    dotnet run
    ```
- El backend estará disponible en http://localhost:5052/swagger/index.html

3. Inicia el frontend:
- Navega a la carpeta del frontend:
    ```
    cd todo-list-frontend
    ```
- Instala las dependencias e inicia el servidor:
    ```
    npm install
    npm start
    ```
- El frontend estará disponible en http://localhost:3000

5. Credenciales de usuario:

- Usuario: Oscar

- Contraseña: 1234

## Decisiones técnicas tomadas

### Frontend

1. Framework: React con TypeScript para un desarrollo estructurado y tipado.

2. UI: Material UI para un diseño moderno, responsivo y fácil de personalizar.

3. Estado: Hooks como useState y useEffect para manejar el estado local y los efectos secundarios.

4. Estructura: Componentes reutilizables (TaskForm, TaskItem, TaskList) para un código modular y mantenible.

### Backend

1. Framework: ASP.NET Core para construir una API REST robusta.

3. Base de datos: InMemoryDatabase para simplificar la persistencia durante el desarrollo.

4. Autenticación: Sistema básico de login con usuarios almacenados en la base de datos.
