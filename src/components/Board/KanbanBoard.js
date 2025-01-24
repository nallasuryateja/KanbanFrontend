// // Updated KanbanBoard.js with responsive CSS for side-by-side columns
// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import axios from "axios";

// const KanbanBoard = () => {
//   const [columns, setColumns] = useState([]);
//   const [newColumnName, setNewColumnName] = useState("");
//   const [newTaskDetails, setNewTaskDetails] = useState({
//     title: "",
//     description: "",
//     columnId: null,
//   });

//   useEffect(() => {
//     fetchColumnsAndTasks();
//   }, []);

//   const fetchColumnsAndTasks = async () => {
//     try {
//       const [columnsResponse, tasksResponse] = await Promise.all([
//         axios.get("http://localhost:5050/api/columns"),
//         axios.get("http://localhost:5050/api/tasks"),
//       ]);

//       const columnsData = columnsResponse.data.map((column) => ({
//         ...column,
//         tasks: tasksResponse.data.filter(
//           (task) => task.column_id === column.id
//         ),
//       }));

//       setColumns(columnsData);
//     } catch (error) {
//       console.error("Error fetching columns or tasks:", error);
//     }
//   };

//   const handleAddColumn = async () => {
//     if (!newColumnName.trim()) {
//       alert("Column name cannot be empty");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5050/api/columns", {
//         name: newColumnName,
//       });
//       setColumns([...columns, { ...response.data, tasks: [] }]);
//       setNewColumnName("");
//     } catch (error) {
//       console.error("Error adding new column:", error);
//     }
//   };

//   const handleDeleteColumn = async (columnId) => {
//     try {
//       await axios.delete(`http://localhost:5050/api/columns/${columnId}`);
//       setColumns(columns.filter((column) => column.id !== columnId));
//     } catch (error) {
//       console.error("Error deleting column:", error);
//     }
//   };

//   const handleAddTask = async () => {
//     if (!newTaskDetails.title.trim() || !newTaskDetails.columnId) {
//       alert("Task title and column selection are required");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5050/api/tasks", {
//         title: newTaskDetails.title,
//         description: newTaskDetails.description,
//         column_id: newTaskDetails.columnId,
//       });

//       const updatedColumns = columns.map((column) => {
//         if (column.id === newTaskDetails.columnId) {
//           return { ...column, tasks: [...column.tasks, response.data] };
//         }
//         return column;
//       });

//       setColumns(updatedColumns);
//       setNewTaskDetails({ title: "", description: "", columnId: null });
//     } catch (error) {
//       console.error("Error adding new task:", error);
//     }
//   };

//   const handleDeleteTask = async (taskId, columnId) => {
//     try {
//       await axios.delete(`http://localhost:5050/api/tasks/${taskId}`);
//       const updatedColumns = columns.map((column) => {
//         if (column.id === columnId) {
//           return {
//             ...column,
//             tasks: column.tasks.filter((task) => task.id !== taskId),
//           };
//         }
//         return column;
//       });
//       setColumns(updatedColumns);
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   const handleDragEnd = async (result) => {
//     if (!result.destination) return;

//     const { source, destination } = result;

//     const sourceColumn = columns.find(
//       (col) => col.id.toString() === source.droppableId
//     );
//     const destColumn = columns.find(
//       (col) => col.id.toString() === destination.droppableId
//     );

//     const [movedTask] = sourceColumn.tasks.splice(source.index, 1);
//     destColumn.tasks.splice(destination.index, 0, movedTask);

//     setColumns([...columns]);

//     try {
//       await axios.put(`http://localhost:5050/api/tasks/${movedTask.id}`, {
//         column_id: destColumn.id,
//       });
//     } catch (error) {
//       console.error("Error updating task column:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Kanban Board</h1>

//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           placeholder="New Column Name"
//           value={newColumnName}
//           onChange={(e) => setNewColumnName(e.target.value)}
//           style={{
//             padding: "8px",
//             marginRight: "10px",
//             borderRadius: "4px",
//             border: "1px solid #ccc",
//           }}
//         />
//         <button
//           onClick={handleAddColumn}
//           style={{
//             padding: "8px 12px",
//             borderRadius: "4px",
//             backgroundColor: "#007bff",
//             color: "#fff",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           Add Column
//         </button>
//       </div>

//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           placeholder="Task Title"
//           value={newTaskDetails.title}
//           onChange={(e) =>
//             setNewTaskDetails({ ...newTaskDetails, title: e.target.value })
//           }
//           style={{
//             padding: "8px",
//             marginRight: "10px",
//             borderRadius: "4px",
//             border: "1px solid #ccc",
//           }}
//         />
//         <input
//           type="text"
//           placeholder="Task Description"
//           value={newTaskDetails.description}
//           onChange={(e) =>
//             setNewTaskDetails({
//               ...newTaskDetails,
//               description: e.target.value,
//             })
//           }
//           style={{
//             padding: "8px",
//             marginRight: "10px",
//             borderRadius: "4px",
//             border: "1px solid #ccc",
//           }}
//         />
//         <select
//           onChange={(e) =>
//             setNewTaskDetails({
//               ...newTaskDetails,
//               columnId: parseInt(e.target.value),
//             })
//           }
//           style={{
//             padding: "8px",
//             marginRight: "10px",
//             borderRadius: "4px",
//             border: "1px solid #ccc",
//           }}
//         >
//           <option value="">Select Column</option>
//           {columns.map((column) => (
//             <option key={column.id} value={column.id}>
//               {column.name}
//             </option>
//           ))}
//         </select>
//         <button
//           onClick={handleAddTask}
//           style={{
//             padding: "8px 12px",
//             borderRadius: "4px",
//             backgroundColor: "#28a745",
//             color: "#fff",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           Add Task
//         </button>
//       </div>

//       <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//         <DragDropContext onDragEnd={handleDragEnd}>
//           {columns.map((column) => (
//             <Droppable key={column.id} droppableId={column.id.toString()}>
//               {(provided) => (
//                 <div
//                   className="column"
//                   {...provided.droppableProps}
//                   ref={provided.innerRef}
//                   style={{
//                     flex: "1 1 calc(30% - 20px)",
//                     margin: "10px 0",
//                     padding: "10px",
//                     border: "1px solid #ccc",
//                     borderRadius: "5px",
//                     minWidth: "250px",
//                     backgroundColor: "#f9f9f9",
//                   }}
//                 >
//                   <h3>{column.name}</h3>
//                   <button
//                     onClick={() => handleDeleteColumn(column.id)}
//                     style={{
//                       marginBottom: "10px",
//                       backgroundColor: "#dc3545",
//                       color: "#fff",
//                       border: "none",
//                       padding: "5px 10px",
//                       cursor: "pointer",
//                     }}
//                   >
//                     Delete Column
//                   </button>
//                   {column.tasks.map((task, index) => (
//                     <Draggable
//                       key={task.id}
//                       draggableId={task.id.toString()}
//                       index={index}
//                     >
//                       {(provided) => (
//                         <div
//                           className="task-card"
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           style={{
//                             margin: "10px 0",
//                             padding: "10px",
//                             backgroundColor: "#f4f4f4",
//                             borderRadius: "5px",
//                             boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
//                           }}
//                         >
//                           <p>
//                             <strong>{task.title}</strong>
//                           </p>
//                           <p>{task.description}</p>
//                           <p>Assigned to: {task.assigned_user_id}</p>
//                           <button
//                             onClick={() => handleDeleteTask(task.id, column.id)}
//                             style={{
//                               marginTop: "10px",
//                               backgroundColor: "#dc3545",
//                               color: "#fff",
//                               border: "none",
//                               padding: "5px 10px",
//                               cursor: "pointer",
//                             }}
//                           >
//                             Delete Task
//                           </button>
//                         </div>
//                       )}
//                     </Draggable>
//                   ))}
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           ))}
//         </DragDropContext>
//       </div>
//     </div>
//   );
// };

// export default KanbanBoard;

// // Updated KanbanBoard.js with responsive CSS for side-by-side columns
// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import axios from "axios";

// const KanbanBoard = () => {
//   const [columns, setColumns] = useState([]);
//   const [newColumnName, setNewColumnName] = useState("");
//   const [newTaskDetails, setNewTaskDetails] = useState({
//     title: "",
//     description: "",
//     columnId: null,
//   });

//   useEffect(() => {
//     fetchColumnsAndTasks();
//   }, []);

//   const fetchColumnsAndTasks = async () => {
//     try {
//       const [columnsResponse, tasksResponse] = await Promise.all([
//         axios.get("http://localhost:5050/api/columns"),
//         axios.get("http://localhost:5050/api/tasks"),
//       ]);

//       const columnsData = columnsResponse.data.map((column) => ({
//         ...column,
//         tasks: tasksResponse.data.filter(
//           (task) => task.column_id === column.id
//         ),
//       }));

//       setColumns(columnsData);
//     } catch (error) {
//       console.error("Error fetching columns or tasks:", error);
//     }
//   };

//   const handleAddColumn = async () => {
//     if (!newColumnName.trim()) {
//       alert("Column name cannot be empty");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5050/api/columns", {
//         name: newColumnName,
//       });
//       setColumns([...columns, { ...response.data, tasks: [] }]);
//       setNewColumnName("");
//     } catch (error) {
//       console.error("Error adding new column:", error);
//     }
//   };

//   const handleDeleteColumn = async (columnId) => {
//     try {
//       await axios.delete(`http://localhost:5050/api/columns/${columnId}`);
//       setColumns(columns.filter((column) => column.id !== columnId));
//     } catch (error) {
//       console.error("Error deleting column:", error);
//     }
//   };

//   const handleAddTask = async () => {
//     if (!newTaskDetails.title.trim() || !newTaskDetails.columnId) {
//       alert("Task title and column selection are required");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5050/api/tasks", {
//         title: newTaskDetails.title,
//         description: newTaskDetails.description,
//         column_id: newTaskDetails.columnId,
//       });

//       const updatedColumns = columns.map((column) => {
//         if (column.id === newTaskDetails.columnId) {
//           return { ...column, tasks: [...column.tasks, response.data] };
//         }
//         return column;
//       });

//       setColumns(updatedColumns);
//       setNewTaskDetails({ title: "", description: "", columnId: null });
//     } catch (error) {
//       console.error("Error adding new task:", error);
//     }
//   };

//   const handleDeleteTask = async (taskId, columnId) => {
//     try {
//       await axios.delete(`http://localhost:5050/api/tasks/${taskId}`);
//       const updatedColumns = columns.map((column) => {
//         if (column.id === columnId) {
//           return {
//             ...column,
//             tasks: column.tasks.filter((task) => task.id !== taskId),
//           };
//         }
//         return column;
//       });
//       setColumns(updatedColumns);
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   const handleDragEnd = async (result) => {
//     if (!result.destination) return;

//     const { source, destination } = result;

//     const sourceColumn = columns.find(
//       (col) => col.id.toString() === source.droppableId
//     );
//     const destColumn = columns.find(
//       (col) => col.id.toString() === destination.droppableId
//     );

//     const [movedTask] = sourceColumn.tasks.splice(source.index, 1);
//     destColumn.tasks.splice(destination.index, 0, movedTask);

//     setColumns([...columns]);

//     try {
//       await axios.put(`http://localhost:5050/api/tasks/${movedTask.id}`, {
//         column_id: destColumn.id,
//       });
//     } catch (error) {
//       console.error("Error updating task column:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Kanban Board</h1>

//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           placeholder="New Column Name"
//           value={newColumnName}
//           onChange={(e) => setNewColumnName(e.target.value)}
//           style={{
//             padding: "8px",
//             marginRight: "10px",
//             borderRadius: "4px",
//             border: "1px solid #ccc",
//           }}
//         />
//         <button
//           onClick={handleAddColumn}
//           style={{
//             padding: "8px 12px",
//             borderRadius: "4px",
//             backgroundColor: "#007bff",
//             color: "#fff",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           Add Column
//         </button>
//       </div>

//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           placeholder="Task Title"
//           value={newTaskDetails.title}
//           onChange={(e) =>
//             setNewTaskDetails({ ...newTaskDetails, title: e.target.value })
//           }
//           style={{
//             padding: "8px",
//             marginRight: "10px",
//             borderRadius: "4px",
//             border: "1px solid #ccc",
//           }}
//         />
//         <input
//           type="text"
//           placeholder="Task Description"
//           value={newTaskDetails.description}
//           onChange={(e) =>
//             setNewTaskDetails({
//               ...newTaskDetails,
//               description: e.target.value,
//             })
//           }
//           style={{
//             padding: "8px",
//             marginRight: "10px",
//             borderRadius: "4px",
//             border: "1px solid #ccc",
//           }}
//         />
//         <select
//           onChange={(e) =>
//             setNewTaskDetails({
//               ...newTaskDetails,
//               columnId: parseInt(e.target.value),
//             })
//           }
//           style={{
//             padding: "8px",
//             marginRight: "10px",
//             borderRadius: "4px",
//             border: "1px solid #ccc",
//           }}
//         >
//           <option value="">Select Column</option>
//           {columns.map((column) => (
//             <option key={column.id} value={column.id}>
//               {column.name}
//             </option>
//           ))}
//         </select>
//         <button
//           onClick={handleAddTask}
//           style={{
//             padding: "8px 12px",
//             borderRadius: "4px",
//             backgroundColor: "#28a745",
//             color: "#fff",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           Add Task
//         </button>
//       </div>

//       <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//         <DragDropContext onDragEnd={handleDragEnd}>
//           {columns.map((column) => (
//             <Droppable key={column.id} droppableId={column.id.toString()}>
//               {(provided) => (
//                 <div
//                   className="column"
//                   {...provided.droppableProps}
//                   ref={provided.innerRef}
//                   style={{
//                     flex: "1 1 calc(30% - 20px)",
//                     margin: "10px 0",
//                     padding: "10px",
//                     border: "1px solid #ccc",
//                     borderRadius: "5px",
//                     minWidth: "250px",
//                     backgroundColor: "#f9f9f9",
//                   }}
//                 >
//                   <h3>{column.name}</h3>
//                   <button
//                     onClick={() => handleDeleteColumn(column.id)}
//                     style={{
//                       marginBottom: "10px",
//                       backgroundColor: "#dc3545",
//                       color: "#fff",
//                       border: "none",
//                       padding: "5px 10px",
//                       cursor: "pointer",
//                     }}
//                   >
//                     Delete Column
//                   </button>
//                   {column.tasks.map((task, index) => (
//                     <Draggable
//                       key={task.id}
//                       draggableId={task.id.toString()}
//                       index={index}
//                     >
//                       {(provided) => (
//                         <div
//                           className="task-card"
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           style={{
//                             margin: "10px 0",
//                             padding: "10px",
//                             backgroundColor: "#f4f4f4",
//                             borderRadius: "5px",
//                             boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
//                           }}
//                         >
//                           <p>
//                             <strong>{task.title}</strong>
//                           </p>
//                           <p>{task.description}</p>
//                           <p>Assigned to: {task.assigned_user_id}</p>
//                           <button
//                             onClick={() => handleDeleteTask(task.id, column.id)}
//                             style={{
//                               marginTop: "10px",
//                               backgroundColor: "#dc3545",
//                               color: "#fff",
//                               border: "none",
//                               padding: "5px 10px",
//                               cursor: "pointer",
//                             }}
//                           >
//                             Delete Task
//                           </button>
//                         </div>
//                       )}
//                     </Draggable>
//                   ))}
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           ))}
//         </DragDropContext>
//       </div>
//     </div>
//   );
// };

// export default KanbanBoard;

// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import axios from "axios";
// import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons
// import "../../styles/kanban.css";

// const KanbanBoard = () => {
//   const [columns, setColumns] = useState([]);
//   const [newColumnName, setNewColumnName] = useState("");
//   const [newTaskDetails, setNewTaskDetails] = useState({
//     title: "",
//     description: "",
//     columnId: null,
//   });
//   const [editColumnName, setEditColumnName] = useState("");
//   const [editTaskDetails, setEditTaskDetails] = useState({
//     id: null,
//     title: "",
//     description: "",
//   });

//   useEffect(() => {
//     fetchColumnsAndTasks();
//   }, []);

//   const fetchColumnsAndTasks = async () => {
//     try {
//       const [columnsResponse, tasksResponse] = await Promise.all([
//         axios.get("http://localhost:5050/api/columns"),
//         axios.get("http://localhost:5050/api/tasks"),
//       ]);

//       const columnsData = columnsResponse.data.map((column) => ({
//         ...column,
//         tasks: tasksResponse.data.filter(
//           (task) => task.column_id === column.id
//         ),
//       }));

//       setColumns(columnsData);
//     } catch (error) {
//       console.error("Error fetching columns or tasks:", error);
//     }
//   };

//   const handleAddColumn = async () => {
//     if (!newColumnName.trim()) {
//       alert("Column name cannot be empty");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5050/api/columns", {
//         name: newColumnName,
//       });
//       setColumns([...columns, { ...response.data, tasks: [] }]);
//       setNewColumnName("");
//     } catch (error) {
//       console.error("Error adding new column:", error);
//     }
//   };

//   const handleUpdateColumn = async (columnId) => {
//     if (!editColumnName.trim()) {
//       alert("Column name cannot be empty");
//       return;
//     }

//     try {
//       await axios.put(`http://localhost:5050/api/columns/${columnId}`, {
//         name: editColumnName,
//       });
//       const updatedColumns = columns.map((column) =>
//         column.id === columnId ? { ...column, name: editColumnName } : column
//       );
//       setColumns(updatedColumns);
//       setEditColumnName("");
//     } catch (error) {
//       console.error("Error updating column:", error);
//     }
//   };

//   const handleAddTask = async () => {
//     if (!newTaskDetails.title.trim() || !newTaskDetails.columnId) {
//       alert("Task title and column selection are required");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5050/api/tasks", {
//         title: newTaskDetails.title,
//         description: newTaskDetails.description,
//         column_id: newTaskDetails.columnId,
//       });

//       const updatedColumns = columns.map((column) => {
//         if (column.id === newTaskDetails.columnId) {
//           return { ...column, tasks: [...column.tasks, response.data] };
//         }
//         return column;
//       });

//       setColumns(updatedColumns);
//       setNewTaskDetails({ title: "", description: "", columnId: null });
//     } catch (error) {
//       console.error("Error adding new task:", error);
//     }
//   };

//   const handleUpdateTask = async () => {
//     if (!editTaskDetails.title.trim()) {
//       alert("Task title cannot be empty");
//       return;
//     }

//     try {
//       await axios.put(`http://localhost:5050/api/tasks/${editTaskDetails.id}`, {
//         title: editTaskDetails.title,
//         description: editTaskDetails.description,
//       });
//       const updatedColumns = columns.map((column) => {
//         return {
//           ...column,
//           tasks: column.tasks.map((task) =>
//             task.id === editTaskDetails.id
//               ? {
//                   ...task,
//                   title: editTaskDetails.title,
//                   description: editTaskDetails.description,
//                 }
//               : task
//           ),
//         };
//       });
//       setColumns(updatedColumns);
//       setEditTaskDetails({ id: null, title: "", description: "" });
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   const handleDeleteColumn = async (columnId) => {
//     try {
//       await axios.delete(`http://localhost:5050/api/columns/${columnId}`);
//       setColumns(columns.filter((column) => column.id !== columnId));
//     } catch (error) {
//       console.error("Error deleting column:", error);
//     }
//   };

//   const handleDeleteTask = async (taskId, columnId) => {
//     try {
//       await axios.delete(`http://localhost:5050/api/tasks/${taskId}`);
//       const updatedColumns = columns.map((column) => {
//         if (column.id === columnId) {
//           return {
//             ...column,
//             tasks: column.tasks.filter((task) => task.id !== taskId),
//           };
//         }
//         return column;
//       });
//       setColumns(updatedColumns);
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   const handleDragEnd = async (result) => {
//     if (!result.destination) return;

//     const { source, destination } = result;

//     const sourceColumn = columns.find(
//       (col) => col.id.toString() === source.droppableId
//     );
//     const destColumn = columns.find(
//       (col) => col.id.toString() === destination.droppableId
//     );

//     const [movedTask] = sourceColumn.tasks.splice(source.index, 1);
//     destColumn.tasks.splice(destination.index, 0, movedTask);

//     setColumns([...columns]);

//     try {
//       await axios.put(`http://localhost:5050/api/tasks/${movedTask.id}`, {
//         column_id: destColumn.id,
//       });
//     } catch (error) {
//       console.error("Error updating task column:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Kanban Board</h1>
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <div style={{ marginBottom: "20px" }}>
//           <input
//             type="text"
//             placeholder="New Column Name"
//             value={newColumnName}
//             onChange={(e) => setNewColumnName(e.target.value)}
//             style={{
//               padding: "8px",
//               marginRight: "10px",
//               borderRadius: "4px",
//               border: "1px solid #ccc",
//             }}
//           />
//           <button
//             onClick={handleAddColumn}
//             style={{
//               padding: "8px 12px",
//               borderRadius: "4px",
//               backgroundColor: "#007bff",
//               color: "#fff",
//               border: "none",
//               cursor: "pointer",
//             }}
//           >
//             Add Column
//           </button>
//         </div>

//         <div style={{ marginBottom: "20px" }}>
//           <input
//             type="text"
//             placeholder="Task Title"
//             value={newTaskDetails.title}
//             onChange={(e) =>
//               setNewTaskDetails({ ...newTaskDetails, title: e.target.value })
//             }
//             style={{
//               padding: "8px",
//               marginRight: "10px",
//               borderRadius: "4px",
//               border: "1px solid #ccc",
//             }}
//           />
//           <input
//             type="text"
//             placeholder="Task Description"
//             value={newTaskDetails.description}
//             onChange={(e) =>
//               setNewTaskDetails({
//                 ...newTaskDetails,
//                 description: e.target.value,
//               })
//             }
//             style={{
//               padding: "8px",
//               marginRight: "10px",
//               borderRadius: "4px",
//               border: "1px solid #ccc",
//             }}
//           />
//           <select
//             onChange={(e) =>
//               setNewTaskDetails({
//                 ...newTaskDetails,
//                 columnId: parseInt(e.target.value),
//               })
//             }
//             value={newTaskDetails.columnId}
//             style={{
//               padding: "8px",
//               marginRight: "10px",
//               borderRadius: "4px",
//               border: "1px solid #ccc",
//             }}
//           >
//             <option value="">Select Column</option>
//             {columns.map((column) => (
//               <option key={column.id} value={column.id}>
//                 {column.name}
//               </option>
//             ))}
//           </select>
//           <button
//             onClick={handleAddTask}
//             style={{
//               padding: "8px 12px",
//               borderRadius: "4px",
//               backgroundColor: "#28a745",
//               color: "#fff",
//               border: "none",
//               cursor: "pointer",
//             }}
//           >
//             Add Task
//           </button>
//         </div>
//       </div>

//       <DragDropContext onDragEnd={handleDragEnd}>
//         {columns.map((column) => (
//           <Droppable key={column.id} droppableId={column.id.toString()}>
//             {(provided) => (
//               <div
//                 ref={provided.innerRef}
//                 {...provided.droppableProps}
//                 style={{
//                   margin: "10px",
//                   padding: "10px",
//                   backgroundColor: "gray",
//                   borderRadius: "8px",
//                 }}
//               >
//                 <div className="column-header">
//                   <h3>{column.name}</h3>
//                   <div className="column-actions">
//                     <button
//                       onClick={() => handleUpdateColumn(column.id)}
//                       style={{
//                         backgroundColor: "#007bff",
//                         border: "none",
//                         cursor: "pointer",
//                       }}
//                     >
//                       <FaEdit size={20} />
//                     </button>
//                     <button
//                       onClick={() => handleDeleteColumn(column.id)}
//                       style={{
//                         backgroundColor: "#dc3545",
//                         border: "none",
//                         cursor: "pointer",
//                       }}
//                     >
//                       <FaTrash size={20} />
//                     </button>
//                   </div>
//                 </div>

//                 {column.tasks.map((task, index) => (
//                   <Draggable
//                     key={task.id}
//                     draggableId={task.id.toString()}
//                     index={index}
//                   >
//                     {(provided) => (
//                       <div
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         style={{
//                           margin: "5px",
//                           padding: "10px",
//                           backgroundColor: "#fff",
//                           borderRadius: "4px",
//                           boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
//                           ...provided.draggableProps.style,
//                         }}
//                       >
//                         <h4>{task.title}</h4>
//                         <p>{task.description}</p>
//                         <button
//                           onClick={() => handleUpdateTask(task.id)}
//                           style={{
//                             marginRight: "5px",
//                             padding: "5px 10px",
//                             backgroundColor: "#007bff",
//                             color: "#fff",
//                             border: "none",
//                             cursor: "pointer",
//                           }}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDeleteTask(task.id, column.id)}
//                           style={{
//                             padding: "5px 10px",
//                             backgroundColor: "#dc3545",
//                             color: "#fff",
//                             border: "none",
//                             cursor: "pointer",
//                           }}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     )}
//                   </Draggable>
//                 ))}

//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         ))}
//       </DragDropContext>
//     </div>
//   );
// };

// export default KanbanBoard;

import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons
import "../../styles/kanban.css";

const KanbanBoard = () => {
  const [columns, setColumns] = useState([]);
  const [newColumnName, setNewColumnName] = useState("");
  const [newTaskDetails, setNewTaskDetails] = useState({
    title: "",
    description: "",
    columnId: null,
  });

  useEffect(() => {
    fetchColumnsAndTasks();
  }, []);

  const fetchColumnsAndTasks = async () => {
    try {
      const [columnsResponse, tasksResponse] = await Promise.all([
        axios.get("http://localhost:5050/api/columns"),
        axios.get("http://localhost:5050/api/tasks"),
      ]);

      const columnsData = columnsResponse.data.map((column) => ({
        ...column,
        tasks: tasksResponse.data.filter(
          (task) => task.column_id === column.id
        ),
      }));

      setColumns(columnsData);
    } catch (error) {
      console.error("Error fetching columns or tasks:", error);
    }
  };

  const handleAddColumn = async () => {
    if (!newColumnName.trim()) {
      alert("Column name cannot be empty");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5050/api/columns", {
        name: newColumnName,
      });
      setColumns([...columns, { ...response.data, tasks: [] }]);
      setNewColumnName("");
    } catch (error) {
      console.error("Error adding new column:", error);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const sourceColumn = columns.find(
      (col) => col.id.toString() === source.droppableId
    );
    const destColumn = columns.find(
      (col) => col.id.toString() === destination.droppableId
    );

    const [movedTask] = sourceColumn.tasks.splice(source.index, 1);
    destColumn.tasks.splice(destination.index, 0, movedTask);

    setColumns([...columns]);

    try {
      await axios.put(`http://localhost:5050/api/tasks/${movedTask.id}`, {
        column_id: destColumn.id,
      });
    } catch (error) {
      console.error("Error updating task column:", error);
    }
  };

  return (
    <div>
      <h1>Kanban Board</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="New Column Name"
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
        />
        <button onClick={handleAddColumn}>Add Column</button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="columns-wrapper">
          {columns.map((column) => (
            <Droppable key={column.id} droppableId={column.id.toString()}>
              {(provided) => (
                <div
                  className="column-container"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className="column-header">
                    <h3>{column.name}</h3>
                    <div className="column-actions">
                      <button>
                        <FaEdit size={16} />
                      </button>
                      <button>
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="task-list">
                    {column.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="task-item"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <h4>{task.title}</h4>
                            <p>{task.description}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
