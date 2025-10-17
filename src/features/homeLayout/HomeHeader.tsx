import toast from "react-hot-toast";
import SpinnerInside from "../../ui/SpinnerInside";
import { useWeather } from "../weather/useWeather";
import { useState } from "react";
import { useUpdateSettings } from "../setting/useUpdateSettings";

function HomeHeader() {
  // const [currentPosition, setCurrentPosition] = useState<
  //   | {
  //       latitude: number;
  //       longitude: number;
  //     }
  //   | undefined
  // >(undefined);
  const { weather, isLoading: isLoadingWeather, error } = useWeather();
  const { updateSettings, isPending: isUpdatingSettings } = useUpdateSettings();
  const [isReversingGeo, setIsReversingGeo] = useState(false);
  const city = weather?.location.name;

  const isLoading = isLoadingWeather || isUpdatingSettings || isReversingGeo;

  // useEffect(
  //   function () {
  //     if (city && currentPosition) {
  //       updateSettings(
  //         { settingsToUpdate: { location: city } },
  //         {
  //           onSuccess: () => {
  //             toast.success(`Location updated to ${city}`);
  //           },
  //         },
  //       );
  //     }
  //   },
  //   [city, currentPosition, updateSettings],
  // );

  function handleUpdateLocation() {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      setIsReversingGeo(true);
      const { latitude, longitude } = position.coords;
      // reverseGeocode(latitude, longitude);se
      console.log(`${latitude},${longitude}`);

      const API_KEY = import.meta.env.VITE_REVERSE_GEOCODING_API;

      fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=25.23987347727956&lon=119.09397376522183&format=json&apiKey=${API_KEY}`,
      )
        .then((response) => response.json())
        .then((result) => {
          const district = result.results[0].district;
          updateSettings({ settingsToUpdate: { location: district } });
        })
        .catch((error) => console.log("error", error))
        .finally(() => setIsReversingGeo(false));

      // setCurrentPosition({ latitude, longitude });
    });
  }

  return (
    <div className="rounded-xl bg-white p-6 text-center shadow-lg">
      <div className="h-30 text-lg text-gray-600">
        {isLoading && <SpinnerInside />}
        {error && <span className="text-red-600">Fail to fetch your city</span>}
        {!isLoading && !error && weather && (
          <>
            <div className="mb-10">
              <span className="text-4xl font-bold text-stone-600">{city}</span>
            </div>
            <div className="text-lg font-semibold">
              Wrong location? Click{" "}
              <span
                className="cursor-pointer font-bold text-indigo-600"
                onClick={handleUpdateLocation}
              >
                HERE
              </span>{" "}
              to update your location.
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HomeHeader;
