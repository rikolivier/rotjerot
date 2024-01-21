import { type NextPage } from "next";
import { Ferments } from "../components/ferments";
import { CreateFerment } from "../components/createFerment";
import { NavBar } from "../components/navBar";

const Home: NextPage = () => {
  return (
    <>
      <NavBar />
      <main>
        <CreateFerment />
        <Ferments />
      </main>
    </>
  );
};

export default Home;
