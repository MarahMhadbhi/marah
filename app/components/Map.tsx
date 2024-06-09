'use client';
import React, {useEffect,useState} from 'react';
import L, { LatLngExpression } from "leaflet";
import { MapContainer,Marker,TileLayer, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import {tunisiaStates} from '../actions/getTunisiaStates';

//@ts-ignore 
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconUrl:markerIcon.src,
    iconRetinaUrl:markerIcon2x.src,
    shadowUrl:markerShadow.src
});

interface MapProps {
   center?: LatLngExpression;
   selectedState?:string;
}

const ChangeView = ({ center, zoom }: { center: L.LatLngExpression, zoom: number }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const Map:React.FC<MapProps> = ({
    center,
    selectedState
  }) => {

    const [mapCenter, setMapCenter] = useState<L.LatLngExpression>(center || [34.0, 9.0]);
    const [zoom, setZoom] = useState<number>(center ? 7 : 5);
  
    useEffect(() => {
      if (selectedState) {
        const state = tunisiaStates.find(state => state.name === selectedState);
        if (state) {
          setMapCenter([state.lat, state.lng]);
          setZoom(100); 
        }
      }
    }, [selectedState]);
  
    return (
      <MapContainer 
         center={mapCenter}
         zoom={zoom}
         scrollWheelZoom={false}
         className="h-[35vh] rounded-lg"
         >
          <TileLayer
     
             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
    {center && (
      <Marker 
         position={mapCenter}
      />
    )}

      </MapContainer>
    )
};

    
        
export default Map;
