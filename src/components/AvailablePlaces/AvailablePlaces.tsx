import { Place } from "../../types/Place.type";
import { Places } from "../Places/Places";

interface Props {
  onSelectPlace: (place: Place) => void;
}

export const AvailablePlaces: React.FC<Props> = ({ onSelectPlace }) => {
  return (
    <Places
      title="Available Places"
      places={[]}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
};
