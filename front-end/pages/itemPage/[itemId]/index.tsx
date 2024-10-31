import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { Item } from "@/types";
import ItemService from "@/services/ItemService";
import { useRouter } from "next/router";
import ItemOverview from "@/components/items/ItemOverview";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [item, setItem] = useState<Item | null>(null);
    const router = useRouter();
    const { itemId } = router.query;

    const getItemById = async (id: string | string[]) => {
        const response = await ItemService.getItemById(id as string);
        if (response.status == 200) {
            const json = await response.json();
            setItem(json);
        }
    };

    useEffect(() => {
        if (itemId) getItemById(itemId)
    }, [itemId]);

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
        <ItemOverview item={item}/>
      </main>
    </>
  );
}
