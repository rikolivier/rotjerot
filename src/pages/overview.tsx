import { useState } from "react";

import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";

import { api, type RouterOutputs } from "../utils/api";
import Link from "next/link";
import { Ferments } from "../components/ferments";

type Ferment = RouterOutputs["ferment"]["getAll"][0];

const Create: React.FC = () => {
  const { data: sessionData } = useSession();

  const [selectedFerment, setSelectedFerment] = useState<Ferment | null>(null);

  const { refetch: refetchFerments } = api.ferment.getAll.useQuery(undefined, {
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

  return (
    <span className="create-ferment">
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
    </span>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Rotje Rot - 2024</title>
        <meta name="description" content="Rotje Rot" />
      </Head>
      <nav>
        <Link href="/">Home</Link>
      </nav>
      <main>
        <Create />
        <Ferments />
      </main>
    </>
  );
};

export default Home;
