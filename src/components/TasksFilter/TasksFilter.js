import React from "react";

import "./TasksFilter.css";

const TasksFilter = ({filters}) => {

    filters = filters.map(({selected, id, label}) => {
        return (
            <li key={id}>
                <button className={selected ? "selected" : null}>{label}</button>
            </li>);
    });

    return (
        <ul className="filters">{filters} </ul>
    );
};

export default TasksFilter;