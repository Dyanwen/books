import Link from '../components/Link'
import { setVisibilityFilter } from '../actions'
import { connect } from 'redux'


const mapStateToProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.visibilityFilter
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onclick: () => {
            dispatch(setVisibilityFilter(ownProps.filter))
        }
    }
}

const FilterLink = connect(
    mapStateToProps,
    mapDispatchToProps
)(Link)

export default FilterLink
