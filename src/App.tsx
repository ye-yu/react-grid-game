import { AppState } from "./stores/app-state.store";
import { useStore } from "./stores/store";

export default function App() {
  const appState = useStore(AppState);
  return (
    <button
      onClick={() => {
        if (appState.theme === "light") {
          appState.theme = "dark";
        } else {
          appState.theme = "light";
        }
      }}
    >
      {appState.theme}
    </button>
  );
}
