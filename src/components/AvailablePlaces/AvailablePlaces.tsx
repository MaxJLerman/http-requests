import { useEffect, useState } from "react";

import { Place } from "../../types/Place.type";
import { Places } from "../Places/Places";
import { ResponseData } from "../../types/ResponseData.type";

interface Props {
  onSelectPlace: (place: Place) => void;
}

export const AvailablePlaces: React.FC<Props> = ({ onSelectPlace }) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [availablePlaces, setAvailablePlaces] = useState<Place[]>([]);

  useEffect(() => {
    const fetchPlaces = async (): Promise<void> => {
      setIsFetching(true);

      const response = await fetch("http://localhost:3000/places");
      const responseData: ResponseData = await response.json();
      setAvailablePlaces(responseData.places);

      setIsFetching(false);
    };

    fetchPlaces();
  }, []);

  return (
    <Places
      title={"Available Places"}
      places={availablePlaces}
      fallbackText={"No places available."}
      onSelectPlace={onSelectPlace}
      isLoading={isFetching}
      loadingText={"Fetching place data..."}
    />
  );
};
