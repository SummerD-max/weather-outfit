import WeatherDisplay from "../weather/WeatherDisplay";
import HomeHeader from "./HomeHeader";
import Recommendation from "./Recommendation";

function HomeLayout() {
  return (
    <>
      <div className="mb-5">
        <HomeHeader />
      </div>
      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <WeatherDisplay />
          <Recommendation />
        </div>
      </div>
    </>
  );
}

export default HomeLayout;
