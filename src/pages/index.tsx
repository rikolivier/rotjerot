import { useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";

import { api } from "../utils/api";

const Content: React.FC = () => {
  const { data: sessionData } = useSession();
  const { data: ferments, refetch: refetchFerments } =
    api.ferment.getAll.useQuery(undefined, {
      enabled: sessionData?.user !== undefined,
    });

  const createFerment = api.ferment.create.useMutation({});

  return (
    <>
      <input
        type="text"
        placeholder="Create ferment"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            createFerment.mutate({
              title: e.currentTarget.value,
            });
            e.currentTarget.value = "";
          }
        }}
      />
      {/* <p className="text-center text-2xl text-white">
        <ul>
          {ferments?.map(ferment) => (
            <li key={ferment.id}>
              <a href="#" onClick={(evt) => {
                evt.preventDefault();
              }}>
                {ferment.title}
              </a>
            
            </li>
          )}
          </ul>
      </p> */}
    </>
  );
};

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

  const createFerment = () => {
    //  create prisma entry
    setIsLoading(false);
  };
  const handleLoading = () => {
    setIsLoading(true);
    createFerment;
    setTimeout(setIsLoading, 1000);
  };
  return (
    <>
      <Head>
        <title>Rotje Rot - 2023</title>
        <meta name="description" content="Rotje Rot" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#000003] to-[#000001]">
        <User />
        <h2 className="text-3xl font-bold  text-white">I am alive</h2>
        <p className="text-white">
          An explosive knowledge sharer and fermentation tracker in a visual way
        </p>
        <Content />
        <button
          className={[
            `rounded bg-purple-900 py-2 px-4 font-bold text-white hover:bg-purple-600`,
            `${isLoading ? "isLoading" : "loaded"}`,
          ].join(" ")}
          onClick={handleLoading}
        >
          Create first ferment
        </button>
      </main>
    </>
  );
};

export default Home;
