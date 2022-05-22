import { Reducer } from "redux";
import { ActionTypes, SetCurrentUserAction } from "../definitions/ActionTypes";
import { ReduxState } from "../definitions/ReduxState";

const UserReducer: Reducer<ReduxState['currentUser'], SetCurrentUserAction> = (state = { username: "Bob" }, action) => {
    if (action.type === ActionTypes.SET_CURRENT_USER) {
        return action.user;
    }
    return state;
}

export default UserReducer;