import { Item, Profile } from '@/types';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
  items: Item[];
  profile: Profile | null;
};

const ItemsOverview: React.FC<Props> = ({ items, profile }: Props) => {
  const router = useRouter();
  return (
    <>
      {items && profile && (
        <>
            <h2>Current items near you </h2>
            <table className="table table-hover">
            <thead>
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Location</th>
                <th scope="col">Price</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) => (
                <tr key={index} onClick={() => {router.push("/itemPage/"+item.id?.toString())}} role="button">
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.location.displayName}</td>
                    <td>{item.price}€</td>
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
