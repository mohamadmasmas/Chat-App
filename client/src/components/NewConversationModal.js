import React, { useState } from 'react'
import { Button, Form, FormGroup, Modal } from 'react-bootstrap'
import { useContacts } from '../context/ContactsProvider'
import { useConv } from '../context/ConvProvider'

const NewConversationModal = ({ onCloseModal }) => {
  const { contacts } = useContacts()
  const { createConv } = useConv()
  const [selectedContactIds, setSelectedContactIds] = useState([]);

  const checkBoxChangeHandler = (id) => {
    setSelectedContactIds(prev => {
      if(prev.includes(id)){
        return prev.filter(previd => {
          return previd !== id
        })
      }else{
        return [...prev, id]
      }
      
    })
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()

    createConv(selectedContactIds)
    onCloseModal()
  }
  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmitHandler}>
          {contacts.map(contact => {
            return <FormGroup controlId={contact.id} key={contact.id}>
                <Form.Check 
                  type='checkbox'
                  value={selectedContactIds.includes(contact.id)}
                  label={contact.name}
                  onChange={()=>{checkBoxChangeHandler(contact.id)}}/>
              </FormGroup>
          })}
          <Button type='submit'>Create</Button>
        </Form>
      </Modal.Body>
    </>
  )
}

export default NewConversationModal