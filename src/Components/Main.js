import React from 'react'
import Sidebar from './Sidebar'
import Chat from './Chat'
import Greet from './Greet'
import {Route , Link , Redirect} from 'react-router-dom' 
import '../Style/Main.css'

function Main(props){
    
    return (
        <div className='parent'>
            <div className='Card'>
            <Sidebar/> 
            <Redirect exact from="/" to="/welcome" />
            <Route path='/welcome' >
                <Greet />
            </Route>
            <Route path='/room/:roomid'>                
                <Chat  user={props.user} />
            </Route>
            </div>           
        </div>
    );
    
}

export default Main 