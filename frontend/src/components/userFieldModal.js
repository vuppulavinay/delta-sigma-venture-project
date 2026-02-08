
import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import axios from "axios";

const UserFieldModal = ({ opn, onCls, handleChangeFn, customFieldState, getfieldsInfo }) => {


    const createFieldFn = () => {
        axios.post("https://backend-yu56.onrender.com/api/users/createformFields", { ...customFieldState }).then((res) => {
        // axios.post("http://localhost:5000/api/users/createformFields", { ...customFieldState }).then((res) => {
            onCls();
            getfieldsInfo();
            alert(res.data.message);
        }).catch((err) => console.log(err));
    }
    return (
        <div>
            <Dialog onClose={onCls} open={opn}>
                <DialogTitle sx={{ padding: "10px 10px", display: 'flex', justifyContent: 'center', fontSize: 24, fontWeight: 500 }}>Create Form Fields</DialogTitle>
                <DialogContent sx={{ width: 400 }}>
                    <div style={{ padding: "10px 0px", width: 400 }}>
                        <div style={{ width: "calc(400px - 20px)" }}>
                            <label>Field Label</label><br></br>
                            <input type="text" style={{ width: "100%", padding: "5px 3px" }} name="label" value={customFieldState.label} onChange={handleChangeFn} />
                        </div>
                        <div style={{ width: "calc(400px - 20px)" }}>
                            <label>Field Name</label><br></br>
                            <input type="text" style={{ width: "100%", padding: "5px 3px" }} name="fieldName" value={customFieldState.fieldName} onChange={handleChangeFn} />
                        </div>
                        <div style={{ width: "calc(400px - 20px)" }}>
                            <label>Field Type</label><br></br>
                            <select name="fieldType" id="cars" style={{ width: "100%", padding: "5px 3px" }} value={customFieldState.fieldType} onChange={handleChangeFn} >
                                <option value="text">text</option>
                                {/* <option value="password">password</option>
                                <option value="checked">checked</option> */}
                                <option value="date">date</option>
                            </select>
                        </div>

                    </div>

                    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                        <Button variant="contained" onClick={createFieldFn}>Submit</Button>
                        <Button variant="contained" sx={{ backgroundColor: 'red' }} onClick={onCls}>close</Button>
                    </div>
                </DialogContent>


            </Dialog>
        </div>
    )
}
export default UserFieldModal;