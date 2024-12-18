import { Profile } from "@/types";
import { useTranslation } from "react-i18next";

type Props = {
    profile: Profile | null,
} 

const ProfilePage: React.FC<Props> = ({ profile }: Props) => {
    const { t } = useTranslation();
    return (
        profile ?
            <table>
                <tr>
                    <td>{t('profile.tags.name')}</td>
                    <td>{profile.username}</td>
                </tr>
                <tr>
                    <td>{t('profile.tags.mail')}</td>
                    <td>{profile.email}</td>
                </tr>
                <tr>
                    <td>{t('profile.tags.phone')}</td>
                    <td>{profile.phoneNumber}</td>
                </tr>
                <tr>
                    <td>{t('profile.tags.location')}</td>
                    <td>{profile.location.displayName}</td>
                </tr>
            </table>
        :
            <p>You are currently not logged in.</p>
    );
} 

export default ProfilePage;