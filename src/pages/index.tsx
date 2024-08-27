import { NextPage } from "next";
import { NavBar } from "../components/navBar";

const Home: NextPage = () => {
  return (
    <>
      <NavBar />
      <main>
        <h1>RotjeRot</h1>
        <p className="text-black">
          An explosive knowledge sharer and fermentation tracker in a visual way
        </p>
      </main>
    </>
  );
};

export default Home;
