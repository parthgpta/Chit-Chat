import React , {useState , useEffect} from 'react' ;
import db from "./firebase.js" ;
import {Link} from 'react-router-dom'
import '../Style/Sidebar.css' ; 

function Sidebar(){
    const [rooms , setrooms] = useState([]);
    
    useEffect(()=>{
        db.collection('rooms').onSnapshot( (snapshot) =>  (
            setrooms(snapshot.docs.map(doc => 
            ({
                id : doc.id ,
                data : doc.data()
            })
            ))
        )
        );
        
    } ,[]);

    // useEffect(()=>{
    //     db.collection('rooms').doc(roomid).collection('messages').orderBy('timestamp','desc').onSnapshot ( snapshot => (
    //         setlastmessage(snapshot.docs.map( doc => doc.data()  ))
    //     )
    //     )

    // },[])

    const createroom =()=>{
        console.log(rooms) ;
        const name = prompt("Enter Room Name");

        if(name){
            db.collection("rooms").add({
                name : name ,
            });
        }
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
            <div className='rooms'>  
            { rooms.map( element => (
                <Roomdis element={element} />
            ))}
            </div>
           
            
        </div>
    );

}

export default Sidebar

const Roomdis = ({element}) => {
    const [lastmessage , setlastmessage] = useState([]);
    
    useEffect(()=>{
        db.collection('rooms').doc(element.id).collection('messages').orderBy('timestamp','desc').onSnapshot ( snapshot => (
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
                            {element.data.name}
                        </div>
                        <div className ='room-mes'>
                            {lastmessage.length!=0? setstring(lastmessage[0].message) : " "}
                        </div>
                    </div>    
                </Link>       
         </>
       
    );
}