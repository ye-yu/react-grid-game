import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AppState } from "./app-state.store";

const defaultStore = {
  [AppState.name]: new AppState(),
};

type DispatchSetStore = Dispatch<SetStateAction<typeof defaultStore>>;
const setStatePlaceholder: DispatchSetStore = (state) => {};

const StoreContext = React.createContext({
  ...defaultStore,
  setState: setStatePlaceholder,
});

export function useStore<T>(stateName: new (...args: any[]) => T): T {
  const context = useContext(StoreContext);
  const proxy = useMemo(() => {
    const { setState, ...storeData } = context;
    const storeDataTyped: typeof defaultStore = storeData;
    return new Proxy(storeDataTyped[stateName.name], {
      get(target: any, prop) {
        return target[prop];
      },
      set(target: any, prop, value) {
        setState((data) => {
          target[prop] = value;
          serializeLocalStorageValue(stateName.name, String(prop), value);
          return {
            ...data,
            [stateName.name]: target,
          };
        });
        return true;
      },
    });
  }, [context, stateName]);
  return proxy;
}

function generateLocalStorageKey(storeName: string | number, storeKey: string) {
  return `${storeName}:${storeKey}`;
}

function unserializeLocalStorageValue(
  storeName: string | number,
  storeKey: string,
): any {
  const key = generateLocalStorageKey(storeName, storeKey);
  try {
    const jsonString = localStorage.getItem(key);
    if (jsonString === null) return undefined;
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Cannot unserialize key", key);
  }
}

function serializeLocalStorageValue(
  storeName: string | number,
  storeKey: string,
  value: any,
): any {
  const key = generateLocalStorageKey(storeName, storeKey);
  const jsonString = JSON.stringify(value);
  localStorage.setItem(key, jsonString);
}

export function ContextProvider(
  props: Omit<React.ComponentProps<(typeof StoreContext)["Provider"]>, "value">,
) {
  const [hydrated, setHydrated] = useState(false);
  const [contextState, setContextState] = useState({
    ...defaultStore,
  } as Record<string, any>);
  useEffect(() => {
    if (!hydrated) {
      const stores = Object.keys(defaultStore) as Array<
        keyof typeof defaultStore
      >;
      for (const storeName of stores) {
        const store = defaultStore[storeName];
        const storeKeys = Object.keys(store) as Array<keyof typeof store>;
        for (const key of storeKeys) {
          const originalValue = store[key];
          const storedValue = unserializeLocalStorageValue(storeName, key);
          if (storedValue === undefined) continue;
          if (originalValue !== storedValue) {
            store[key] = storedValue;
            setContextState((data) => {
              return {
                ...data,
                [storeName]: store,
              };
            });
          }
        }
      }
      setHydrated(true);
    }
  }, [hydrated]);

  return hydrated ? (
    <StoreContext.Provider
      {...props}
      value={{
        ...contextState,
        setState(data) {
          return setContextState(data);
        },
      }}
    />
  ) : null;
}
