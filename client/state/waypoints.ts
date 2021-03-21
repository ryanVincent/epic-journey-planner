import { createReducer } from "../utils";

export type Waypoint = {
  id: string;
  title: string;
  lat: number;
  lng: number;
};

export type LatLng = {
  lat: number;
  lng: number;
};

export enum Actions {
  add = "waypoints/add",
  remove = "waypoints/remove",
  replace = "waypoints/replace",
  update = "waypoints/update",
}

export const actions = {
  add: (waypoint: Waypoint) => ({
    type: Actions.add,
    payload: waypoint,
  }),
  remove: (id: string) => ({
    type: Actions.remove,
    payload: {
      id,
    },
  }),
  replace: (waypoints: Waypoint[]) => ({
    type: Actions.replace,
    payload: waypoints,
  }),
  update: (latLng, id: string) => ({
    type: Actions.update,
    payload: {
      latLng,
      id,
    },
  }),
};

type AddAction = ReturnType<typeof actions["add"]>;
type RemoveAction = ReturnType<typeof actions["remove"]>;
type ReplaceAction = ReturnType<typeof actions["replace"]>;
type UpdateAction = ReturnType<typeof actions["update"]>;

type Action = AddAction | RemoveAction | ReplaceAction | UpdateAction;

export const reducer = createReducer<Waypoint[], Action>(
  {
    [Actions.add]: (waypoints, action: AddAction) => [
      ...waypoints,
      {
        id: `${action.payload.lat}-${
          action.payload.lng
        }-${new Date().toISOString()}`, // safer and neater to use `uuid` but avoiding additional libraries as per the spec
        ...action.payload,
      },
    ],
    [Actions.remove]: (waypoints, action: RemoveAction) =>
      waypoints.filter((waypoint) => waypoint.id !== action.payload.id),
    [Actions.replace]: (_, action: ReplaceAction) => action.payload,
    [Actions.update]: (waypoints, action: UpdateAction) =>
      waypoints.reduce((acc, cur) => {
        if (cur.id === action.payload.id) {
          return [
            ...acc,
            {
              ...cur,
              lat: action.payload.latLng.lat,
              lng: action.payload.latLng.lng,
            },
          ];
        }

        return [...acc, cur];
      }, []),
  },
  []
);
