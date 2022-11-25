import React from 'react'
import { useConv } from '../context/ConvProvider'
import OpenConversation from './OpenConversation'
import Sidebar from './Sidebar'


const Dashboard = ({ username }) => {
    
    const { selectedConversation } = useConv()

    return (
        <div className='d-flex' style={{ height: '100vh'}}>
            <Sidebar id={username}/>
            {selectedConversation && <OpenConversation/>}
        </div>
    )
}

export default Dashboard