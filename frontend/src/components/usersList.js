
import React, { useState, useEffect } from "react";
import usersData from "../lib/users.json";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import UserFormModal from "./userformModal";
import UserFieldModal from "./userFieldModal";
import axios from "axios";


const UsersList = () => {

    const [users, setUsers] = useState({
        id: "",
        // firstname: "",
        // lastname: "",
        // email: "",
        // phone: ""
    })
    const [createFormFields, setCreateFormFields] = useState({
        label: "",
        fieldName: "",
        fieldType: "text"
    })
    const [formFields, setFormFields] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [error, setError] = useState({});
    const [userFormDialogOpen, setUserFormDialogOpen] = useState(false);
    const [userFieldDialogOpen, setUserFieldDialogOpen] = useState(false);
    const [title, setTitle] = useState("Create");



    useEffect(() => {
        getUsersFn();
    }, [])


    useEffect(() => {
        getFormFieldsFn();
    }, [])

    const getFormFieldsFn = () => {
        axios.get("http://localhost:5000/api/users/getCreatedFormFields").then((res) => {
            setFormFields(res.data.data);
            if (res.data.data.length > 0) {
                setUsers((prev) => {
                    let obj = { ...prev };
                    res.data.data.forEach((field) => {
                        obj = { ...obj, [field.fieldName]: "" };
                    })
                    return obj;
                })
            }

        }).catch((err) => console.log(err));
    }

    const handleChangeField = (e) => {
        setCreateFormFields((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }


    const handleOpenCustomFormDialog = () => {
        formFields.forEach((field) => {
            setUsers((prev) => {
                return { ...prev, id: "", [field.fieldName]: '' }
            })
        })
        setError({});
        setTitle("Create");
        setUserFormDialogOpen(true);
    }
    const handleCloseCustomFormDialog = () => {
        setUserFormDialogOpen(false);
    }


    const handleOpenCreateFieldDialog = () => {
        setUserFieldDialogOpen(true);
    }
    const handleCloseCreateFieldDialog = () => {
        setCreateFormFields({
            label: "",
            fieldName: "",
            fieldType: ""
        })
        setUserFieldDialogOpen(false);
    }

    const handleEdit = (rowInfo) => {
        setUserFormDialogOpen(true);
        setTitle("Edit");
        for (let field in rowInfo.fields) {
            setUsers((prev) => {
                return {
                    ...prev,
                    id: rowInfo._id,
                    ...(field !== "_id" && { [field]: rowInfo.fields[field] })
                }
            })
        }
    }

    const handleUserChangeFn = (name, value) => {
        setError((prev) => ({ ...prev, [name]: '' }));
        setUsers((prev) => {
            return { ...prev, [name]: value }
        })

    }

    const editUserFn = (id) => {
        try {
            axios.put(`http://localhost:5000/api/users/updateUsers/${id}`, users).then((res) => {
                if (res.status === 200) {
                    setUserFormDialogOpen(false);
                    alert(res.data.message);
                    getUsersFn();
                }
            })
        } catch (error) {
            alert("Error on while updating user", error);
        }

    }

    const createUserFn = (userObj) => {
        console.log(userObj,'userObj');
        try {
            axios.post(`http://localhost:5000/api/users/createUsers`, userObj).then((res) => {
                if (res.status === 201) {
                    setUserFormDialogOpen(false);
                    // handleCloseCreateFieldDialog();
                    alert(res.data.message);
                    getUsersFn();
                }

            })
        } catch (error) {
            alert("Error on while updating user", error);
        }

    }

    const deleteUserFn = (id) => {
        try {
            axios.delete(`http://localhost:5000/api/users/deleteUsers/${id}`, users).then((res) => {
                if (res.status === 200) {
                    getUsersFn();
                    alert(res.data.message);
                }
            })
        } catch (error) {
            alert("Error on while updating user", error);
        }

    }

    const getUsersFn = () => {
        try {
            axios.get(`http://localhost:5000/api/users/getUsers`).then((res) => {
                if (res.status === 200) {
                    setUsersList(res.data.data);
                    // alert(res.data.message);
                }
            })
        } catch (error) {
            alert("Error on while getting users", error);
        }
    }

    const handleSubmitFn = () => {

        let errorObj = {};
        for (let key in users) {
            if (!users[key] && key !== "id") {
                errorObj[key] = "This field is required";
            } else {

                if (key === "email") {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(users[key])) {
                        errorObj[key] = "Please enter a valid email address";
                    }
                } else if (key === "phone") {
                    const phoneRegex = /^\d{10}$/;
                    if (!phoneRegex.test(users[key])) {
                        errorObj[key] = "Please enter a valid 10-digit phone number";
                    }
                }
            }
        }

        setError(errorObj);
        let isValid = false;
        isValid = Object.keys(errorObj).every((key) => !errorObj[key]);
        if (isValid && users["id"]) {
            editUserFn(users?.id);
        } else if (isValid && !users["id"]) {
            let obj = {};
            for (let key in users) {
                if (key !== "id") {
                    obj[key] = users[key];
                }  
            }
            createUserFn(obj);
        }

    }


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'right', padding: "10px 10px", gap: "10px" }}>
                <Button variant="contained" sx={{ bgcolor: "green", cursor: "pointer" }} onClick={handleOpenCreateFieldDialog}>Create New Form Fields</Button>
                <Button variant="contained" sx={{ bgcolor: "green", cursor: "pointer" }} onClick={handleOpenCustomFormDialog}>Add New User</Button>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 500, padding: "5px 10px" }}>Users List</div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {
                                formFields?.map((row) => (
                                    <TableCell>{row.label}</TableCell>
                                ))
                            }
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usersList?.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {
                                    formFields?.map((field) => (
                                        <TableCell>{row.fields[field.fieldName] ?? 'N/A'}</TableCell>
                                    ))
                                }
                                {/* <TableCell component="th" scope="row">
                                    {row.firstname}
                                </TableCell>
                                <TableCell>{row.lastname}</TableCell>
                                <TableCell>{row.phone}</TableCell>
                                <TableCell>{row.email}</TableCell> */}
                                {/* <TableCell>{row.Date ? row.Date : 'N/A'}</TableCell> */}
                                <TableCell>
                                    <div style={{ display: 'flex', gap: "10px" }}>
                                        <Button variant="contained" sx={{ cursor: "pointer" }} size="small" onClick={() => handleEdit(row)}>Edit</Button>
                                        <Button variant="contained" sx={{ bgcolor: "red", cursor: "pointer" }} size="small" onClick={() => deleteUserFn(row._id)}>Delete</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <UserFormModal opn={userFormDialogOpen} onCls={handleCloseCustomFormDialog} titl={title} userInfo={users} onChangeFn={handleUserChangeFn} submitFn={handleSubmitFn} err={error} fieldListInfo={formFields} />
            <UserFieldModal opn={userFieldDialogOpen} onCls={handleCloseCreateFieldDialog} handleChangeFn={handleChangeField} customFieldState={createFormFields} getfieldsInfo={getFormFieldsFn} />
        </div>
    )
}
export default UsersList;