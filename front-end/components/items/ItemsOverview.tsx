import ItemService from '@/services/ItemService';
import { Item, LoadedPage, Profile } from '@/types';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  items: Item[];
  profileId: number | null;
  selectedItemId: number | null;
  setSelectedItemId: (number: number) => void;
  setSubPage: (subpage: LoadedPage) => void;
};

const ItemsOverview: React.FC<Props> = ({ items, profileId, selectedItemId, setSelectedItemId, setSubPage }: Props) => {
  const router = useRouter();
  const { t } = useTranslation();


  const goToOverviewPage = async (itemId: number | undefined) => {
    if (itemId == null) {
      
    } else {
      setSelectedItemId(itemId);
      setSubPage("ITEM_OVERVIEW");
    }
  }

  return (
    <>
      {items && profileId && (
        <>
            <h2>{t('item.title')}</h2>
            <table className="table table-hover">
            <thead>
                <tr>
                <th scope="col">{t('item.tags.name')}</th>
                <th scope="col">{t('item.tags.description')}</th>
                <th scope="col">{t('item.tags.location')}</th>
                <th scope="col">{t('item.tags.price')}</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) => (
                <tr key={index} onClick={() => {goToOverviewPage(item.id)}} role="button">
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.locationTag.displayName}</td>
                    <td>€ {item.price}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </>
      )}
    </>
  );
};

export default ItemsOverview;
