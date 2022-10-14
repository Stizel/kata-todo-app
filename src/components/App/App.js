import React, {Component} from "react";
import {formatDistanceToNow} from 'date-fns';
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/Footer";

import "./App.css";

export default class App extends Component {

    state = {

        tasks: [
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
        ],

        filters: [
            {
                label: "All",
                selected: true,
                id: 15550
            },
            {
                label: "Active",
                selected: false,
                id: 25550
            },
            {
                label: "Completed",
                selected: false,
                id: 35550
            }]
    };

    deleteItem = (id) => {
        this.setState(({ tasks }) => {
            const idx = tasks.findIndex((el) => el.id === id);
            console.log(idx);
            const before = tasks.slice(0, idx);
            const after = tasks.slice(idx + 1);
            const newArr = [...before, ...after];

            return {
                tasks: newArr,
            };
        });
    };

    render() {
        const {tasks, filters} = this.state;
        return (
            <section className="todoapp">
                <NewTaskForm/>
                <section className="main">
                    <TaskList tasks={tasks} onDeleted={this.deleteItem}/>
                    <Footer filters={filters}/>
                </section>
            </section>
        );

    }
};

