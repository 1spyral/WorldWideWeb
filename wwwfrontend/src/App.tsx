import './App.css';
import Controls from './components/Controls';
import Map from './components/Map';
import { useEffect, useContext } from 'react';
import { CitiesContext } from './context/CitiesContext';

function App() {
    const { generate } = useContext(CitiesContext);
    const API_URL = import.meta.env.VITE_API_URL

	useEffect(() => {
		async function fetchData() {
			const response = await fetch(API_URL + "/city", {
				method: "DELETE",
			})
			
			const data = await response.json();
			
			generate(data);
		}

		fetchData();
	}, []);

	return (
		<>
			<Controls />
			<Map />
		</>
	)
}

export default App
