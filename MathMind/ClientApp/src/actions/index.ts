import { ActionTypes } from "../definitions/ActionTypes"
import {User} from "../definitions/User";
import { ThemeType } from "../definitions/ThemeType"

export const changeTheme = (theme: ThemeType) => {
    return {
        type: ActionTypes.SET_THEME,
        theme: theme
    }
}

export const set_user = (newUser: User) => {
    return {
        type: "SET_USER",
        user: newUser
    }
}