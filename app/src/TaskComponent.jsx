import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Task.css'

const TaskComponent = () => {
    const [tasks, setTasks] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 5;

    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: 'Medium',
        category: 'Uncategorized'
    });
    const [editMode, setEditMode] = useState(false); // State to control edit mode
    const [editTask, setEditTask] = useState({
        title: '',
        description: '',
        priority: 'Medium',
        category: 'Uncategorized'
    }); // State to store edited task data
    const [editTaskData, setEditTaskData] = useState(null); // State to store data of task being edited

    // Fetch all tasks from the backend
    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:3000/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    // Create a new task
    const createTask = async () => {

        if (!newTask.title || !newTask.description || !newTask.category) {
            alert('Please fill out all required fields.');
            return; // Exit the function if any field is empty
        }
        try {
            await axios.post('http://localhost:3000/tasks', newTask);
            // Clear input fields after successful creation
            setNewTask({
                title: '',
                description: '',
                priority: 'Medium',
                category: 'Uncategorized'
            });
            // Refresh tasks list
            fetchTasks();
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    // Delete a task
    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:3000/tasks/${taskId}`);
            // Refresh tasks list
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    // Toggle edit mode and set task data for editing
    const toggleEditMode = (task) => {
        setEditMode(!editMode);
        setEditTaskData(task);
        // Set editTask state with the task data
        setEditTask({
            title: task.title,
            description: task.description,
            priority: task.priority,
            category: task.category
        });
    };

    // Handle changes in edit task input fields
    const handleEditTaskChange = (e) => {
        const { name, value } = e.target;
        // Update the editTask state with the new value
        setEditTask({ ...editTask, [name]: value });
    };

    // Save edited task
    const saveEdit = async () => {
        try {
            await axios.put(`http://localhost:3000/tasks/${editTaskData.taskId}`, editTask);
            // Refresh tasks list
            fetchTasks();
            setEditMode(false); // Exit edit mode
        } catch (error) {
            console.error('Error saving edited task:', error);
        }
    };

    useEffect(() => {
        // Fetch tasks when component mounts
        fetchTasks();
    }, []);


    // Calculate total number of pages
    const totalPages = Math.ceil(tasks.length / tasksPerPage);

    // Get tasks for the current page
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    // Handle pagination
    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    return (
        <div className='Task-management-container'>
            <h2>Task Management</h2>
            <div className='New-task'>
                <h3>Create New Task</h3>
                <div className='form'>
                    <input
                        type="text"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        placeholder="Title"
                    />
                    <input
                        type="text"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        placeholder="Description"
                    />
                    <select
                        value={newTask.priority}
                        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <input
                        type="text"
                        value={newTask.category}
                        onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                        placeholder="Category"
                    />
                    <button onClick={createTask}>Create Task</button>
                </div>
            </div>
            <div className='All-task'>
                <h3>All Tasks</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Priority</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTasks
                            // Sort tasks by priority (High, Medium, Low)
                            .sort((a, b) => {
                                const priorityOrder = { High: 3, Medium: 2, Low: 1 };
                                return priorityOrder[b.priority] - priorityOrder[a.priority];
                            })
                            .map(task => (
                                <tr key={task._id}>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>{task.priority}</td>
                                    <td>{task.category}</td>
                                    <td>
                                        {/* <button onClick={() => deleteTask(task.taskId)}>Delete</button> */}

                                        {editMode ? (
                                            <button className='delete' onClick={() => deleteTask(task.taskId)} disabled>Delete</button>
                                        ) : (
                                            <button className='delete' onClick={() => deleteTask(task.taskId)}>Delete</button>
                                        )}
                                        <button className='edit' onClick={() => toggleEditMode(task)}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                <div className='pagination'>
                    <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                    <span>{currentPage} / {totalPages}</span>
                    <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
                </div>
            </div>



            {editMode && (
                <div className='Edit-task'>
                    <h3>Edit Task</h3>
                    <input
                        type="text"
                        name="title"
                        value={editTask.title}
                        onChange={handleEditTaskChange}
                        placeholder="Title"
                    />
                    <input
                        type="text"
                        name="description"
                        value={editTask.description}
                        onChange={handleEditTaskChange}
                        placeholder="Description"
                    />
                    <select
                        name="priority"
                        value={editTask.priority}
                        onChange={handleEditTaskChange}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <input
                        type="text"
                        name="category"
                        value={editTask.category}
                        onChange={handleEditTaskChange}
                        placeholder="Category"
                    />
                    <button onClick={saveEdit}>Save</button>
                    <button onClick={() => setEditMode(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default TaskComponent;
