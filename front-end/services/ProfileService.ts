  const login = async (loginInformation: {email: string, password: string}) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiles/login`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(loginInformation)
    });
  };

  const getProfileById = async (id: number) => {
    const loggedInToken = sessionStorage.getItem('loggedInToken');
    let token = ""
    if (loggedInToken) { token = (JSON.parse(loggedInToken).token); }
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiles/`+id, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    });
  }
  
  const ProfileService = {
    login,
    getProfileById,
  };
  
  export default ProfileService;