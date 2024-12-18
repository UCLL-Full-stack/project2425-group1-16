import ProfileService from "@/services/ProfileService";
import { Profile } from "@/types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
    profileId: number | null,
} 

const ProfilePage: React.FC<Props> = ({ profileId }: Props) => {
    const { t } = useTranslation();
    const [profile, setProfile] = useState<Profile|null>(null);

    const getProfileById = async (id: number) => {
        try {
            const response = await ProfileService.getProfileById(id);
            if (response.status == 200) {
                const json = await response.json();
                setProfile(json);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (profileId) {getProfileById(profileId)};
    }, []);

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
                    <td>{profile.locationTag.displayName}</td>
                </tr>
            </table>
        :
            <p>You are currently not logged in.</p>
    );
} 

export default ProfilePage;