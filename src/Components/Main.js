import React from 'react'
import Sidebar from './Sidebar'
import Chat from './Chat'
import {Route , Link} from 'react-router-dom' 
import '../Style/Main.css'

function Main(props){
    
    return (
        <div className='parent'>
            <div className='Card'>
            <Sidebar/> 
            <Route path='/room/:roomid'>                
                <Chat  user={props.user} />
            </Route>
            </div>           
        </div>
    );
    
}

export default Main 