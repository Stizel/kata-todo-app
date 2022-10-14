import React from "react";

import Task from "../Task/Task";

import "./TaskList.css";

export default function TaskList({tasks, onDeleted}) {

    const elements = tasks.map((task) => {
        const {id} = task;
        return (
            <Task {...task} onDeleted={() => onDeleted(id)}/>
        );
    });

    return <ul className="todo-list">{elements}</ul>;
};

