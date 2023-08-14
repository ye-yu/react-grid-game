import { Dice, DieValue } from "./dice";

export function DiceArea() {
  return (
    <div>
      <Dice value={DieValue.Five} />
    </div>
  );
}
