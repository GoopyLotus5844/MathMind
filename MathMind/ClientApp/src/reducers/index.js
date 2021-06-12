import ThemeReducer from './ThemeReducer'
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    theme: ThemeReducer
})

export default allReducers;