import React, {Component} from "react";
import {formatDistanceToNow} from 'date-fns';
import PropTypes from "prop-types";
import "./Task.css";

export default class Task extends Component {

    static defaultProps = {
        created: Date.now(),
        editItem: () => {},
        onDeleted: () => {},
        onToggleDone: () => {},
        onToggleEdit: () => {},
    };

    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        done: PropTypes.bool.isRequired,
        edit: PropTypes.bool.isRequired,
        created: PropTypes.number,
        editItem: PropTypes.func,
        onDeleted: PropTypes.func,
        onToggleDone: PropTypes.func,
        onToggleEdit: PropTypes.func,
    };

    state = {
        label: this.props.label,
    };

    onLabelChange = (e) => {
        this.setState({label: e.target.value});
    };
    onSubmit = (evt) => {
        evt.preventDefault();
        const {editItem, id} = this.props;
        const {label} = this.state;
        editItem(id, label);
        this.setState({label});
    };

    render() {
        const {
            id,
            edit,
            done,
            created,
            onDeleted,
            onToggleDone,
            onToggleEdit,
        } = this.props;
        const {label} = this.state;
        return (

            <li className={edit ? "editing" : done ? "completed" : null}>
                <div className="view">
                    <input className="toggle" type="checkbox"
                           onChange={onToggleDone} checked={done}/>
                    <label>
                        <span className="description">{label}
                        </span>
                        <span
                            className="created">created {formatDistanceToNow(created, {includeSeconds: true})} ago</span>
                    </label>
                    <button
                        className="icon icon-edit"
                        onClick={() => onToggleEdit(id)}
                    ></button>
                    <button className="icon icon-destroy" onClick={onDeleted}></button>
                </div>
                {
                    edit ?
                        <form onSubmit={this.onSubmit}>
                            <input
                                type="text"
                                className="edit"
                                autoFocus
                                value={label}
                                onChange={this.onLabelChange}
                            />
                        </form>
                        : null
                }
            </li>
        );
    }
}


