import { Place } from "../types/Place.type";
import { ResponseData } from "../types/ResponseData.type";

export const fetchAvailablePlaces = async (): Promise<Place[]> => {
  const response = await fetch("http://localhost:3000/places");
  const responseData: ResponseData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }

  return responseData.places;
};
