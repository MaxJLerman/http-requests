import { useEffect, useState } from "react";

import { Place } from "../../types/Place.type";
import { Places } from "../Places/Places";
import { ResponseData } from "../../types/ResponseData.type";

interface Props {
  onSelectPlace: (place: Place) => void;
}

export const AvailablePlaces: React.FC<Props> = ({ onSelectPlace }) => {
  const [availablePlaces, setAvailablePlaces] = useState<Place[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/places")
      .then((response) => {
        return response.json();
      })
      .then((responseData: ResponseData) => {
        setAvailablePlaces(responseData.places);
      });
  }, []);

  return (
    <Places
      title={"Available Places"}
      places={availablePlaces}
      fallbackText={"No places available."}
      onSelectPlace={onSelectPlace}
    />
  );
};
