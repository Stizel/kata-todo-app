import React from "react";

import Task from "../Task/Task";

import "./TaskList.css";

export default function TaskList({
                                     tasks,
                                     onDeleted,
                                     onToggleDone,
                                     onToggleEdit,
                                     editItem,
                                 }) {

    tasks = tasks.map((task) => {
        const {id} = task;
        return (<Task
            key={id}
            {...task}
            onDeleted={() => onDeleted(id)}
            onToggleDone={() => onToggleDone(id)}
            onToggleEdit={() => onToggleEdit(id)}
            editItem={ editItem}
        />);
    });

    return <ul className="todo-list">{tasks}</ul>;
};

