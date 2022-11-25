import React, { useCallback, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useConv } from '../context/ConvProvider'

const OpenConversation = () => {

    const [text, setText] = useState('')
    const { sendMessage, selectedConversation } = useConv()
    const setRef = useCallback(e => {
        if(e){
            e.scrollIntoView({smooth: true})
        }
    },[])

    const onSubmitHandler = (e) => {
        e.preventDefault()
        
        sendMessage(selectedConversation.recipients.map(
            reipient => {
                return reipient.id
            }
        ), text)

        setText('')
    }

    return (
        <div className='d-flex flex-column flex-grow-1'>
            <div className='flex-grow-1 overflow-auto'>
                <div className='d-flex flex-column align-items-start justify-content-end p-3'>
                    {selectedConversation.messages.map((m,index) => {
                            const lastMessage = selectedConversation.messages.length - 1 === index 
                        return <div ref={lastMessage ? setRef: null}
                                    key={index} 
                                    className={`my-1 d-flex flex-column ${m.fromMe ?
                                        'align-self-end': ''}`}>
                                <div className={`rounded px-2 py-1 ${m.fromMe ?
                                'bg-primary text-white': 'border'}`}>
                                    {m.message}
                                </div>
                                <div className={`text-muted small ${m.fromMe ?
                                'text-right': ''}`}>
                                    {m.fromMe ? 'You': m.senderName}
                                </div>
                            </div>
                    })}
                </div>
            </div>
            <Form onSubmit={onSubmitHandler}>
                <Form.Group className='m-2'>
                    <InputGroup>
                        <Form.Control 
                            as='textarea' 
                            required 
                            value={text}
                            onChange={e => setText(e.target.value)}
                            style={{height: '75px', resize: 'none'}}>
                            
                        </Form.Control>
                    
                        <Button type='submit'>Send</Button>
                        
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}

export default OpenConversation