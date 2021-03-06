import { combineReducers } from 'redux'

import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from "./actions";

function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    completed:false
                }
            ]
        case TOGGLE_TODO:
            return state.map((todo, index) => {
                if (inddex === action.index) {
                    return Object.assign({}, todo, {
                        completed:!todo.completed
                    })
                }
                return todo;
            })
        
        default:
            return state;
    }
}

function visibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}

const todoApp = combineReducers({
    todos,
    visibilityFilter
})
// export function todoApp(state = {}, action) {
//     return {
//         visibilityFilter: visibilityFilter(state, visibilityFilter, action),
//         todos:todos(state.todo,action)
//     }
// }

export default todoApp;