export const change_theme = (theme) => {
    return {
        type: "CHANGE_THEME",
        theme: theme
    }
}

export const set_user = (newUser) => {
    return {
        type: "SET_USER",
        user: newUser
    }
}