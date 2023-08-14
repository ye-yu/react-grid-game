import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { AppState } from "./app-state.store";

const defaultStore = {
  appState: new AppState(),
};

type DispatchSetStore = Dispatch<SetStateAction<typeof defaultStore>>;
const setStatePlaceholder: DispatchSetStore = (state) => {};

const StoreContext = React.createContext({
  ...defaultStore,
  setState: setStatePlaceholder,
});

export function useStore<T extends keyof typeof defaultStore>(
  stateName: T,
): (typeof defaultStore)[T] {
  const { setState, ...storeData } = useContext(StoreContext);
  const storeDataTyped: typeof defaultStore = storeData;
  const proxy = new Proxy(storeDataTyped[stateName], {
    get(target: any, prop) {
      return target[prop];
    },
    set(target: any, prop, value) {
      setState((data) => ({
        ...data,
        [stateName]: (target[prop] = value),
      }));
      return true;
    },
  });
  return proxy;
}

export function ContextProvider(
  props: Omit<React.ComponentProps<(typeof StoreContext)["Provider"]>, "value">,
) {
  const [contextState, setContextState] = useState({ ...defaultStore });

  return (
    <StoreContext.Provider
      {...props}
      value={{
        ...contextState,
        setState(data) {
          return setContextState(data);
        },
      }}
    />
  );
}
