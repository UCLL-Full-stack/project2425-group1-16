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
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiles/getById/`+id, {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    });
  }
  
  const getAdmins = async () => {
    const loggedInToken = sessionStorage.getItem('loggedInToken');
    let token = ""
    if (loggedInToken) { token = (JSON.parse(loggedInToken).token); }
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiles/byRole/admins`, {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    });
  }

  const getUsers = async () => {
    const loggedInToken = sessionStorage.getItem('loggedInToken');
    let token = ""
    if (loggedInToken) { token = (JSON.parse(loggedInToken).token); }
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiles/byRole/users`, {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    });
  }

  const makeAdmin = async (id: number) => {
    const loggedInToken = sessionStorage.getItem('loggedInToken');
    let token = ""
    if (loggedInToken) { token = (JSON.parse(loggedInToken).token); }
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiles/changeRole/admin/`+id, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    });
  }

  const makeUser = async (id: number) => {
    const loggedInToken = sessionStorage.getItem('loggedInToken');
    let token = ""
    if (loggedInToken) { token = (JSON.parse(loggedInToken).token); }
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiles/changeRole/user/`+id, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    });
  }

  const register = async (profileDTO: {username: string, email: string, password: string, locationDisplayName: string}) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profiles/signup/`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(profileDTO)
    });
  }

  const ProfileService = {
    login,
    getProfileById,
    getAdmins,
    getUsers,
    makeAdmin,
    makeUser,
    register,
  };
  
  export default ProfileService;