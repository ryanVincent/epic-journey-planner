import React, { useEffect, useRef, useState, useContext, FC } from "react";
import Leaflet, { LeafletMouseEvent } from "leaflet";
import "leaflet.locatecontrol";
import "./Map.css";
import { LatLng } from "../../state/waypoints";

type MapProps = {
  onClick: (latlng: LatLng) => void;
};

type MarkerProps = {
  latitude: number;
  longitude: number;
  id: string;
  onMove?: (latlng: LatLng) => void;
  onClick?: (latlng: LatLng) => void;
};

export const MapContext = React.createContext(null);

const MapProvider = MapContext.Provider;

const useMap = (ref, { onClick }) => {
  const [map, setMap] = useState(null);

  const handleClick = (e) => {
    onClick(e.latlng);
  };

  useEffect(() => {
    const map = Leaflet.map(ref.current).setView([51.505, -0.09], 13);
    Leaflet.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: process.env.MAPBOX_ACCESS_TOKEN,
      }
    ).addTo(map);

    map.locate({ setView: true, maxZoom: 16 });

    const locationControl = Leaflet.control
      .locate({ position: "bottomright" })
      .addTo(map);
    locationControl.start();
    map.zoomControl.setPosition("bottomright");

    setMap(map);

    return () => {
      map.off();
      map.remove();
    };
  }, []);

  useEffect(() => {
    map?.on("click", handleClick);

    return () => {
      map?.off("click", handleClick);
    };
  }, [onClick, map]);

  return map;
};

export const Map: FC<MapProps> = (props) => {
  const mapContainer = useRef(null);
  const map = useMap(mapContainer, props);

  return (
    <MapProvider value={map}>
      <div id="map" ref={mapContainer}>
        {props.children}
      </div>
    </MapProvider>
  );
};

export const Marker: FC<MarkerProps> = ({
  latitude,
  longitude,
  id,
  onMove,
  onClick,
}) => {
  const map = useContext(MapContext);

  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const icon = Leaflet.divIcon({ className: "marker", html: id });
    marker?.setIcon(icon);
  }, [marker, id]);

  useEffect(() => {
    if (!map) return;
    const marker = Leaflet.marker([latitude, longitude], {
      draggable: true,
      icon: Leaflet.divIcon({ className: "marker", html: id }),
      autoPan: true,
    }).addTo(map);

    marker.on("click", onClick);

    marker.on("move", (e: LeafletMouseEvent) => {
      onMove(e.latlng);
    });

    marker.on("moveend", () => {});

    setMarker(marker);
    return () => {
      map.removeLayer(marker);
    };
  }, [map]);

  return null;
};
