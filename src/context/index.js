import {createContext,useState} from 'react';

export const CodeContext = createContext();

const Provider = ({children})=>{
	const [jsCode,setJSCode] = useState(null);
	const [endName,setEndName] = useState(null)
	return <CodeContext.Provider value={{jsCode,setJSCode,endName,setEndName}}>
		{children}
	</CodeContext.Provider>
}
export default Provider; 