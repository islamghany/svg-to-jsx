import {createContext,useState} from 'react';

export const CodeContext = createContext();

const Provider = ({children})=>{
	const [jsCode,setJSCode] = useState({});
	const [endName,setEndName] = useState(null);
	const [RN,setRN] = useState(false);
	const [icon,setIcon] = useState(false);
	const [currentColor,setCurrentColor] = useState(false);
	return <CodeContext.Provider value={{RN,icon,setIcon,setRN,currentColor,setCurrentColor,jsCode,setJSCode,endName,setEndName}}>
		{children}
	</CodeContext.Provider>
}
export default Provider; 