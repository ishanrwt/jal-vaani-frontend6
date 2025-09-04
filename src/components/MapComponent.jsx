import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

const MapComponent = ({ data }) => {
    const mapRef = useRef(null);
    const leafletMap = useRef(null);

    useEffect(() => {
        if (mapRef.current && !leafletMap.current) {
            leafletMap.current = L.map(mapRef.current).setView(data.center, data.zoom);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; OpenStreetMap'
            }).addTo(leafletMap.current);

            L.marker(data.center).addTo(leafletMap.current)
                .bindPopup('Key region of interest.')
                .openPopup();
        }
    }, [data]);

    return <div ref={mapRef} className="mt-2 shadow-md" style={{ height: "350px", width: "100%", borderRadius: "0.5rem" }}></div>;
};

export default MapComponent;