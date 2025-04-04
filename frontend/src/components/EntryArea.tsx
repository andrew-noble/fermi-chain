import { EntryItem } from "../types";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

type EntryAreaProps = {
  userInput: EntryItem[];
  handleRemoveItem: (item: EntryItem) => void;
};

const EntryArea = ({ userInput, handleRemoveItem }: EntryAreaProps) => (
  <div className="flex flex-col gap-2">
    <h2>Entry Area</h2>
    <div className="flex flex-col gap-2">
      {userInput.map((item: EntryItem) => (
        <Card key={item.item.label} className="flex items-center gap-2">
          <p>{item.item.label}</p>
          <Button
            key={item.item.label}
            variant="outline"
            onClick={() => handleRemoveItem(item)}
          >
            -
          </Button>
        </Card>
      ))}
    </div>
  </div>
);

export default EntryArea;
