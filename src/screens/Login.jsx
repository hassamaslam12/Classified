import { Box, Stack,TextField,Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
// import { auth } from '../config/FirebaseConfig/Firebaseconfig';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebaseconfig';

const Login = () => {
    const [loading, setIsLoading] = useState(false);

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              navigation('/')
              const uid = user.uid;
              // ...
            } else {
              
            }
          });

    },[])

    const setIsLoadingHandler=()=>{
        setIsLoading(prev=>!prev);
    }

    const navigation = useNavigate()
    const goToSignupHandler = () => {
        navigation('/signup')
    }

    const [input, setInput] = useState({});
    const inputHandler = (e) => {
        setInput(prev=>({
            ...prev,
            [e.target.id]:e.target.value
        })
        )
    }

    // const submitHander = async( ) =>{
    //     try{
    // const response = await createUserWithEmailAndPassword(auth, input.email,input.password);
    // console.log(response.user);
    //     }catch(e){
    //         console.log(e)
    //     }
    // }


  return (
    <Stack sx={{
        height: '100vh',
        background: 'rgb(91,152,217)',
        background: 'linear-gradient(180deg, rgba(91,152,217,1) 27%, rgba(155,212,134,1) 100%)'
    }} 
    justifyContent={'center'} 
    alignItems={'center'}>

        <Stack sx={{
            bgcolor: '#FFF',
            borderRadius: '10px',
            boxShadow: '0px 0px 20px #555'
        }}
        p={5}
        gap={2}
        >
            <Typography sx={{fontWeight:'bold'}}>Log In</Typography>
            
            <Stack>
                <TextField label={'E-mail'} id='email' onChange={inputHandler} />
            </Stack>
            <Stack>
                <TextField label={'Password'} id='password' type='password' onChange={inputHandler}/>
            </Stack>
            <Stack>
                <Button variant='contained'  sx={{
        background: 'rgb(91,152,217,0.7)',
        background: 'linear-gradient(124deg, rgba(91,152,217,0.7) 27%, rgba(155,212,134,0.7) 100%)'
                }}
>
                    Submit
                </Button>
                <Typography sx={{color:'blue',
            mt:2}}
            onClick={goToSignupHandler}>
                    Go to Signup
                </Typography>
            </Stack>

        </Stack>

    </Stack>
  )
}

export default Login
