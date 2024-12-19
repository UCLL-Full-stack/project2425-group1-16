import React, { useEffect, useState } from 'react';
import { Category, Item } from '@/types';
import { useTranslation } from 'react-i18next';
import CurrencyInput from 'react-currency-input-field';
import CategoryService from '@/services/CategoryService';
import ItemService from '@/services/ItemService';
import { useRouter } from 'next/router';

type Props = {
  bookItemModalSetter : (bool: boolean) => void,
  item: Item | null;
  profileId: number | null;
};

const ItemOverview: React.FC<Props> = ({ item, bookItemModalSetter, profileId }: Props) => {
  const { t } = useTranslation();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  
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

  useEffect(() => {
    if (item) {
      setName(item.name);
      setDescription(item.description);
      setPrice(item.price.toString());
      setCategory(item.categories[0].name)
      getCategories();
    }
    
  }, [item])
  
  const deleteItem = async () => {
    if (item?.id) {
      try {
        const response = await ItemService.deleteItem(item?.id);
        if (response.status == 200) {
          router.push('/')
        } else {
          throw new Error("Delete failed")
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      {item && profileId && item.owner.id != profileId && (
        <>
          <table>
            <tr>
              <td>ID:</td>
              <td>{item.id}</td>
            </tr>
            <tr>
              <td>{t('item.tags.name')}:</td>
              <td>{item.name}</td>
            </tr>
            <tr>
              <td>{t('item.tags.description')}:</td>
              <td>{item.description}</td>
            </tr>
            <tr>
              <td>{t('item.tags.price')}:</td>
              <td>€ {item.price}</td>
            </tr>
            <tr>
              <td>{t('item.tags.location')}:</td>
              <td>{item.locationTag.displayName}</td>
            </tr>
          </table>
          <button 
            onClick={() => {bookItemModalSetter(true)}}
          >
            {t('item.book')}
          </button>
        </>
      )}
      {item && profileId && item.owner.id == profileId && (
        <>
        <form id="editItem" onSubmit={()=>{}}>
          <div>
            <p>{t('item.tags.name')}</p>
            <input type="text" placeholder={name} onChange={text => setName(text.target.value)}/>
          </div>
          <div>
            <p>{t('item.tags.description')}</p>
              <input type="text" placeholder={description} onChange={text => setDescription(text.target.value)}/>
          </div>
          <div>
            <p>{t('item.tags.price')}</p>
              <CurrencyInput decimalsLimit={2} prefix='€' placeholder={"€"+price} onValueChange={(value, name, values) => {if (values?.float) {setPrice(values.float.toString())} else {setPrice("")}}}/>
          </div>
          <div>
            <p>{t('item.tags.category')}</p>
            <select placeholder={category} onChange={choice => setCategory(choice.target.value)}>
              {categories.map((c, index) => (
              <option key={index} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
          <button type='submit'>
            {t('buttons.save')}
          </button>
        </form>
        <button onClick={()=>{deleteItem()}}>
          Delete
        </button>
        </>
      )}
    </>
  );
};

export default ItemOverview;