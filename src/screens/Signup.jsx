import { Box, Stack,TextField,Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { auth } from '../config/firebaseconfig';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, set } from "firebase/database";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const Signup = () => {


    


    const navigation = useNavigate()
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



    const [loading, setIsLoading] = useState(false);
    const setIsLoadingHandler=()=>{
        setIsLoading(prev=>!prev);
    }

    const goToLoginHandler = () => {
        navigation('/login')
    }

    const [input, setInput] = useState({});
    const inputHandler = (e) => {
        setInput(prev=>({
            ...prev,
            [e.target.id]:e.target.value
        })
        )
    }

    // console.log(input)
    const submitHander = async( ) =>{
        try{
    const response = await createUserWithEmailAndPassword(auth, input.email,input.password);
    console.log(response.user);
  
        const db = getDatabase();
        set(ref(db, 'users/' + response.user.uid), {
          username: input.name,
          email: input.email,
          accountType:input.accountType,
        });
      
    navigation('/')

        }catch(e){
            console.log(e)
        }
    }


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
            <Typography sx={{fontWeight:'bold'}}>Sign Up</Typography>
            
            <Stack>
                <TextField label={'E-mail'} id='email' onChange={inputHandler} />
            </Stack>
            <Stack>
                <TextField label={'Your Full Name'} id='name' onChange={inputHandler} />
            </Stack>
            <Stack>
                <TextField label={'Password'} id='password' type='password' onChange={inputHandler}/>
            </Stack>
            <Stack>
            <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Select Your account type</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="buyer" control={<Radio id='accountType'/>} label="Buyer"  onChange={inputHandler}/>
        <FormControlLabel value="seller" control={<Radio id='accountType'/>} label="Seller"  onChange={inputHandler}/>
       
      </RadioGroup>
    </FormControl>
                <Button variant='contained'  sx={{
        background: 'rgb(91,152,217,0.7)',
        background: 'linear-gradient(124deg, rgba(91,152,217,0.7) 27%, rgba(155,212,134,0.7) 100%)'
                }}
                onClick={submitHander}
>
                    Submit
                </Button>
                <Typography sx={{color:'blue',
            mt:2}}
            onClick={goToLoginHandler}>
                    Go to Login
                </Typography>
            </Stack>


        </Stack>

    </Stack>
  )
}

export default Signup
