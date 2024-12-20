import ProfileService from "@/services/ProfileService";
import { Profile, TokenObj } from "@/types";
import { useRouter } from "next/router";
import { useState } from "react";


  
const RegisterPage: React.FC = () => {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [locationDisplayName, setLocationDisplayName] = useState<string>("");
    const [nameError, setNameError] = useState<String|null>(null);
    const [emailError, setEmailError] = useState<String|null>(null);
    const [passwordError, setPasswordError] = useState<String|null>(null);
    const [locationError, setLocationError] = useState<String|null>(null);
    const [tokenObj, setTokenObj] = useState<TokenObj|null>(null);
    const router = useRouter();

    const resetErrors = () => {
        setNameError(null);
        setEmailError(null);
        setPasswordError(null);
        setLocationError(null);
    }

    const registerProfile = async (event: React.FormEvent) => {
        event?.preventDefault();
        resetErrors()
        if (!name) {
            setNameError("Invalid username");
        }
        if (!email) {
            setEmailError("Invalid email");
        }
        if (!password) {
            setPasswordError("Invalid password");
        }
        if (!locationDisplayName) {
            setLocationError("Invalid Location");
        }
        try {
            const response = await ProfileService.register({username: name, email: email, password: password, locationDisplayName: locationDisplayName });
            if (response.status == 200) {
                const json = await response.json();
                sessionStorage.setItem('loggedInToken', JSON.stringify(json))
                router.push('/')
            } else {
                throw Error("Login Failed")
            }
        } catch (error) {
            console.log(error)
        }
    };


    return (
      <>
        <h2>Register</h2>
        <form onSubmit={registerProfile}>
            <div>
                <p>Username</p>
                <input type="text" onChange={text => setName(text.target.value)}/>
                <p style={{color: "#FF0000"}}>{nameError}</p>
            </div>
            <div>
                <p>Email</p>
                <input type="text" onChange={text => setEmail(text.target.value)}/>
                <p style={{color: "#FF0000"}}>{emailError}</p>
            </div>
            <div>
                <p>Password</p>
                <input type="text" onChange={text => setPassword(text.target.value)}/>
                <p style={{color: "#FF0000"}}>{passwordError}</p>
            </div>
            <div>
                <p>Location</p>
                <input type="text" onChange={text => setLocationDisplayName(text.target.value)}/>
                <p style={{color: "#FF0000"}}>{locationError}</p>
            </div>
            <button type="submit">Register</button>
        </form>
      </>
    );
  };
  
  export default RegisterPage;
  