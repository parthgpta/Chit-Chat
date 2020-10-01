import React, { useState } from 'react';
import Login from "./Components/login"
import Main from './Components/Main'
import {BrowserRouter as Router , Route ,Switch} from 'react-router-dom'
import './App.css';




function App() {
  const [user , setuser]  = useState(null) ;
  
  
  return (
    <div className="App">

      {!user  ? <Login set_user={setuser} /> :
        (<Router>
          <Switch>
            <Main user={user} />
          </Switch >
        </Router> ) }
      
    
    </div>
  );
}

export default App;
