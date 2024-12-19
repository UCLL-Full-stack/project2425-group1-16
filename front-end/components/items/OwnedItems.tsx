import ItemService from "@/services/ItemService";
import { Item, LoadedPage, Profile } from "@/types"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";

type Props = {
    profileId: number,
    setSelectedItemId: (number: number) => void;
    setSubPage: (subpage: LoadedPage) => void;
}

const OwnedItems: React.FC<Props> = ({ profileId, setSelectedItemId, setSubPage }: Props) => {
    const { t } = useTranslation();
    const [items, setItems] = useState<Item[]>([]);
    
    const loadOwnedItems = async () => {
        if (profileId == null) {
            throw new Error("Profile has no ID!");
        }
        const response = await ItemService.getItemsByOwner(profileId);
        if (response.status == 200) {
            const json = await response.json();
            setItems(json);
        }
    };
    
    useEffect(() => {
        loadOwnedItems();
    }, [profileId])

    const goToEditPage = async (itemId: number | undefined) => {
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
            <h2>{t('item.your')}</h2>
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
                <tr key={index} onClick={() => {goToEditPage(item.id)}} role="button">
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
    )
}

export default OwnedItems;