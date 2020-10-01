import React  from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {auth , provider} from './firebase' ;
import '../Style/Login.css';


function Login(props){

  const signin = () =>{
    auth.signInWithPopup(provider).then(result => props.set_user({id :result.additionalUserInfo.profile.id, name:result.additionalUserInfo.profile.name })).catch(error => alert(error.message))
  }


    const useStyles = makeStyles({
        root: {
          minWidth: 100,
          boxShadow: 25,
          alignContent: 100,
        },
        title: {
            fontSize: 25,
          },
          title2: {
            fontSize: 55,
          },});
          const classes = useStyles();
    return(
        <div className = "container">
          <div className ="card">            
            <div className='login_header '>
                CHIT - CHAT {'  '}<i class="far fa-comment-dots"></i>       
            </div>
            <div className='login-footer'>
              <div>
                 Your Chat Room !
              </div><hr></hr>
              <Button variant="contained" color="primary" href="#contained-buttons" onClick={signin}>
              <i class="fab fa-google"></i> Login with Google
              </Button>
            </div>
              
          </div>   
        </div>
    );
}

export default Login;