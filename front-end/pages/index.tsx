import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Lenderr</title>
        <meta name="description" content="The lenderr webiste" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Lenderr.png" />
      </Head>
      <Header/>
      <main className={styles.main}>
        
      </main>
    </>
  );
}
