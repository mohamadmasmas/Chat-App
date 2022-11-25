import React from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ContactsProvider } from './context/ContactsProvider';
import { ConvProvider } from './context/ConvProvider';
import { SocketProvider} from './context/Socket'

function App() {

  const [ id , setId ] = useLocalStorage('id')

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConvProvider id={id}>
          <Dashboard username={id}/>
        </ConvProvider>
      </ContactsProvider>
    </SocketProvider>
  )

  return (
    <>
      { id ?
        dashboard : 
        <Login onUserNameSubmit={setId}/>
      }
    </>
  );
}

export default App;
