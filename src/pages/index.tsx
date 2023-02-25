import { useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
// add isLoading state to button 
// handleCreateFerment
const [isLoading, setIsLoading] = useState(false);
const handleLoading = () => {
  setIsLoading(true);
  setTimeout(setIsLoading,1000) 
};
  return (
    <>
      <Head>
        <title>Rotje Rot - 2023</title>
        <meta name="description" content="Rotje Rot" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#fdfdfd] to-[#d3d4df]">
      <h2 className="text-3xl font-bold  text-gray-800">Rotje Rot</h2>
      <p>A explosive knowledge sharer and fermentation tracker in a visual way</p>
      <button className={[`bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded`, `${isLoading ? 'isLoading' : 'loaded'}`].join(' ')} onClick={handleLoading}>{"Start fermentation"}</button>
      </main>   
    </>
  );  
};

export default Home;