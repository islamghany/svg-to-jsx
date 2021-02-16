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
const svg = (state = {code:'',isCode:false,id:-1}, action) => {
	switch (action.type) {
		case "SVG":
			return action.payload
		default:
			return state;
	}
};
const jsx = (state = "", action) => {
	switch (action.type) {
		case "JSX":
			return action.payload
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
		svg,
		jsx,
		loading,
		rn,
		icon,
		append,
		error
	})
);