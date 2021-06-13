const UserReducer = (state = { username: "Bob" }, action) => {
    if (action.type == "SET_USER") {
        return action.user;
    }
    return state;
}

export default UserReducer;