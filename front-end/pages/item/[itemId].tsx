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
import OwnedItems from "@/components/items/OwnedItems";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddItemModal from "@/components/items/AddItemModal";
import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";
import { useRouter } from "next/router";


const inter = Inter({ subsets: ["latin"] });


export default function ItemPage() {
  const router = useRouter();
  const { itemId } = router.query;
  const [subPage, setSubPage] = useState<LoadedPage>('ITEM_OVERVIEW');
  const [profileId, setProfileId] = useState<number | null>(null);
  const [addItemModal, setAddItemModal] = useState<boolean>(false);
  const [item, setItem] = useState<Item|null>(null);
  const { t } = useTranslation();

  

  const getItemById = async (id: number) => {
    const response = await ItemService.getItemById(id.toString());
    if (response.status == 200) {
        const json = await response.json();
        setItem(json);
    }
  };


  useEffect(()=> {
    if (Number(itemId)) {getItemById(Number(itemId))}
  }, [itemId])


  useEffect(() => {
    // I'd love to load the stored profile on page load, but the 
    // local profile parsing has to happen *after* the page has loaded.
    // Otherwise, localStorage doesn't exist, because it's trying to run it server-side????
    const loggedInToken = sessionStorage.getItem('loggedInToken');
    if (loggedInToken) { setProfileId(JSON.parse(loggedInToken).userId); }
    setAddItemModal(false) 
  }, []);

  const presentSubPage = (subPage: LoadedPage)=> {
    if (profileId == null) {
      return <p>{t('currentlyLoggedOut')}</p>
    }

    switch (subPage) {
      default: 
      case "HOME_PAGE":
        router.push('/');
        
      case "PROFILE_OVERVIEW":
        router.push('/');

      case "ITEM_OVERVIEW":
        return <ItemOverview item={item}/>
      
      case "OWNED_ITEMS":
        router.push('/');
    }
  };

  return (
    <>
      <PageMeta />
      {profileId && (
        <Header activePageSetter={setSubPage} addItemModalSetter={setAddItemModal}/>
      )}
      <main className={styles.main}>
        {
          presentSubPage(subPage) 
        }
        <AddItemModal show={addItemModal} addItemModalSetter={setAddItemModal}/>
      </main>  
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;

  return {
      props: {
          ...(await serverSideTranslations(locale ?? "en", ["common"])),
      },
  };
};