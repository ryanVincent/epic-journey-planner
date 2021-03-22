import React, { useReducer } from "react";
import { List, ListItem } from "../components/lists/List";
import { Map, Marker } from "../components/map/Map";
import { Page } from "../components/layout/Page/Page";
import { Sidebar, SideBarFooter } from "../components/layout/Sidebar/Sidebar";
import { Container } from "../components/layout/Container/Container";
import {
  reducer as waypointReducer,
  actions as waypointActions,
} from "../state/waypoints";
import { generateTitle, isMobile, useMobile } from "../utils";
import { Line } from "../components/map/Line";
import { Button } from "../components/buttons/Button";
import { getGPX, downloadFile } from "../service/getGpx";
import { Header } from "../components/layout/Header/Header";

export const Plan: React.FC = () => {
  const [waypoints, dispatch] = useReducer(waypointReducer, []);

  const handleDelete = (id: string) => {
    dispatch(waypointActions.remove(id));
  };

  const handleAdd = (latlng, i) => {
    dispatch(
      waypointActions.add({
        ...latlng,
        title: `Waypoint ${generateTitle(i)}`,
      })
    );
  };

  const handleMove = (latlng, id) => {
    dispatch(waypointActions.update(latlng, id));
  };

  const handleReorder = (ids) => {
    const reorderedWaypoints = [...waypoints].sort(
      (a, b) => ids.indexOf(a.id) - ids.indexOf(b.id)
    );
    dispatch(waypointActions.replace(reorderedWaypoints));
  };

  const mobile = useMobile();

  return (
    <Page>
      {mobile && <Header>Epic Adventure Planner 🤘</Header>}
      {!mobile && (
        <Sidebar title="Epic Adventure Planner 🤘">
          <List onReorder={handleReorder}>
            {waypoints.map((item) => (
              <ListItem
                key={item.id}
                id={item.id}
                onDelete={(id) => handleDelete(id)}
              >
                {item.title}
              </ListItem>
            ))}
          </List>
          <SideBarFooter>
            <Button
              variant="primary"
              onClick={() => {
                downloadFile(
                  getGPX("My Awesome Adventure", waypoints),
                  "my-awesome-adventure.gpx",
                  "application/gpx+xml"
                );
              }}
            >
              Download your Route
            </Button>
          </SideBarFooter>
        </Sidebar>
      )}
      <Container>
        <Map
          onClick={(latlng) => {
            handleAdd(latlng, waypoints.length);
          }}
        >
          {waypoints.map((waypoint) => (
            <Marker
              onClick={() => {
                handleDelete(waypoint.id);
              }}
              onMove={(latlng) => {
                handleMove(latlng, waypoint.id);
              }}
              key={waypoint.id}
              latitude={waypoint.lat}
              longitude={waypoint.lng}
            />
          ))}
          <Line waypoints={waypoints} />
        </Map>
        {mobile && (
          <Button
            variant="primary"
            onClick={() => {
              downloadFile(
                getGPX("My Awesome Adventure", waypoints),
                "my-awesome-adventure.gpx",
                "application/gpx+xml"
              );
            }}
          >
            Download your Route
          </Button>
        )}
      </Container>
    </Page>
  );
};
