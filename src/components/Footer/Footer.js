import React from "react";

import TasksFilter from "../TasksFilter/TasksFilter";

import "./Footer.css";


const Footer = ({filters}) => {

    return (
        <footer className="footer">
            <span className="todo-count">1 items left</span>
            <TasksFilter filters={filters}/>
            <button className="clear-completed">Clear completed</button>
        </footer>
    );
};

export default Footer;