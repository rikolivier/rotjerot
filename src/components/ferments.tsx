import { useState } from "react";

import { api, type RouterOutputs } from "../utils/api";
import { useSession } from "next-auth/react";

type Ferment = RouterOutputs["ferment"]["getAll"][0];
type Note = RouterOutputs["note"]["getAll"][0];

export const Ferments: React.FC = () => {
  return "Ferements";
};
