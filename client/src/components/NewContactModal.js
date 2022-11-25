import React, { useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useContacts } from '../context/ContactsProvider'

const NewContactModal = ({ onCloseModal }) => {

  const idRef = useRef()
  const nameRef = useRef()
  const { createContact } = useContacts()

  const onSubmitHandler = (e) => {
    e.preventDefault()

    createContact(idRef.current.value, nameRef.current.value)

    onCloseModal()
  }

  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmitHandler}>
          <Form.Group>
            <Form.Label>ID</Form.Label>
            <Form.Control type='text' ref={idRef} required></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' ref={nameRef} required></Form.Control>
          </Form.Group>
          <Button type='submit'>Create</Button>
        </Form>
      </Modal.Body>
    </>
  )
}

export default NewContactModal