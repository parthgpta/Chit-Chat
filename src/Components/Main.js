import React from 'react'
import Sidebar from './Sidebar'
import Chat from './Chat'
import '../Style/Main.css'

function Main(){
    
    return (
        <div className='parent'>
            <div className='Card'>
                <Sidebar/> 
                <Chat />
            </div>           
        </div>
    );
    
}

export default Main 