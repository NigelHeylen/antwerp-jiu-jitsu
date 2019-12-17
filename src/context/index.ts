import React from "react";

import RootStore from "../store/root";

export interface AntwerpJJContext {
  store: RootStore;
}

export const createContext = (store: RootStore) => {
  try {
    Context = React.createContext({ store });
  } catch (error) {
    throw new Error(error);
  }
};

let Context: React.Context<AntwerpJJContext>;

export const useStore = () => React.useContext(Context).store;
