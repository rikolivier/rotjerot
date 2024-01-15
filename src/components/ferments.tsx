import { useState } from "react";

import { api, type RouterOutputs } from "../utils/api";
import { useSession } from "next-auth/react";

type Ferment = RouterOutputs["ferment"]["getAll"][0];
type Note = RouterOutputs["note"]["getAll"][0];

export const Ferments: React.FC = () => {
  const { data: sessionData } = useSession();
  const [selectedFerment, setSelectedFerment] = useState<Ferment | null>(null);

  const { data: ferments, refetch: refetchFerments } =
    api.ferment.getAll.useQuery(undefined, {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => {
        setSelectedFerment(selectedFerment ?? data[0] ?? null);
      },
    });

  const deleteFerment = api.ferment.delete.useMutation({
    onSuccess: () => {
      void refetchFerments();
    },
  });

  if (!sessionData) {
    return <ul>Ask for login or login with discord</ul>;
  }
  return (
    <>
      {ferments?.length !== 0 && (
        <section>
          {ferments?.map((ferment: Ferment) => (
            <div key={ferment.id} className="ferment">
              <div>
                Title: <span>{ferment.title}</span>{" "}
                <button
                  style={{
                    color: "oklch(65.15% 0.296 25.94)", // Bright red color
                  }}
                  onClick={() => deleteFerment.mutate(ferment)}
                >
                  x
                </button>
                <br />
                Created on:{" "}
                <span>{ferment.createdAt.toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </section>
      )}
    </>
  );
};
