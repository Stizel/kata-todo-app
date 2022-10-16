import React, {Component} from "react";

import "./NewTaskForm.css";

export default class NewTaskForm extends Component {
    state = {
        label: "",
    };

    onLabelChange = (e) => {
        this.setState({label: e.target.value,});
    };

    onSubmit = (evt) => {
        evt.preventDefault();
        const {onItemAdded} = this.props;
        const {label} = this.state;
        onItemAdded(label);
        this.setState({label: ''});
    };

    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <form onSubmit={this.onSubmit}>
                    <input
                        className="new-todo"
                        placeholder="What needs to be done?"
                        autoFocus
                        onChange={this.onLabelChange}
                        value={this.state.label}
                    />
                </form>
            </header>
        );
    }
};

