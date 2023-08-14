import { DiceArea } from "./components/dice-area";

export default function App() {
  return (
    <div className="w-full max-w-4xl mx-auto h-screen flex flex-col">
      <div className="flex-1"></div>
      <div className="flex-0 h-32">
        <DiceArea />
      </div>
    </div>
  );
}
