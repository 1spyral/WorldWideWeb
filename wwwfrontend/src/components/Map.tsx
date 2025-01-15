import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { CitiesContext } from "../context/CitiesContext";
import { useContext } from "react";

function Map() {
	const { cities } = useContext(CitiesContext);

	const markers = cities.flat().map((city, index) => {
		const position: [number, number] = [city.coordinates.lat, city.coordinates.long];
		return <Marker position={position} key={index}>
			<Popup>
				{city.city}, {city.country}
			</Popup>
		</Marker>
	})

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