import React from 'react';
import { Item } from '@/types';
import { useTranslation } from 'react-i18next';

type Props = {
  bookItemModalSetter : (bool: boolean) => void,
  item: Item | null;
};

const ItemOverview: React.FC<Props> = ({ item, bookItemModalSetter }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      {item && (
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
    </>
  );
};

export default ItemOverview;