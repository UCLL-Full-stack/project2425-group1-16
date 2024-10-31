import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import ItemsOverview from "@/components/items/ItemsOverview";
import { useEffect, useState } from "react";
import { Item } from "@/types";
import ItemService from "@/services/ItemService";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [items, setItems] = useState<Item[]>([])

  const getItems = async () => {
    const response = await ItemService.getAllItems();
    if (response.status == 200) {
        const json = await response.json();
        setItems(json);
    }
  };

  useEffect(() => {
    getItems();   
  }, []);

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
        <ItemsOverview items={items}/>
      </main>
    </>
  );
}
