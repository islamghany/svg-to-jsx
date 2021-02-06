import {createContext,useState} from 'react';

export const CodeContext = createContext();

const Provider = ({children})=>{
	const [jsCode,setJSCode] = useState(null);
	return <CodeContext.Provider value={{jsCode,setJSCode}}>
		{children}
	</CodeContext.Provider>
}
export default Provider; 