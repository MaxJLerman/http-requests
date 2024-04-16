import { useEffect, useState } from "react";

import { Place } from "../../types/Place.type";
import { Places } from "../Places/Places";
import { ErrorComponent } from "../Error/Error";
import { sortPlacesByDistance } from "../../lib/loc";
import { fetchAvailablePlaces } from "../../api/api";

interface Props {
  onSelectPlace: (place: Place) => void;
}

export const AvailablePlaces: React.FC<Props> = ({ onSelectPlace }) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [availablePlaces, setAvailablePlaces] = useState<Place[]>([]);
  const [isError, setIsError] = useState();

  useEffect(() => {
    const fetchPlaces = async (): Promise<void> => {
      setIsFetching(true);

      try {
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude,
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error: any) {
        setIsError({ message: error.message || "some error occurred" });
        setIsFetching(false);
      }
    };

    fetchPlaces();
  }, []);

  if (isError) {
    return (
      <ErrorComponent
        title={"An error occured!"}
        message={isError.message}
        onConfirm={() => {}}
      />
    );
  }

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
