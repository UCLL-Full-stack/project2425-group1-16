const getAllItems = async () => {
  const loggedInToken = sessionStorage.getItem('loggedInToken');
    let token = ""
    if (loggedInToken) { token = (JSON.parse(loggedInToken).token); }
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/items', {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    });
  };

  const getItemById = async (id: string) => {
    const loggedInToken = sessionStorage.getItem('loggedInToken');
    let token = ""
    if (loggedInToken) { token = (JSON.parse(loggedInToken).token); }
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/items/' + id, {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    });
  };

  const getItemsByOwner = async (owner_id: number) => {
    const loggedInToken = sessionStorage.getItem('loggedInToken');
    let token = ""
    if (loggedInToken) { token = (JSON.parse(loggedInToken).token); }
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/byOwner/' + owner_id, {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
  };

  const addItem = async () => {
    
  }
  
  const ItemService = {
    getAllItems,
    getItemById,
    getItemsByOwner,
    addItem,
  };
  
  export default ItemService;