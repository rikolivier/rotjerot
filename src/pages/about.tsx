import { NextPage } from "next";
import Link from "next/link";

const About: NextPage = () => {
  return (
    <>
      <h1>Make dreams work in 2024</h1>
      <p className="text-black">
        An explosive knowledge sharer and fermentation tracker in a visual way
      </p>
      <Link href="/login" className="text-blue-600">
        Login
      </Link>
    </>
  );
};

export default About;
