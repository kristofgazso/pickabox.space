import React, { useState } from 'react';
import Modal from 'react-modal';
import Button from 'react-bootstrap/Button';
import Instructions from '../modal/Instructions'

export default function InstructionModal() {

    // Modal hook
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // About Modal
    const setAboutModalIsOpenToTrue = () => {
        setModalIsOpen(true)
    }

    const setAboutModalIsOpenToFalse = () => {
        setModalIsOpen(false)
    }


    return (
        <>
            <Button variant="primary" size="lg" onClick={setAboutModalIsOpenToTrue} style={instructionButton} className='instructionBtn'>
                <strong>Instructions</strong>
            </Button>

            <Modal isOpen={modalIsOpen} style={ModalWindow}>
                
                <Instructions/>
                <Button variant="primary" size="lg" style={ModalClose} classname="instructionBtn" onClick={setAboutModalIsOpenToFalse}>x</Button>
            
            </Modal>
        </>
    )

}

const ModalClose = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0px 16px',
    height: '34px',
    cursor:'pointer',
    borderRadius: '5px',
    borderColor: 'transparent',
    backgroundColor: '#d1564f',
    color: '#fff',
    transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
    margin: 'auto'
}

const ModalWindow = {
    content: {
        top: '10%',
        left: '38%',
        right: '38%',
        bottom: '30%',
        transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
    },

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'transparent',
    cursor: 'pointer',
    borderRadius: '5px',
    margin: 'auto'
}
const instructionButton = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0px 16px',
    width: '133px',
    height: '34px',
    cursor:'pointer',
    borderRadius: '5px',
    borderColor: 'transparent',
    transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
    margin: 'auto'
  }
