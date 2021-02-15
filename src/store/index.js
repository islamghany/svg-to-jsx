import { createStore, combineReducers } from "redux";

const loading = (state = false, action) => {
	switch (action.type) {
		case "LOADING":
			return action.payload;
		default:
			return state;
	}
};
const error = (state = false, action) => {
	switch (action.type) {
		case "ERROR":
			return action.payload;
		default:
			return state;
	}
};
const code = (state = { code: "", imports: {} }, action) => {
	switch (action.type) {
		case "CODE_INITIALIZE":
			return {
				code: "",
				imports: {},
			};
		case "CODE_JSX":
			return {
				...action.payload,
			};
		case "CODE_RN":
			return {
				...action.payload,
			};
		default:
			return state;
	}
};
const rn = (state = false, action) => {
	switch (action.type) {
		case "RN":
			return action.payload;
		default:
			return state;
	}
};
const icon = (state = false, action) => {
	switch (action.type) {
		case "ICON":
			return action.payload;
		default:
			return state;
	}
};
const append = (state = "", action) => {
	switch (action.type) {
		case "APPEND":
			return action.payload;
		default:
			return state;
	}
};
export default createStore(
	combineReducers({
		code,
		loading,
		rn,
		icon,
		append,
		error
	})
);