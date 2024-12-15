import { NextPage } from "next";
import { NavBar } from "../components/navBar";

const About: NextPage = () => {
  return (
    <>
      <NavBar />
      <h1>Do what you love</h1>
      <p className="text-black">
        An explosive knowledge sharer and fermentation tracker in a visual way
      </p>
    </>
  );
};

export default About;
