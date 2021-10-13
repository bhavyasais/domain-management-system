import {LOGGED_IN,LOGGED_OUT,USER_UPDATE}  from "../constants"

export const onLoggedIn = () => {
    return {
        type: LOGGED_IN,
    }
}

export const onLoggedOut = () => {
    return {
        type: LOGGED_OUT
    }
}
export const updateUser = (data) => {
    return {
        type: USER_UPDATE,
        data
    }
}
