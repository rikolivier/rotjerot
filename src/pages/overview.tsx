import { useState } from "react";

import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

import { api, type RouterOutputs } from "../utils/api";
import Link from "next/link";

type Ferment = RouterOutputs["ferment"]["getAll"][0];

const Content: React.FC = () => {
  const { data: sessionData } = useSession();

  const [selectedFerment, setSelectedFerment] = useState<Ferment | null>(null);

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
      void refetchFerments();
    },
  });

  if (!sessionData) {
    return <ul>Ask for login or login with discord </ul>;
  }

  return (
    <div>
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
      {ferments?.length !== 0 && (
        <div>
          {ferments?.map((ferment: Ferment) => {
            return (
              <div key={ferment.id}>
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
                  <button onClick={() => deleteFerment.mutate(ferment)}>
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

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Rotje Rot - 2024</title>
        <meta name="description" content="Rotje Rot" />
      </Head>
      <Link href="/" className="text-blue-600">
        Home
      </Link>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#eeeeee] to-[#fdf9f9]">
        <Content />
      </main>
    </>
  );
};

export default Home;
