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
  
  const ItemService = {
    getAllItems,
    getItemById,
  };
  
  export default ItemService;