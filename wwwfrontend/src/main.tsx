import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import "leaflet/dist/leaflet.css";
import App from './App.tsx';
import { CitiesContextProvider } from './context/CitiesContextProvider.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<CitiesContextProvider>
			<App />
		</CitiesContextProvider>
	</StrictMode>,
)
