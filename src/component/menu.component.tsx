import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function MenuComponent() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const goToPerfil = () => {
      navigate('/perfil')
    }
    const goToCadastroAcidente = () => {
        navigate('/cadastroacidente')
      }
    return (
        <Box component="span" sx={{
            p: 2, height: '40px',
            width: '100%',
            'background-color': '#afeeee3d'
        }}>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Menu
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={goToPerfil}>Perfil</MenuItem>
                <MenuItem onClick={handleClose}>Acidentes</MenuItem>
                <MenuItem onClick={goToCadastroAcidente}>Cadastrar novo acidente</MenuItem>
            </Menu>      
            </Box>

    );
}