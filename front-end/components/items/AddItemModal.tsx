import React, { useState } from 'react';
import { Item, Profile } from '@/types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ItemService from '@/services/ItemService';
import { useTranslation } from 'react-i18next';

type Props = {
  show: boolean;
  addItemModalSetter : (bool: boolean) => void,
};

const AddItemModal: React.FC<Props> = ({ show, addItemModalSetter }: Props) => {
    const [name, setName] = useState<string|null>(null);
    const [description, setDescription] = useState<string|null>(null);
    const [price, setPrice] = useState<number|null>(null);
    const [nameError, setNameError] = useState<boolean>(false);
    const [descriptionError, setDescriptionError] = useState<boolean>(false);
    const [priceError, setPriceError] = useState<boolean>(false);
    const { t } = useTranslation();

    const resetErrors = () => {
        setNameError(false);
        setDescriptionError(false);
        setPriceError(false);
    }

    const submitModal = async (event: React.FormEvent) => {
        event?.preventDefault();
        resetErrors()
        if (!name) {
            setNameError(true);
        }
        if (!description) {
            setDescriptionError(true);
        }
        if (!price) {
            setPriceError(true);
        }
        if (!nameError && !descriptionError && !priceError && name && description && price) {
            const stringUser = localStorage.getItem('loggedInProfile')
            if (stringUser) {
               const currentUser: Profile = JSON.parse(stringUser);
            //    const newItem: Item = {name: name, description: description, price: price, location: currentUser.location, owner: currentUser, categories: }
            //     try {
            //         const response = await ItemService.addItem(newItem);
            //         if (response.status == 200) {
            //             const json = await response.json();
            //         }
            //     } catch (error) {
            //         console.log(error)
            //     }
            } else {
                throw new Error("How did we get here?")
            }
        }
    };

    return (
        <Modal show={show} onHide={()=>{addItemModalSetter(false)}}>
            <Modal.Header closeButton>
                <Modal.Title>{t('item.add')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form id="addItem" onSubmit={()=>{submitModal}}>
                    <div>
                        <p>{t('item.tags.name')}</p>
                        <input type="text" onChange={text => setName(text.target.value)}/>
                    </div>
                    <div>
                        <p>{t('item.tags.description')}</p>
                        <input type="text" onChange={text => setDescription(text.target.value)}/>
                    </div>
                    <div>
                        <p>{t('item.tags.price')}</p>
                        <input type="number" onChange={text => setPrice(text.target.valueAsNumber)}/>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>{addItemModalSetter(false)}}>
                    {t('buttons.close')}
                </Button>
                <Button variant="primary" type="submit" form='addItem'>
                    {t('item.add')}
                </Button>
            </Modal.Footer>
        </Modal>
  );
};

export default AddItemModal;