"use client";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";
import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

//icon ของ map
const iconUrl =
  "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png";
const markerIcon = L.icon({
  iconUrl: iconUrl,
  iconSize: [20, 30],
});

//type
type LatLng = [number, number];
type LocationMarkerProps = {
  position: LatLng | null;
  setPosition: (position: LatLng) => void;
};

//mark location เมือมีการ click //รับ props จาก LocationMarker เพื่อเอา latlng
function LocationMarker({ position, setPosition }: LocationMarkerProps) {
  const map = useMapEvents({
    click(e) {
      //ตัวแปรแปลงe.latlng เป็น object
      const newLocation: LatLng = [e.latlng.lat, e.latlng.lng];
      setPosition(newLocation);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  //
  return position === null ? null : (
    <Marker position={position} icon={markerIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

const MapLandmark = ({
  location,
}: {
  location?: { lat: number; lng: number };
}) => {
  const defaultLocation: [number, number] = [13, 100];
  //เก็บ latlong ไว้ที่ position
  const [position, setPosition] = useState<LatLng | null>(null);
  console.log(position);

  return (
    <>
      <h1>Your Position </h1>
      <input type="hidden" name="lat" value={position ? position[0] : ""} />
      <input type="hidden" name="lng" value={position ? position[1] : ""} />
      <MapContainer
        className="h-[50vh] rounded-lg z-0 relative"
        center={location || defaultLocation}
        zoom={7}
        scrollWheelZoom={true}
      >
        <Marker position={location || defaultLocation} icon={markerIcon}>
          <Popup>บุญบั้งไฟเดือน 6 โจ๊ะๆ</Popup>
        </Marker>
        {/*ส่ง props */}
        <LocationMarker position={position} setPosition={setPosition} />

        <LayersControl>
          <LayersControl.BaseLayer name="openstreetmap" checked>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="CleanOSM" checked>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer>
    </>
  );
};
export default MapLandmark;
