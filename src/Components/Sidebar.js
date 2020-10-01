import React , {useState , useEffect} from 'react' ;
import db from "./firebase.js" ;
import {Link} from 'react-router-dom'
import firebase from "firebase" ;
import '../Style/Sidebar.css' ; 

var count = 0 ;
const initialState = {
    isOpen: true
  };

function Sidebar(){
    const [rooms , setrooms] = useState([]);    
    const [val , setvalue] = useState(0);
    const [state, _setState] = useState(initialState);
  const setState = newState =>
    _setState(prevState => ({ ...prevState, ...newState }));

  const toggleButton = () => {
    setState({ isOpen: !state.isOpen });
  };
    
    useEffect(()=>{
        db.collection('rooms').orderBy('timestamp','desc').onSnapshot( (snapshot) =>  (
            setrooms(snapshot.docs.map(doc => 
            ({
                id : doc.id ,
                data : doc.data()
            })
            ))
        )       
        );
        
        
    } ,[]);

    const createroom =()=>{
        console.log(rooms) ;
        const name = prompt("Enter Room Name");

        if(name){
            db.collection("rooms").add({
                name : name ,
                timestamp : firebase.firestore.FieldValue.serverTimestamp()  ,
            });
        }
        toggleButton();
        
    }
    
   
    return (
        
        <div className='sidebar'>
            <div className='sidebar_header '>
                CHIT - CHAT {'  '}<i class="far fa-comment-dots"></i>
                <hr/>
            </div>
            <div className='add-button ' onClick={createroom} >
                <div className='button'>
                <i class="fas fa-plus"></i> Add New Room
                </div>
            </div>
            <Rooms rooms={rooms} state={state} />          
            
        </div>
    );

}

export default Sidebar

const Rooms =({rooms , state}) =>{
    return (
            <div className='rooms'>  
                    { rooms.map( element => (
                        <Roomdis element={element}  />
                        ))
                    }
            </div>
    );
}

const Roomdis = ({element}) => {
    const [lastmessage , setlastmessage] = useState([]);    
    useEffect(()=>{
        db.collection('rooms').doc(element.id).collection('messages').orderBy('timestamp','desc').limit(1).onSnapshot ( snapshot => (
                    setlastmessage(snapshot.docs.map( doc => doc.data()  ))
                )
        )    
       
                
    } ,[])

    function setstring(messtring){
        if(messtring.length>40)
            return messtring.slice(0,40)+" ....";
        else
            return messtring ;
    }

    return (<>   
                         
                <Link to={`/room/${element.id}`}>  
                    <div className='room'>
                        <div className='room-name'>
                        <i class="fas fa-quote-left"></i>{" "} {element.data.name}
                        </div>
                        {/* <div className ='room-mes'>
                            {lastmessage.length!=0? setstring(lastmessage[0].message) : <pre></pre>}
                        </div> */}
                    </div>    
                </Link>       
         </>
       
    );
}