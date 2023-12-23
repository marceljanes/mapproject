import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import * as d3 from 'd3';
import 'leaflet/dist/leaflet.css';
import { cities } from '../utils/cities';


const MapComponentTraffic = () => {

  const [data, setData] = useState([])
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const map = L.map('map', {
        center: [51.1657, 10.4515], // Coordinates for Germany
        zoom: 5
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      

      L.svg({ clickable: true }).addTo(map);
      const overlay = d3.select(map.getPanes().overlayPane);
      const svgLayer = overlay.select('svg');
      const g = svgLayer.append('g');

         

      const updateMarker = (station, marker) => {
        const yx = map.latLngToLayerPoint(new L.LatLng(station.stop_lat, station.stop_lon));
        marker.attr('cx', yx.x).attr('cy', yx.y);
      };

      // Create markers for each city
      
      fetch('/data/stops.json') // Assuming the file is in the public folder
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData); // Slice the first five items
        jsonData.forEach(station => {
          let marker = g.append('circle')
            .attr('class', 'marker')
            .attr('r', 2)
            .attr('fill', 'red');
  
     
         
  
          updateMarker(station, marker); // Initial position update
  
          map.on('moveend', () => updateMarker(station, marker));
        });
        
        
        
      });












      return () => {
        map.remove();
      };
    }
  }, []);

  return <div id="map" style={{ height: '70vh', width: '100vW'}} />;
};

export default MapComponentTraffic;
