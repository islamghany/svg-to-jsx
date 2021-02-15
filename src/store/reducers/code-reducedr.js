export default (state={code:"",imports:{}},action)=>{
	switch (action.type) {
		case 'CODE_ADD':
			return action.payload;
		default : return state;
	}
}