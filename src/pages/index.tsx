import { useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import lilou from "./lilou.png";
import { useSession, signIn, signOut } from "next-auth/react";

const User: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Afmelden" : "Aanmelden"}
      </button>
    </div>
  );
};
const Home: NextPage = () => {
  // add isLoading state to button
  // handleCreateFerment
  const [isLoading, setIsLoading] = useState(false);
  const handleLoading = () => {
    setIsLoading(true);
    setTimeout(setIsLoading, 1000);
  };
  return (
    <>
      <Head>
        <title>Rotje Rot - 2023</title>
        <meta name="description" content="Rotje Rot" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#000000] to-[#272727]">
        <Image src={lilou} alt="LAB" width={100} />
        <h2 className="text-3xl font-bold  text-white">I am alive</h2>
        {/* <p>
      An explosive knowledge sharer and fermentation tracker in a visual way
        </p> */}
        <button
          className={[
            `rounded bg-purple-900 py-2 px-4 font-bold text-white hover:bg-purple-600`,
            `${isLoading ? "isLoading" : "loaded"}`,
          ].join(" ")}
          onClick={handleLoading}
        >
          start
        </button>
        <User />
      </main>
    </>
  );
};

export default Home;
