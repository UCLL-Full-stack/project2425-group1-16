import { Profile } from "@/types";

type Props = {
    profile: Profile | null,
} 

const ProfilePage: React.FC<Props> = ({ profile }: Props) => {
    return (
        profile ?
            <table>
                <tr>
                    <td>Username</td>
                    <td>{profile.username}</td>
                </tr>
                <tr>
                    <td>E-mail</td>
                    <td>{profile.email}</td>
                </tr>
                <tr>
                    <td>Phone Number</td>
                    <td>{profile.phoneNumber}</td>
                </tr>
                <tr>
                    <td>Location</td>
                    <td>{profile.location.displayName}</td>
                </tr>
            </table>
        :
            <p>You are currently not logged in.</p>
    );
} 

export default ProfilePage;