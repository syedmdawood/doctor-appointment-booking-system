import Banner from "../Components/Banner";
import Headers from "../Components/Headers";
import SpecialityMenu from "../Components/SpecialityMenu";
import TopDoctors from "../Components/TopDoctors";

const Home = () => {
  return (
    <div>
      <Headers />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
    </div>
  );
};

export default Home;
