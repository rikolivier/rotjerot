import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { type NextPage } from "next";
import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";

import { api, type RouterOutputs } from "../utils/api";

type Ferment = RouterOutputs["ferment"]["getAll"][0];

const Content: React.FC = () => {
  const { data: sessionData } = useSession();

  const [selectedFerment, setSelectedFerment] = useState<Ferment | null>(null);

  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);

  const { data: ferments, refetch: refetchFerments } =
    api.ferment.getAll.useQuery(undefined, {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => {
        setSelectedFerment(selectedFerment ?? data[0] ?? null);
      },
    });

  const createFerment = api.ferment.create.useMutation({
    onSuccess: () => {
      void refetchFerments();
    },
  });

  const deleteFerment = api.ferment.delete.useMutation({
    onSuccess: () => {
      void refetchFerments(), enableAnimations(false);
    },
  });

  if (!sessionData) {
    return <ul>Ask for login or login with discord </ul>;
  }

  return (
    <div>
      <input
        className="shadow-outline max-w-fit appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
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
      {ferments?.length !== 0 && (
        <div ref={parent}>
          {ferments?.map((ferment: Ferment) => {
            return (
              <div
                key={ferment.id}
                className="text-black-600 max-w-m rounded-1xl my-2 flex justify-between overflow-hidden border bg-white p-4"
              >
                <div>
                  Name: <span>{ferment.title}</span>
                  <br />
                  Created on:{" "}
                  <span>{ferment.createdAt.toLocaleDateString()}</span>
                  <br />
                  {/* Updated: <span>{ferment.updatedAt.toLocaleDateString()}</span> */}
                  {/* 
                  Idea
                  Age gradient component based on color input *checkpoints and start and end desired color
                  - Now line
                  - Created on line
                  - Color checkpoints
                  - Harvest line
                   */}
                </div>
                <span>
                  <button
                    style={{
                      color: "oklch(65.15% 0.296 25.94)",
                    }}
                    className="m-2 rounded-3xl p-4"
                    onClick={() => deleteFerment.mutate(ferment)}
                  >
                    delete
                  </button>
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};



const User: React.FC = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {/* {sessionData && <span>Logged in as {sessionData.user?.name}</span>} */}
      </p>
      <button
        className="mx-10 my-10 rounded-full bg-black/100 px-10 py-3 font-semibold text-white no-underline transition hover:bg-black/60"
        style={{ backgroundColor: "oklch(65.15% 0.296 25.94)" }}
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Afmelden" : "Aanmelden"}
      </button>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Rotje Rot - 2024</title>
        <meta name="description" content="Rotje Rot" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#eeeeee] to-[#fdf9f9]">
        <User />
        <Content />
      </main>
    </>
  );
};

export default Home;
