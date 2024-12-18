import React, { useState } from 'react';
import { Item } from '@/types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type Props = {
  show: boolean;
  addItemModalSetter : (bool: boolean) => void,
};

const AddItemModal: React.FC<Props> = ({ show, addItemModalSetter }: Props) => {
    const [name, setName] = useState<string|null>(null);
    const [description, setDescription] = useState<string|null>(null);
    const [price, setPrice] = useState<number|null>(null);
    return (
        <Modal show={show} onHide={()=>{addItemModalSetter(false)}}>
            <Modal.Header closeButton>
                <Modal.Title>Add Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <p>Name</p>
                    <input type="text" onChange={text => setName(text.target.value)}/>
                </div>
                <div>
                    <p>Description</p>
                    <input type="text" onChange={text => setDescription(text.target.value)}/>
                </div>
                <div>
                    <p>Price</p>
                    <input type="number" onChange={text => setPrice(text.target.valueAsNumber)}/>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>{addItemModalSetter(false)}}>
                    Close
                </Button>
                <Button variant="primary" onClick={()=>{}}>
                    Add item
                </Button>
            </Modal.Footer>
        </Modal>
  );
};

export default AddItemModal;