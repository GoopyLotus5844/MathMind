import ThemeReducer from './ThemeReducer'
import UserReducer from './UserReducer'
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    theme: ThemeReducer,
    user: UserReducer
})

export default allReducers;