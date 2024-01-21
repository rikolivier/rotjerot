import { useState } from "react";

import { api, type RouterOutputs } from "../utils/api";
import { useSession } from "next-auth/react";

type Ferment = RouterOutputs["ferment"]["getAll"][0];

export const CreateFerment: React.FC = () => {
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
