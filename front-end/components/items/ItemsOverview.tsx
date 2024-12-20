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
  },[items])

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
        if (itemCategory.name == category.name) {
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
          <div className="justify-content-center">
            <button
              style={{border: "none"}}
              onClick={() => setFilteredItems(items)}
            >
              All
            </button>
            {categories.map((category, index) => (
              <button key={index}
              style={{border: "none"}}
              onClick={() => filterBy(category)}
            >
              {category.name}
            </button>
            ))}
      </div>
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
                    <td key={index}>{item.name}</td>
                    <td key={index}>{item.description}</td>
                    <td key={index}>{item.locationTag.displayName}</td>
                    <td key={index}>€ {item.price}</td>
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
