import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'

function TodoList({ todos, onTodoClick }) {
    return (
        <ul>
            {todos.map((item, index) => {
                <Todo key={index} {...item} onclick={() => onTodoClick(index)}></Todo>
            })}
        </ul>
    )
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            completed: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    onTodoClick: PropTypes.func.isRequired
}

export default TodoList

