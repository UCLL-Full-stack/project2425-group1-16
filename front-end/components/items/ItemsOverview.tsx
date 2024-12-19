import CategoryService from '@/services/CategoryService';
import ItemService from '@/services/ItemService';
import { Category, Item, LoadedPage, Profile } from '@/types';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
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
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>(items);


  const getCategories = async () => {
    try {
        const response = await CategoryService.getAllCategories();
        if (response.status == 200) {
            const json = await response.json();
            setCategories(json);
        }
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(()=>{
    if (profileId) {getCategories()}
  },[])

  const goToOverviewPage = async (itemId: number | undefined) => {
    if (itemId == null) {
      
    } else {
      setSelectedItemId(itemId);
      setSubPage("ITEM_OVERVIEW");
    }
  }

  const filterBy = async (category: Category) => {
    const filtered: Item[] = [];
    for (var item of items) {
      for (var itemCategory of item.categories) {
        if (itemCategory == category) {
          filtered.push(item)
        }
      }
    }
    setFilteredItems(filtered);
  }

  return (
    <>
      {categories && profileId && (
        <>
          <nav className="nav justify-content-center">
        <button
          className="nav-link px-4 fs-5 text-white bg-transparent"
          style={{border: "none"}}
          onClick={() => setFilteredItems(items)}
        >
          All
        </button>
        {categories.map((category, index) => (
          <button
          className="nav-link px-4 fs-5 text-white bg-transparent"
          style={{border: "none"}}
          onClick={() => filterBy(category)}
        >
          {category.name}
        </button>
        ))}
      </nav>
        </>
      )}
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
                {filteredItems.map((item, index) => (
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
