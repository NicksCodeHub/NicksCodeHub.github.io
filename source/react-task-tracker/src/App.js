import {useState} from 'react'

import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

function App() {
  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState(
    [
    {
        id: 1,
        text: "Task1",
        date: "2021/06/20 12:00:00",
        reminder: true,
    },
    {
        id: 2,
        text: "Fire Works",
        date: "2021/07/04 21:15:00",
        reminder: true,
    },
    {
        id: 3,
        text: "Birthday",
        date: "2021/08/14 00:00:00",
        reminder: false,
    },
    ]
  );

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;

    const newTask = {id , ...task };

    setTasks([...tasks, newTask]);
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task));
  };

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask}></Header>
      {showAddTask && <AddTask onAdd={addTask}></AddTask>}
      <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}></Tasks>
    </div>
  );
}



export default App;
