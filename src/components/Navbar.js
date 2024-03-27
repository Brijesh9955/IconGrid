import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logo from './img/icon-grid.png'
import favicon from './img/logo.png'
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import SaveIcon from '@mui/icons-material/SaveAlt';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { MdOutlineCancel } from "react-icons/md";
import { IoMdImages, IoIosShareAlt, IoIosDownload, IoIosArrowDown, IoLogoFacebook, IoLogoTwitter, IoLogoInstagram, IoLogoPlaystation, IoLogoWhatsapp } from "react-icons/io";
import { useEffect } from 'react';
import axios from 'axios';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
const pages = [
    { name: 'Home', path: '/' },
    { name: 'Icons', path: '/icons' },
    { name: 'Interface icons', path: '/interface-icons' },
    { name: 'Animated icons', path: '/animated-icons' },
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function Navbar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [saveIcons, setSaveIcons] = useState([]);
    const [saveId, setSaveId] = useState([]);

    const history = useHistory();

    useEffect(() => {
        axios.get(`https://icongrid-backend.onrender.com/save/find`)
            .then((res) => {
                const ids = res.data.data.map((el) => el.save);
                const sId = res.data.data.map((el) => el._id);
                setSaveId(sId);
                ids.forEach(id => getSaveIcons(id,sId));
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }, []);

    const getSaveIcons = async (id,sId) => {
        try {
            let res = await axios.get(`https://icongrid-backend.onrender.com/icon/findById/${id}`);
            console.log("Response for id", id, ":", res.data.data);
            console.log(",,,,, :", sId);
            setSaveIcons(prevState => [...prevState, res.data.data]);
        } catch (error) {
            console.log("Error fetching save icons for id", id, ":", error.response.data);
        }
    };
    
    const removeSave = (id) => {
        console.log("ID ID ID :- ", id);
        axios.delete(`https://icongrid-backend.onrender.com/save/delete/${id}`)
            .then((res) => {
                console.log("Save Icon Delete Susseccfully :- ", res.data.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };
    
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handlePageClick = (path) => {
        history.push(path);
        handleCloseNavMenu();
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <AppBar sx={{ backgroundColor: '#272727', position: 'fixed', top: 0, zIndex: '99' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                        <Typography
                            variant="h6"
                            noWrap
                            // component="a"
                            // href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: '#fff',
                                textDecoration: 'none',
                                display: 'contents'
                            }}
                        >
                            <span style={{ letterSpacing: 'initial', fontSize: '28px' }}>Ic</span><img width={'2%'} src={favicon} alt="" srcset="" /><span style={{ marginLeft: "1px", fontSize: '28px', letterSpacing: 'initial' }}>nGrid</span>
                            {/* <img src={logo1} width={'10%'} alt="" srcset="" /> */}
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page, i) => (
                                    <Button
                                        key={i}
                                        onClick={() => handlePageClick(page.path)}
                                        sx={{ my: 1, color: 'white', display: 'block', textTransform: 'capitalize' }}
                                    >
                                        {page.name}
                                    </Button>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: '#fff',
                                textDecoration: 'none',
                            }}
                        >
                            IconGrid
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                            {pages.map((page, i) => (
                                <Button
                                    key={i}
                                    onClick={() => handlePageClick(page.path)}
                                    sx={{ my: 1, color: 'white', display: 'block', textTransform: 'capitalize' }}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ margin: '0px 20px' }}>
                            <React.Fragment>
                                <Box sx={{ cursor: 'pointer' }}>
                                    <Badge badgeContent={4} onClick={handleClickOpen} color="primary">
                                        <SaveIcon color="#fff" />
                                    </Badge>
                                </Box>
                                <BootstrapDialog
                                    // backgroundColor={'#fff'}
                                    onClose={handleClose}
                                    aria-labelledby="customized-dialog-title"
                                    open={open}
                                >
                                    <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#fff' }} id="customized-dialog-title">
                                        Collection
                                    </DialogTitle>
                                    <IconButton
                                        aria-label="close"
                                        onClick={handleClose}
                                        sx={{
                                            position: 'absolute',
                                            right: 8,
                                            top: 8,
                                            color: '#000'
                                        }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                    <DialogContent dividers sx={{ backgroundColor: '#fff' }}>
                                        <div>
                                            <Grid container >
                                                {saveIcons.map((el,index) => (
                                                    <Grid
                                                        key={index}
                                                        item
                                                        xs={2}
                                                        sx={{
                                                            position: 'relative',
                                                            '&:hover': { border: '1px solid black', borderRadius: '5px' },
                                                        }}
                                                        onMouseEnter={() => setHoveredItem(index)}
                                                        onMouseLeave={() => setHoveredItem(null)}
                                                    >
                                                        <Box sx={{ width: '50px', height: '50px' }}>
                                                            {/* <SaveIcon color="#000" /> */}
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" dangerouslySetInnerHTML={{ __html: el.regular }}></svg>
                                                        </Box>
                                                        {hoveredItem === index && (
                                                            <Box position="absolute" top={0} right={1}>
                                                                {console.log("sdfbdgf :- ", el)}
                                                                <MdOutlineCancel onClick={() => removeSave(el._id)} />
                                                            </Box>
                                                        )}
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </div>
                                    </DialogContent>
                                    <DialogActions sx={{ backgroundColor: '#fff', display: 'flex', justifyContent: 'space-between' }}>
                                        <Box>
                                            <Button autoFocus >
                                                <input type="color" />
                                            </Button>
                                        </Box>
                                        <Box>
                                            <Button sx={{ backgroundColor: '#ededed', color: '#000', fontWeight: '600', fontSize: '16px', marginRight: '5px' }} autoFocus >
                                                SVG <IoIosDownload fontSize={'20px'} />
                                            </Button>
                                            <Button sx={{ backgroundColor: '#ededed', color: '#000', fontWeight: '600', fontSize: '16px' }} autoFocus >
                                                PNG <IoIosDownload fontSize={'20px'} />
                                            </Button>
                                        </Box>
                                    </DialogActions>
                                </BootstrapDialog>
                            </React.Fragment>
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>

                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default Navbar