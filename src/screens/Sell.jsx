import React, { useEffect, useState } from 'react'
import Navbar from '../Component/Navbar'
import { Button, Stack, TextField } from '@mui/material'
import { onAuthStateChanged } from 'firebase/auth'
import { STORAGE } from '../config/firebaseconfig' 
import { auth } from '../config/firebaseconfig'
import { useNavigate } from 'react-router-dom'
import { getDatabase, ref, set,push ,child, onValue } from 'firebase/database'
import { getDownloadURL, uploadBytes,ref as storageRef } from 'firebase/storage'

const Sell = () => {

    const [image, setImage] = useState('');
    const [imageForDatabase , setImageForDatabase ] = useState('');
    const [uid,setUid] = useState('');
    const [render,setRender] = useState(0);
    const [dataUser,setDataUser] = useState({});

    const navigation = useNavigate();
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setUid(user.uid);
            //   dataUser[user.uid].accountType=''
            //   const db = getDatabase();

            //   const usersRef = ref(db, `users/${uid}`);

            // onValue(usersRef, (snapshot) => {
            //   setDataUser(()=>snapshot.val())
            // });

            // if(dataUser[uid].accountType   !== 'seller'){navigation('/')}
          } else {
            navigation('/login')
          }
        });
        
        
        
      },[])
      

   



    let imageMetaData;
    const inputImageHandler =(e)=>{
        // console.log(e)
        setImageForDatabase(e.target.files[0]);
         imageMetaData = URL.createObjectURL(e.target.files[0]);
        setImage(imageMetaData)
        console.log(imageMetaData)
    }



    const [inputs, setInputs] = useState({});




   
    
  

    const sendProductToDatabaseHandler = async() =>{
        
        const db = getDatabase();
        const keyRef = ref(db)
        try {
          const newPostKey = push(keyRef).key;
            //IMAGE UPLOADING PROCESS
            const refer = storageRef(STORAGE, `images/${newPostKey}.jpeg`); //REF FOR STORAGE
            const imgUpload = await uploadBytes(refer, imageForDatabase); // UPLOADING IMAGE
            const imgURL = await getDownloadURL(imgUpload.ref); //GETTING URL OF THAT IMAGE
            
      

          
        set(ref(db, '/products/' + newPostKey), {
            title: inputs.productTittle,
            desc: inputs.productDesc,
            price: inputs.productPrice,
            user:uid,
            imgURL:imgURL,
        });
        setRender(prev=>prev++)
    }catch(e) {
      console.log(e)
    }
   

    }

    function inputChangeHandler(e) {
        setInputs(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
    }
    // console.log(inputs)

  return (
    <div>
      <Navbar value='Buy'/>

      <Stack sx={{mt:2,gap:2}} key={render}>

      <TextField id="productTittle" label="Product Tittle" variant="outlined" onChange={inputChangeHandler} />
      <TextField id="productDesc" label="Product Description" variant="outlined" onChange={inputChangeHandler} />
      <TextField id="productPrice" label="Product Price" variant="outlined" type='number' onChange={inputChangeHandler}/>
      <input type="file"  accept="image/png, image/jpeg" onChange={(e)=>{
        inputImageHandler(e);
      }} />
      {image && <img src={image} alt="Product Image" width={200} height={200}/>}
        <Button variant='contained' onClick={sendProductToDatabaseHandler}>Add</Button>
      </Stack>

    </div>
  )
}

export default Sell
