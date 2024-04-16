import { useRef, useState, useCallback } from "react";

import { Places } from "./components/Places/Places";
import { Modal } from "./components/Modal/Modal";
import { DeleteConfirmation } from "./components/DeleteConfirmation/DeleteConfirmation";
import logoImg from "./assets/logo.png";
import { AvailablePlaces } from "./components/AvailablePlaces/AvailablePlaces";
import { Place } from "./types/Place.type";
import { updateUserPlaces } from "./api/api";

const initialPlace: Place = {
  id: "",
  image: {
    src: "",
    alt: "",
  },
  title: "",
  lat: 0,
  lon: 0,
};

function App() {
  const selectedPlace = useRef<Place>(initialPlace);
  const [userPlaces, setUserPlaces] = useState<Place[]>([]);
  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const handleStartRemovePlace = (place: Place): void => {
    setModalIsOpen(true);
    selectedPlace.current = place;
  };

  const handleStopRemovePlace = (): void => {
    setModalIsOpen(false);
  };

  const handleSelectPlace = async (selectedPlace: Place): Promise<void> => {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error) {
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({
        message: error.message || "Failed to update places",
      });
    }
  };

  const handleRemovePlace = useCallback(async (): Promise<void> => {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id),
    );

    setModalIsOpen(false);
  }, []);

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>
      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
          isLoading={false}
          loadingText={""}
        />

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
