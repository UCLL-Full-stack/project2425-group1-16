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
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/items/byOwner/' + owner_id, {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
  };

  const addItem = async (itemDTO: {name: string, description: string, price: string, category: string, ownerId: number}) => {
    const loggedInToken = sessionStorage.getItem('loggedInToken');
    let token = ""
    if (loggedInToken) { token = (JSON.parse(loggedInToken).token); }
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/items', {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(itemDTO)
    });
  }

  const deleteItem = async (id: number) => {
    const loggedInToken = sessionStorage.getItem('loggedInToken');
    let token = ""
    if (loggedInToken) { token = (JSON.parse(loggedInToken).token); }
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/items/delete/' + id, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
  }
  
  const ItemService = {
    getAllItems,
    getItemById,
    getItemsByOwner,
    addItem,
    deleteItem,
  };
  
  export default ItemService;