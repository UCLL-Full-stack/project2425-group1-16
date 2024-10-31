const getAllItems = async () => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/items', {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
      },
    });
  };
  
  const ItemService = {
    getAllItems,
  };
  
  export default ItemService;