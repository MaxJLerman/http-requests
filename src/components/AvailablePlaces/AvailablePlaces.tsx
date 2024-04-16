import { useEffect, useState } from "react";

import { Place } from "../../types/Place.type";
import { Places } from "../Places/Places";
import { ResponseData } from "../../types/ResponseData.type";
import { ErrorComponent } from "../Error/Error";
import { sortPlacesByDistance } from "../../lib/loc";

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
        const response = await fetch("http://localhost:3000/places");
        const responseData: ResponseData = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch places");
        }

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            responseData.places,
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
