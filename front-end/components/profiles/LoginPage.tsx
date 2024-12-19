import ProfileService from "@/services/ProfileService";
import { Profile, TokenObj } from "@/types";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
    profileId: number | null;
    setProfileId: (profileId: number) => void;
};
  
const LoginPage: React.FC<Props> = ({ profileId, setProfileId }: Props) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [tokenObj, setTokenObj] = useState<TokenObj|null>(null);
    const router = useRouter();

    const loginByEmailAndPassword = async (event: React.FormEvent) => {
        event?.preventDefault();
        try {
            const response = await ProfileService.login({email: email, password: password});
            if (response.status == 200) {
                const json = await response.json();
                setTokenObj(json);
                if (tokenObj) {
                    setProfileId(tokenObj.userId);
                    sessionStorage.setItem('loggedInToken', JSON.stringify(tokenObj));
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
        {!profileId && (
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
                <div>
                    <button type="submit">Login</button>
                    <button onClick={()=>{router.push('/register')}}>Register</button>
                </div>
            </form>
            
          </>
        )}
      </>
    );
  };
  
  export default LoginPage;
  