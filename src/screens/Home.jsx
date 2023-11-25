import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from '../Component/Navbar'
import { getDatabase, onValue, ref } from 'firebase/database';
import Card from '../Component/Card';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebaseconfig';
import { useNavigate } from 'react-router-dom';
import AddtoCart from '../Component/AddtoCart';

const Home = () => {

  const [data,setData] = useState()
  const db = getDatabase();
const productsRef = ref(db, 'products/');


const navigation = useNavigate();
const [uid,setUid] = useState('')
useEffect(()=>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUid(user.uid);
    } else {
      navigation('/login')
    }
  });
  getData();

},[])


const getData =()=>{

  onValue(productsRef, (snapshot) => {
    setData(()=>snapshot.val())
  });
}

console.log(data)
// let productIds = Object.keys(data);


  return (
    <div>
      <Navbar value='Sell'/>
    <AddtoCart />
    {data && <Card data={data}/>}

    </div>
  )
}

export default Home
