import { reducer as formReducer } from "redux-form";
import { userReducer } from "./user";

export const rootReducers = {
	form: formReducer,
	user: userReducer,
};
