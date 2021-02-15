export default (state=false,action)=>{
	switch (action.type) {
		case 'RN':
			return action.payload;
		default : return state;
	}
}