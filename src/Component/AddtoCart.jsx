import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './AddtoCart.css'
import { useNavigate } from 'react-router-dom';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function CustomizedBadges() {
    const navigation = useNavigate();
    const navigateToCart=()=>navigation('/cart')
  return (
    <div className="cartIcon">
    <IconButton aria-label="cart" onClick={navigateToCart}>
      <StyledBadge  color="secondary">
        <ShoppingCartIcon color='white'/>
      </StyledBadge>
    </IconButton>
</div>
  );
}