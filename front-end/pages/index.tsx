import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import ItemsOverview from "@/components/items/ItemsOverview";
import { useEffect, useState } from "react";
import { Item, Profile } from "@/types";
import ItemService from "@/services/ItemService";
import LoginPage from "@/components/profiles/LoginPage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);

  const getItems = async () => {
    const response = await ItemService.getAllItems();
    if (response.status == 200) {
      const json = await response.json();
      setItems(json);
    }
  };

  useEffect(() => {
    // I'd love to load the stored profile on page load, but the 
    // local profile parsing has to happen *after* the page has loaded.
    // Otherwise, localStorage doesn't exist, because it's trying to run it server-side????
    const loggedInProfile = localStorage.getItem('loggedInProfile');
    if (loggedInProfile) { setProfile(JSON.parse(loggedInProfile)); }
    
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
      {profile && (
        <Header/>
      )}
      <main className={styles.main}>
        <LoginPage setProfile={setProfile} profile={profile}/>
        <ItemsOverview items={items} profile={profile}/>
      </main>  
    </>
  );
}
