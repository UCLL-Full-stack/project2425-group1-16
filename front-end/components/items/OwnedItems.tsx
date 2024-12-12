import ItemService from "@/services/ItemService";
import { Item, Profile } from "@/types"
import { useState } from "react"

type Props = {
    profile: Profile,
}

const OwnedItems: React.FC<Props> = ({ profile }: Props) => {
    const [items, setItems] = useState<Item[]>([]);
    
    const loadOwnedItems = async () => {
        if (profile.id == null) {
            throw new Error("Profile has no ID!");
        }
        const response = await ItemService.getItemsByOwner(profile.id);
    };

    return (<>
                
    </>)
}

export default OwnedItems;