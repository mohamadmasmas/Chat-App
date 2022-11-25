import React, { useRef } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { v4 as uuidV4 } from 'uuid'

const Login = ({ onUserNameSubmit }) => {

    const idRef = useRef()

    const onSubmitHandler = (e) => {
        e.preventDefault();

        onUserNameSubmit(idRef.current.value)
    }

    const createUserHandler= () => {
        const id = uuidV4()

        onUserNameSubmit(id)
    }

    return (
        <Container className='align-items-center d-flex' style={{ height: "100vh"}}>
            <Form onSubmit={onSubmitHandler} className='w-100'>
                <Form.Group>
                    <Form.Label>Enter you user name</Form.Label>
                    <Form.Control type='text' ref={idRef} required></Form.Control>

                </Form.Group>
                <Button type='submit' className='m-2'>Submit</Button>
                <Button variant='secondary' className='m-2' onClick={createUserHandler}>Ctreate new user name</Button>
            </Form>
        </Container>
    )
}

export default Login