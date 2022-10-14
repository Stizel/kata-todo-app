import React, {Component} from "react";

import "./Task.css";

export default class Task extends Component {

    state = {
        completed: false,
    };

    onCheckBoxClick = () => {
        this.setState(({ completed }) => {
            return {
                completed: !completed,
            };
        });
    };



    render() {
        const {id, editing, description, created, onDeleted} = this.props;
        const {completed} = this.state
        return (
            <li key={id} className={editing ? "editing" : completed ? "completed" : null}>
                <div className="view" >
                    <input className="toggle" type="checkbox"
                           onChange={this.onCheckBoxClick}/>
                    <label>
                        <span className="description">{description}
                        </span>
                        <span className="created">created {created} ago</span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button className="icon icon-destroy" onClick={onDeleted}></button>
                </div>
                {editing ? <input type="text" className="edit" value={description}/> : null}
            </li>
        );
    }
}


