import React, { useState  ,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import db from './firebase';
import firebase from "firebase" ;
import '../Style/Chat.css'


function Chat(props){

    const {roomid} = useParams();
    const [value , setValue] = useState("");
    const [roomName, setRoomname] = useState("");
    const [messages , setMessages] = useState([]);
    
   //const user = props.user ; 
   var user = {
    id: "114648587059821115504",
    name: "Parth Gupta"
   }


    useEffect(()=>{

        if(roomid){
            db.collection('rooms').doc(roomid).onSnapshot( snapshot => 
                setRoomname(snapshot.data().name)
            )

            db.collection('rooms').doc(roomid).collection('messages').orderBy('timestamp','asc').onSnapshot ( snapshot => (
                setMessages(snapshot.docs.map( doc => doc.data()  ))
            )
            )
            
        }
    } , [roomid])

    const submit=()=>{
        if(value!=""){
            db.collection('rooms').doc(roomid).collection('messages').add({
                message : value ,
                name : user.name ,
                senderid : user.id ,
                timestamp : firebase.firestore.FieldValue.serverTimestamp()  ,
            })
            setValue("")
        }
    }
    
    const handlechange =(e) =>{
        setValue(e.target.value);
    }

    const handleenter =(e) =>{
        if(e.key == 'Enter'){
            submit();
        }

    }

    

    

    return (
        <div className='chat'>
            <div className='chat-header'>
                <div className='chat-header-name'>
                    {roomName}
                </div>
            </div>
            <Displaymessages messages={messages} user={user}/>
            
            <div className='chat-footer'>
                <div className='chat-input'>
                    <input type='text' placeholder='Enter Message' value={value} onChange={handlechange} onKeyPress={handleenter}></input>
                    <i class="fas fa-paper-plane" onClick={submit}></i>
                </div>
                
            </div>
        </div>
    );
}

export default Chat

function Displaymessages({messages , user}){
   
               
    return(
        <div className='chat-mes'>
    
            {
                   messages.map(data => (
                    <div className={user ==null || (data.senderid != user.id ) ? 'item' :'item2'}>
                        <span className='name'>
                            {data.name}
                        </span> 
                        <div className='text'>
                            {data.message}
                        </div>
                        <div className='time'>
                            {new Date(data.timestamp?.toDate()).toLocaleTimeString()}
                        </div>

                    </div>

                   ))
            }
        </div>
    );
}