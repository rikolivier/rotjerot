import { NextPage } from "next";
import Link from "next/link";
import { User } from "../components/user";

const OldContent = (
  <>
    <h1>Make dreams work in 2024</h1>
    <p className="text-black">
      An explosive knowledge sharer and fermentation tracker in a visual way
    </p>
    <Link href="/overview" className="text-blue-600">
      overview
    </Link>
    <User />
  </>
);

const Home: NextPage = () => {
  return OldContent;
};

export default Home;
