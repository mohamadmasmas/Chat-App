import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConv } from '../context/ConvProvider'

const Conversation = () => {

    const { formattedConv, setSelectedConversation } = useConv()
  
    return (
        <ListGroup variant='flush'>
            {formattedConv.map( (conv, index) => {
                return  <ListGroup.Item 
                        key={index}
                        action
                        onClick={() => {setSelectedConversation(index)}}
                        active={conv.seleceted}>
                            {conv.recipients.map(recipient => {
                                return recipient.name
                            }).join(', ')}
                        </ListGroup.Item>
            })}
        </ListGroup>
    )
}

export default Conversation