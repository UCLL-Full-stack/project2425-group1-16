import React from 'react';
import { Item } from '@/types';

type Props = {
  item: Item | null;
};

const ItemOverview: React.FC<Props> = ({ item }: Props) => {
  return (
    <>
      {item && (
        <table>
          <tr>
            <td>ID:</td>
            <td>{item.id}</td>
          </tr>
          <tr>
            <td>Name:</td>
            <td>{item.name}</td>
          </tr>
          <tr>
            <td>Description:</td>
            <td>{item.description}</td>
          </tr>
          <tr>
            <td>Price:</td>
            <td>€ {item.price}</td>
          </tr>
          <tr>
            <td>Location:</td>
            <td>{item.location.displayName}</td>
          </tr>
        </table>
      )}
    </>
  );
};

export default ItemOverview;