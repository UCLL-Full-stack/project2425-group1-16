const getAllCategories = async () => {
  const loggedInToken = sessionStorage.getItem('loggedInToken');
    let token = ""
    if (loggedInToken) { token = (JSON.parse(loggedInToken).token); }
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/categories', {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    });
  };
  
  const CategoryService = {
    getAllCategories,
  };
  
  export default CategoryService;