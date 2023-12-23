import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


const MapComponentTraffic = () => {
  const [zoomLevel, setZoomLevel] = useState(5);
  const mapRef = useRef(null); // Referenz für das Map-Element
  const mapContainerRef = useRef(null); // Referenz für das Container-Element

  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {
      // Initialisierung der Karte
      mapRef.current = L.map(mapContainerRef.current, {
        center: [51.1657, 10.4515], // Koordinaten für Deutschland
        zoom: zoomLevel
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors, © CARTO',
      }).addTo(mapRef.current);


      let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      });
      
      L.Marker.prototype.options.icon = DefaultIcon;

      // Setzen der Pfade für die Marker-Icons

      // Laden und Hinzufügen der GeoJSON-Daten
      fetch('/data/veggy.geojson')
        .then(response => response.json())
        .then(data => {
          L.geoJSON(data, {
            style: {
              color: 'red', // Anpassen der Polygonfarbe
              weight: 1
            }
          }).addTo(mapRef.current);
        });

      // Hinzufügen eines Zoom-Listeners
      mapRef.current.on('zoomend', () => {
        setZoomLevel(mapRef.current.getZoom());
      });
    }

    // Aufräumfunktion, um die Karte zu entfernen
    return () => {
      if (mapRef.current) {
        mapRef.current.off('zoomend');
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapContainerRef.current]); // Abhängigkeit von der Verfügbarkeit des Container-Elements

  return (
    <div>
      <div ref={mapContainerRef} style={{ height: '70vh', width: '100vw' }} />
      <p>Aktueller Zoom-Level: {zoomLevel}</p>
    </div>
  );
};

export default MapComponentTraffic;
