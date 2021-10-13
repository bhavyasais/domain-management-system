import {LOGGED_IN,LOGGED_OUT,USER_UPDATE}  from "../constants"

const initialState = {
  isLoggedIn: false,
  userName:'',
};

export const userReducer = (state = initialState, action={}) => {   //NO SONAR
  switch (action.type) {
    case LOGGED_IN: {
      return { ...state, isLoggedIn: true };
    }
    case LOGGED_OUT: {
      return { ...state, isLoggedIn: false };
    }
    case USER_UPDATE:{
        return { ...state, ...action.data };
    }
    default:
      return state;
  }
};
