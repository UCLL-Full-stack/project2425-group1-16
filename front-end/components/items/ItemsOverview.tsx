import ItemService from '@/services/ItemService';
import { Item, LoadedPage, Profile } from '@/types';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  items: Item[];
  profile: Profile | null;
  selectedItem: Item | null;
  setSelectedItem: (item: Item) => void;
  setSubPage: (subpage: LoadedPage) => void;
};

const ItemsOverview: React.FC<Props> = ({ items, profile, selectedItem, setSelectedItem, setSubPage }: Props) => {
  const router = useRouter();
  const { t } = useTranslation();

  const getItemById = async (id: number) => {
    const response = await ItemService.getItemById(id.toString());
    if (response.status == 200) {
        const json = await response.json();
        setSelectedItem(json);
    }
};

  const goToOverviewPage = async (itemId: number | undefined) => {
    if (itemId == null) {
      
    } else {
      await getItemById(itemId);
      if (selectedItem != null) {
        setSelectedItem(selectedItem);
        setSubPage("ITEM_OVERVIEW");
      }
    }
  }

  return (
    <>
      {items && profile && (
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
                    <td>{item.location.displayName}</td>
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
