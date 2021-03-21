import { useState, useEffect } from "react";

type AnyAction = {
  type: string;
};

type Handler<State, Action extends AnyAction> = (
  state: State,
  action: Action
) => State;

type HandlerMap<State, Action extends AnyAction> = {
  [key: string]: Handler<State, Action>;
};

export const createReducer = <State, Action extends AnyAction>(
  handlers: HandlerMap<State, Action>,
  initialState: State
) => (state: State = initialState, action): State =>
  handlers[action.type](state, action);

export const generateTitle = (i: number) => `#${i + 1}`;

export const isMobile = () => {
  console.log(window.matchMedia("(ma-width: 800px)").matches);
  return window.matchMedia("(max-width: 800px)").matches;
};

export const classnames = (...classnames) =>
  classnames.filter(Boolean).join(" ");
