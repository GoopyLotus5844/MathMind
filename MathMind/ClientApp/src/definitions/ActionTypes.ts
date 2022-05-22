import { ThemeType } from "./ThemeType";
import { User } from "./User";

export enum ActionTypes {
    SET_THEME = 0,
    SET_CURRENT_USER
}

export interface SetCurrentUserAction {
    type: ActionTypes.SET_CURRENT_USER;
    user: User;
}

export interface SetThemeAction {
    type: ActionTypes.SET_THEME,
    theme: ThemeType
}