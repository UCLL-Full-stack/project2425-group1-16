  const getProfileByEmail = async (email: string) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/profiles/' + email, {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
      },
    });
  };
  
  const profileService = {
    getProfileByEmail,
  };
  
  export default profileService;