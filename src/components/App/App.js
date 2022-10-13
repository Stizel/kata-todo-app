import React from "react";
import { formatDistanceToNow } from 'date-fns'
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/Footer";

import "./App.css";

const App = () => {

    const tasks = [
        {
            description: "Completed task",
            created: formatDistanceToNow(Date.now()),
            editing: false,
            completed: true,
            id: 1
        },
        {
            description: "Editing task",
            created: formatDistanceToNow(Date.now()),
            editing: true,
            completed: false,
            id: 2
        },
        {
            description: "Active task",
            editing: false,
            completed: false,
            created: formatDistanceToNow(Date.now()),
            id: 3
        },
    ];

    const filters = [
        {
            label: "All",
            selected: true,
            id: 10
        },
        {
            label: "Active",
            selected: false,
            id: 20
        },
        {
            label: "Completed",
            selected: false,
            id: 30
        }];

    return (
        <section className="todoapp">
            <NewTaskForm/>
            <section className="main">
                <TaskList tasks={tasks}/>
                <Footer filters={filters}/>
            </section>
        </section>
    );
};

export default App;