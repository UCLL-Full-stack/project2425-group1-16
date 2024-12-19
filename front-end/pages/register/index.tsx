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

export default function Register() {
    return (
        <>
          <PageMeta />
          <main className={styles.main}>
            
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