import ItemService from '@/services/ItemService';
import ProfileService from '@/services/ProfileService';
import { Item, LoadedPage, Profile } from '@/types';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  profileId: number | null;
};

const AdminSelector: React.FC<Props> = ({ profileId }: Props) => {
  const router = useRouter();
  const [admins, setAdmins] = useState<Profile[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const { t } = useTranslation();

  const getAdmins = async () => {
    try {
        const response = await ProfileService.getAdmins();
        if (response.status == 200) {
            const json = await response.json()
            setAdmins(json);
        }
    } catch (error) {
        console.log(error)
    }
  }

  const getUsers = async () => {
    try {
        const response = await ProfileService.getUsers();
        if (response.status == 200) {
            const json = await response.json()
            setAdmins(json);
        }
    } catch (error) {
        console.log(error)
    }
  }

  const makeUser = async (id: number|undefined) => {
    if (id) {
        try {
            const response = await ProfileService.makeUser(id);
            if (response.status == 200) {
                getAdmins();
                getUsers();
            }
        } catch (error) {
            console.log(error);
        }
    }
  }

  const makeAdmin = async (id: number|undefined) => {
    if (id) {
        try {
            const response = await ProfileService.makeAdmin(id);
            if (response.status == 200) {
                getAdmins();
                getUsers();
            }
        } catch (error) {
            console.log(error);
        }
    }
  }

  useEffect(()=>{
    getAdmins();
    getUsers();
  }, [])

  return (
    <>
      {profileId && (
        <>
            <h2>{t('profile.tags.admin')}</h2>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">{t('profile.tags.name')}</th>
                        <th scope="col">{t('profile.tags.mail')}</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((profile, index) => (
                    <tr key={index} onClick={() => {makeUser(profile.id)}} role="button">
                        <td key={index}>{profile.username}</td>
                        <td key={index}>{profile.email}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <h2>Users</h2>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">{t('profile.tags.name')}</th>
                        <th scope="col">{t('profile.tags.mail')}</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((profile, index) => (
                    <tr key={index} onClick={() => {makeAdmin(profile.id)}} role="button">
                        <td key={index}>{profile.username}</td>
                        <td key={index}>{profile.email}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </>
      )}
    </>
  );
};

export default AdminSelector;
