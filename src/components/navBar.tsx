import Head from "next/head";
import Link from "next/link";
import { User } from "./user";

export const NavBar: React.FC = () => {
  return (
    <>
      <Head>
        <title>Rotje Rot - 2024</title>
        <meta name="description" content="Rotje Rot" />
      </Head>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/overview">View</Link>
        <User />
      </nav>
    </>
  );
};
