import { Stack,Typography,Button } from '@mui/material'
import React from 'react'

const Card = ({data}) => {
let productIds = Object.keys(data);

// localStorage.removeItem('products')

const locatStorageHandler = (e) => { 
    // console.log(e);
    let existingProducts = JSON.parse(localStorage.getItem('products'));
    console.log(existingProducts);
    // localStorage.setItem('products', JSON.stringify({hello:1}));
    if (existingProducts===null){
        existingProducts = {
            [e]:1
        }
    }else{

        existingProducts[e] ? existingProducts[e]++ : existingProducts[e] = 1;
    }
    localStorage.setItem('products', JSON.stringify(existingProducts)) 
}

    // console.log(data[productIds[0]].imgURL)
  return (
    <Stack alignItems={'center'} flexDirection={'row'} flexWrap={'wrap'}>

       {productIds.map((e,i)=><Stack key={i} sx={
            {   position:'relative',
                padding:'10px',
                margin:5,
                borderRadius:5,
                boxShadow:'0px 0px 10px gray',
                overflow: 'hidden',
                height:'450px',
                minWidth:300
            }
        }>
            <Stack 
            sx={
                {
                    width: 300,
                    height: 300,
                    objectFit:'fill',
                    overflow: 'hidden'
                }
            }>
                <img src={data[e].imgURL} alt="Hello" />
            </Stack>
            <Stack>
                <Typography fontWeight={'bold'} fontSize={'larger'}>{data[e].title}</Typography>
                <Typography >{data[e].desc}</Typography>
            </Stack>
            <Stack sx={{
                position: 'absolute',
                bottom:10,
                right:10,
                flexDirection:'row',
                alignItems:'center',
                gap:10,
            }}>
                <Typography color={'#1976D2'} fontWeight={'bold'}>Rs.{data[e].price}</Typography>

                <Button variant='contained' onClick={()=>locatStorageHandler(e)}>Add to Cart</Button>
            </Stack>
        </Stack>)}
        
    </Stack>
  )
}

export default Card
