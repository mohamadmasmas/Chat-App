import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'
import { useSocket } from './Socket'

const ConvContext = React.createContext()

export function useConv(){
  return useContext(ConvContext)
}

function arrayIsEqual(a, b){
  if (a.length !== b.length){
    return false
  
  }
  a.sort()
  b.sort()

  return a.every((element, index)=>{
    return element === b[index]
  })
}

export function ConvProvider({id, children}) {

  const [selectedConversation, setSelectedConversation ] = useState(0)

  const [ Conv , setConv ] = useLocalStorage('Conv',[])
  const { contacts } = useContacts()

  const { socket } = useSocket()

  const createConv = (recipients) => {
    setConv(prev => {
      return [...prev,{ recipients, messages: [] }]
    })
  }

  const formattedConv = Conv.map((conv,index) => {
    const recipients = conv.recipients.map(recipient => {
      const contact = contacts.find(contact => {
        return contact.id === recipient
      })
      const name = (contact && contact.name) || recipient
      return { id: recipient, name: name}
    })
    const messages = conv.messages.map( m => {
      const contact = contacts.find(contact => {
        return contact.id === m.sender
      })
      const name = (contact && contact.name) || m.sender
      const fromMe = id === m.sender
      return {...m, senderName: name, fromMe}
    })
    const seleceted = index === selectedConversation
    return {...conv, messages, recipients ,seleceted}
  })

  const addMessageToConversation = useCallback(({recipients, message, sender}) => {
    setConv(prev => {
      let madeChange = false
      const newMessage = {sender, message}

      const newConv = prev.map(c => {
        if(arrayIsEqual(c.recipients, recipients)){
          madeChange = true
          return {...c, messages: [...c.messages, newMessage]}
        }
        return c
      })

      if(madeChange){
        return newConv
      } else{
        return [...prev, { recipients, messages: [newMessage]}]
      }
    })
  }, [setConv])

  useEffect(()=> {
    if(!socket){
      return
    }
    socket.on('recieve-message', addMessageToConversation)

    return () => socket.off('recieve-message')
  },[socket, addMessageToConversation])

  function sendMessage(recipients, message){
    socket.emit('send-message', { recipients, message})
    addMessageToConversation({
      recipients,
      message,
      sender: id
    })
  }

  return (
    <ConvContext.Provider value={{ 
        formattedConv, 
        createConv, 
        setSelectedConversation, 
        selectedConversation: formattedConv[selectedConversation],
        sendMessage}}>
      {children}
    </ConvContext.Provider>
  )
}
