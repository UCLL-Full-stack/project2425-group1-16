import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import ItemsOverview from "@/components/items/ItemsOverview";
import { useEffect, useState } from "react";
import { Item, LoadedPage, Profile } from "@/types";
import ItemService from "@/services/ItemService";
import LoginPage from "@/components/profiles/LoginPage";
import PageMeta from "@/components/PageMeta";
import ProfilePage from "@/components/profiles/ProfilePage";
import ItemOverview from "@/components/items/ItemOverview";

const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subPage, setSubPage] = useState<LoadedPage>('HOME_PAGE');
  const [selectedItem, setSelectedItem] = useState<Item|null>(null);

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

  const presentSubPage = (subPage: LoadedPage): JSX.Element => {
    switch (subPage) {
      default: 
      case "HOME_PAGE":
        return <ItemsOverview items={items} profile={profile} selectedItem={selectedItem} setSelectedItem={setSelectedItem} setSubPage={setSubPage} />
        
      case "PROFILE_OVERVIEW":
        return <ProfilePage profile={profile}/>

      case "ITEM_OVERVIEW":
        return <ItemOverview item={selectedItem}/>
    }
  };

  return (
    <>
      <PageMeta />
      {profile && (
        <Header activePageSetter={setSubPage}/>
      )}
      <main className={styles.main}>
        <LoginPage setProfile={setProfile} profile={profile}/>
        {
          presentSubPage(subPage) 
        }
      </main>  
    </>
  );
}
