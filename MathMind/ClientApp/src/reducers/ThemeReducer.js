const ThemeReducer = (state = localStorage.getItem('theme') == 'dark' ? 'dark' : 'light', action) => {
    if (action.type == "CHANGE_THEME") {
        return action.theme;
    }
    return state;
}

export default ThemeReducer;