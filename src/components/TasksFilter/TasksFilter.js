import React, {Component} from "react";

import "./TasksFilter.css";


export default class TasksFilter extends Component{



    render(){
        const {filters} = this.props

        const elements = filters.map(({selected, id, label}) => {
            return (
                <li key={id}>
                    <button className={selected ? "selected" : null}>{label}</button>
                </li>);
        });

        return (
            <ul className="filters">{elements} </ul>
        );
    }

}

// const TasksFilter = ({filters}) => {
//
//     filters = filters.map(({selected, id, label}) => {
//         return (
//             <li key={id}>
//                 <button className={selected ? "selected" : null}>{label}</button>
//             </li>);
//     });
//
//     return (
//         <ul className="filters">{filters} </ul>
//     );
// };
//
// export default TasksFilter;