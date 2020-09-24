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
        <div class = "container">
    <div class ="card">
       <div class="txt">
         <Typography className={classes.title2} gutterBottom variant="h5" component="h2">
            Chit-Chat
          </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Your Chat room!
        </Typography>
        
        <Button variant="contained" color="secondary" href="#contained-buttons" onClick={signin}>
       Login with Google
        </Button>
        </div>
     </div>   
    </div>
    );
}

export default Login;