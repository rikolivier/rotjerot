import { useSession, signIn, signOut } from "next-auth/react";

export const User: React.FC = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {sessionData && <span>Logged in as {sessionData.user?.email}</span>}
      <button
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Afmelden" : "Aanmelden"}
      </button>
    </div>
  );
};
