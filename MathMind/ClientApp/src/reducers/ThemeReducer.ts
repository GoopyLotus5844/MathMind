import { Reducer } from "redux";
import { ActionTypes, SetThemeAction } from "../definitions/ActionTypes";
import { ReduxState } from "../definitions/ReduxState";
import { ThemeType } from "../definitions/ThemeType";

const ThemeReducer: Reducer<ReduxState['theme'], SetThemeAction> = (state = (Number(localStorage.getItem("theme")) ?? ThemeType.Dark), action) => {
    if (action.type === ActionTypes.SET_THEME) {
        return action.theme;
    }
    return state;
}

export default ThemeReducer;