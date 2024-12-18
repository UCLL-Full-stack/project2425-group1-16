import ItemService from "@/services/ItemService";
import { Item, Profile } from "@/types"
import { useState } from "react"

type Props = {
    profileId: number,
}

const OwnedItems: React.FC<Props> = ({ profileId }: Props) => {
    const [items, setItems] = useState<Item[]>([]);
    
    const loadOwnedItems = async () => {
        if (profileId == null) {
            throw new Error("Profile has no ID!");
        }
        const response = await ItemService.getItemsByOwner(profileId);
    };

    return (<>
                
    </>)
}

export default OwnedItems;