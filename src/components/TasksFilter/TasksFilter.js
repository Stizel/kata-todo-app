import React, {Component} from "react";
import PropTypes from "prop-types";

import "./TasksFilter.css";

export default class TasksFilter extends Component {

    static defaultProps = {
        filter: 'all',
        onFilterChange: () => {
        },
    };

    static propTypes = {
        filter: PropTypes.oneOf(['all', 'active', 'done']),
        onFilterChange: PropTypes.func,
    };

    buttons = [
        {name: "all", label: "All"},
        {name: "active", label: "Active"},
        {name: "done", label: "Completed"},
    ];

    render() {
        const {filter, onFilterChange} = this.props;
        const buttons = this.buttons.map(({name, label}) => {
            return (
                <li key={name}>
                    <button
                        className={filter === name ? "selected" : null}
                        onClick={() => onFilterChange(name)}
                    >
                        {label}
                    </button>
                </li>
            );
        });
        return (
            <ul className="filters">
                {buttons}
            </ul>
        );
    }
}

