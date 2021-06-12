const ThemeReducer = (state = localStorage.getItem('theme') == 'dark' ? 'dark' : 'light', action) => {
    switch(action.type){
        case 'CHANGE_THEME':
            return action.theme;
        default:
            return state;
    }
}

export default ThemeReducer;