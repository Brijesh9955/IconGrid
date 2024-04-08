// Category.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Breadcrumbs, Link, Button } from '@mui/material';
import Addcategory from './Addcategory';
import axios from 'axios';
import { AiOutlineDelete } from "react-icons/ai";

function Category() {
    const [data, setData] = useState([]);

    const token = localStorage.getItem('token');

    const updateCountIcons = () => {
        axios.put('https://icongrid-backend.onrender.com/count/update/66118721d874eac554e374dc',{},{
            headers: {
                admintoken: token
            }
        })
            .then((res) => {
                console.log(res.data.data);
            })
            .catch((error) => {
                console.log(error.response.data.message);
            });
    };

    useEffect(() => {
        getCategory();
    }, []);

    const getCategory = () => {
        axios.get('https://icongrid-backend.onrender.com/category/find')
            .then((res) => {
                setData(res.data.data);
                updateCountIcons()
            })
            .catch((error) => {
                console.log(error.response.data.message);
            });
    };


    const remove = (id) => {
        axios.delete(`https://icongrid-backend.onrender.com/category/delete/${id}`,{
            headers: {
                admintoken: token
            }
        })
            .then((res) => {
                getCategory();
            })
            .catch((error) => {
                console.log(error.response.data.message);
            });
    };

    return (
        <Box>
            <Typography variant="h5">
                Category
            </Typography>

            <Breadcrumbs aria-label="breadcrumb" marginBottom="30px">
                <Link className="Breadcrumb" style={{ color: "#899bbd", fontSize: "14px", textDecoration: "none" }} to="/">
                    Home
                </Link>
                <Typography color="#273246" fontSize="14px">Category</Typography>
            </Breadcrumbs>

            <Box className="add">
                <Box><Addcategory addCategory={getCategory} /></Box>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Change</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right" sx={{ display: 'flex' }}>
                                    <Addcategory addCategory={getCategory} updateCategory={row} />
                                    <Box sx={{ marginLeft: '5px' }}><Button onClick={() => remove(row._id)}><AiOutlineDelete color='#fff' fontSize={'25px'}/></Button></Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default Category;
