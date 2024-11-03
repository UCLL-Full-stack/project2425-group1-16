import ProfileService from "@/services/ProfileService";
import { Profile } from "@/types";
import { useState } from "react";

type Props = {
    profile: Profile | null;
    setProfile: (profile: Profile) => void;
};
  
const LoginPage: React.FC<Props> = ({ profile, setProfile }: Props) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [profileObj, setProfileObj] = useState<Profile | null>(null);

    const loginByEmailAndPassword = async (event: React.FormEvent) => {
        event?.preventDefault();
        try {
            const response = await ProfileService.getProfileByEmail(email);
            if (response.status == 200) {
                const json = await response.json();
                setProfileObj(json);
                if (profileObj && profileObj.password == password) {
                    setProfile(profileObj);
                    localStorage.setItem('loggedInProfile', JSON.stringify(profileObj));
                } else {
                    throw Error("Password is incorrect");
                }
            }
        } catch (error) {
            console.log(error)
        }
    };


    return (
      <>
        {!profile && (
          <>
            <h2>Login</h2>
            <form onSubmit={loginByEmailAndPassword}>
                <div>
                    <p>Email</p>
                    <input type="text" onChange={text => setEmail(text.target.value)}/>
                </div>
                <div>
                    <p>Password</p>
                    <input type="text" onChange={text => setPassword(text.target.value)}/>
                </div>
                <button type="submit">Login</button>
            </form>
          </>
        )}
      </>
    );
  };
  
  export default LoginPage;
  