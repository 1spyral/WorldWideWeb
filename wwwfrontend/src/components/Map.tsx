import { MapContainer, TileLayer, Popup, CircleMarker } from "react-leaflet";
import { CitiesContext } from "../context/CitiesContext";
import { useContext } from "react";

function getColor(layerIndex: number, layers: number) {
	let percentage = layerIndex / (layers - 1);
	
	if (Number.isNaN(percentage)) {
		percentage = 0;
	}
	
	// Calculate the green intensity based on the percentage
	const red = 255; // Full red intensity
	const green = Math.round(percentage * 255); // Green intensity increases as percentage increases
	const blue = 0; // No blue component
  
	return `rgb(${red}, ${green}, ${blue})`;
  }  

function Map() {
	const { cities } = useContext(CitiesContext);

	let index = 0;

	const markers = cities.map((layer, layerIndex) => {
		const color = getColor(layerIndex, cities.length);

		return layer.map(city => {
			index++;
			const position: [number, number] = [city.coordinates.lat, city.coordinates.long];
			return <CircleMarker center={position} key={index} radius={5} weight={1} color={color} fillColor={color} fillOpacity={0.5}>
				<Popup>
					{city.city}, {city.country}
				</Popup>
			</CircleMarker>
		})
	}).flat();

	const center: [number, number] = [0, 0];

	return (
		<MapContainer
			center={center}
			zoom={1}
			scrollWheelZoom={true}
			style={{ minHeight: "50vh", minWidth: "50vw" }}
		>
		<TileLayer
			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
		/>
		{markers}
		</MapContainer>
	);
};

export default Map;