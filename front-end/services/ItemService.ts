const getAllItems = async () => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/items', {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
      },
    });
  };

  const getItemById = async (id: string) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/items/' + id, {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
      },
    });
  };

  const getItemsByOwner = async (owner_id: number) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/byOwner/' + owner_id, {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
      },
    })
  };
  
  const ItemService = {
    getAllItems,
    getItemById,
    getItemsByOwner,
  };
  
  export default ItemService;