import React, { useState } from 'react'
import Conversation from './Conversation'
import Contacts from './Contacts'
import NewContactModal from './NewContactModal'
import NewConversationModal from './NewConversationModal'
import { Tab, Nav, Button, Modal } from 'react-bootstrap'

const Sidebar = ({ id }) => {

    const [activeKey, setActiveKey] = useState('Conversation');
    const [ modalOpen, setModalOpen] = useState(false)
    const isContact = activeKey === 'Contacts'

    const closeModal = () => {
        setModalOpen(false)
    }

  return (
    <div style={{ width: "250px"}} className='d-flex flex-column'>
        <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
            <Nav variant='tabs' className='justify-content-center'>
                <Nav.Item>
                    <Nav.Link eventKey={'Conversation'}>Conversation</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey={'Contacts'}>Contacts</Nav.Link>
                </Nav.Item>
                
            </Nav>
            <Tab.Content className='overflow-auto flex-grow-1 border'>
                <Tab.Pane eventKey={'Conversation'}>
                    <Conversation/>
                </Tab.Pane>
                <Tab.Pane eventKey={'Contacts'}>
                    <Contacts/>
                </Tab.Pane>
            </Tab.Content>
            <div className='p-2 border small'>
                Your ID: <span className='text-muted'> {id} </span>
            </div>
            <Button className='rounded-0' onClick={() => {setModalOpen(true)}}>
                New {isContact ? 'Contacts' : 'Conversation'}
            </Button>
        </Tab.Container>

        <Modal show={modalOpen} onHide={closeModal}>
            {isContact ? 
            <NewContactModal onCloseModal={closeModal}/> : 
            <NewConversationModal onCloseModal={closeModal}/>}
        </Modal>
    </div>
  )
}

export default Sidebar