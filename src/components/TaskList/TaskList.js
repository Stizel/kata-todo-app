import React from "react";

import Task from "../Task/Task";

import "./TaskList.css";

const TaskList = ({tasks}) => {
    tasks = tasks.map((task) => {
        const {id, editing, completed, description} = task;
        return (
            <li key={id} className={editing ? "editing" : completed ? "completed" : null}>
                <Task {...task} />
                {editing ? <input type="text" className="edit" value={description}/> : null}
            </li>
        );
    });

    return <ul className="todo-list">{tasks}</ul>;

};

export default TaskList;