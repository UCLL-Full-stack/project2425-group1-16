import React, { useEffect, useState } from 'react';
import { Category, Item, Profile } from '@/types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ItemService from '@/services/ItemService';
import { useTranslation } from 'react-i18next';
import CurrencyInput from 'react-currency-input-field';
import CategoryService from '@/services/CategoryService';

type Props = {
  show: boolean;
  bookItemModalSetter : (bool: boolean) => void,
  item: Item|null,
};

const BookItemModal: React.FC<Props> = ({ show, bookItemModalSetter, item }: Props) => {
    const [profileId, setProfileId] = useState<number|null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const token = sessionStorage.getItem('loggedInToken');
        if (token) {setProfileId(JSON.parse(token).userId)}
    }, [show]);

    const submitModal = async () => {
        event?.preventDefault();
    };

    return (
        <Modal show={show} onHide={()=>{bookItemModalSetter(false)}}>
            <Modal.Header closeButton>
                <Modal.Title>{t('item.book')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form id="bookItem" onSubmit={()=>{submitModal}}>
                    
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>{bookItemModalSetter(false)}}>
                    {t('buttons.close')}
                </Button>
                <Button variant="primary" type="submit" form='bookItem'>
                    {t('item.book')}
                </Button>
            </Modal.Footer>
        </Modal>
  );
};

export default BookItemModal;