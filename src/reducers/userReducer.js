import { types } from "../types/types";

export const userReducer = (state, action) => {
  switch (action.type) {
    case types.addUser:
      return {
        users: [...state.users, action.payload],
      }; 
    case types.deleUser:
      return {
        users: [...state.users].filter((user) => user.id !== action.payload),
      };
    default:
      return state;
  }
};
