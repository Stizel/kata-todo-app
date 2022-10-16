import React from "react";
import PropTypes from "prop-types";
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
            onToggleEdit={onToggleEdit}
            editItem={ editItem}
        />);
    });

    return <ul className="todo-list">{tasks}</ul>;
};

TaskList.defaultProps = {
    onDeleted: () => {},
    onToggleDone: () => {},
    onToggleEdit: () => {},
    editItem: () => {},
};

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
    onToggleEdit: PropTypes.func,
    editItem: PropTypes.func,
};

