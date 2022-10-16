import React from "react";

import TasksFilter from "../TasksFilter/TasksFilter";

import "./Footer.css";


const Footer = ({filter,todoLeft,onFilterChange,doneTasks,deleteItem}) => {

    const deleteDoneTasks=()=>{
        doneTasks.forEach(el=>{
            deleteItem(el.id)
        })
    }
    
    return (
        <footer className="footer">
            <span className="todo-count">{todoLeft} items left</span>
            <TasksFilter filter={filter} onFilterChange={onFilterChange} />
            <button 
                className="clear-completed"
                onClick={()=>deleteDoneTasks()}
            >
                Clear completed
            </button>
        </footer>
    );
};

export default Footer;