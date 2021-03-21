import React, { useEffect, useState, useContext, FC } from "react";
import Leaflet from "leaflet";
import { Waypoint } from "../../state/waypoints";
import { MapContext } from "./Map";

type LineProps = {
  waypoints: Waypoint[];
};
// TODO, USE CONTEXT TO PASS AROUND MAP
export const Line: FC<LineProps> = ({ waypoints }) => {
  const [line, setLine] = useState();
  const map = useContext(MapContext);

  useEffect(() => {
    if (!map) return;
    const l = Leaflet.polyline([]).addTo(map);
    setLine(l);

    () => {
      map?.remove(line);
    };
  }, [map]);

  useEffect(() => {
    if (waypoints.length === 0) {
      return;
    }
    const points = waypoints.map((waypoint) => [waypoint.lat, waypoint.lng]);
    line.setLatLngs(points);
  }, [map, waypoints]);

  return null;
};
