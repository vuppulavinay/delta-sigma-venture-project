
import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from '@mui/icons-material/Close';


const UserFormModal = ({ opn, onCls, titl, userInfo, onChangeFn,submitFn ,err,fieldListInfo}) => {

  
    return (
        <div>
            <Dialog onClose={onCls} open={opn}>
                <DialogTitle sx={{ padding: "10px 10px", display: 'flex', justifyContent: 'center', fontSize: 24, fontWeigh: 500 }}>{`${titl} Users`}</DialogTitle>
                <DialogContent sx={{ width: 400 }}>
                    <List >
                        {
                            fieldListInfo?.map((field, index) => {
                                return (
                                    <ListItem disablePadding key={field._id}>
                                        <div key={field._id} style={{ width: "100%", padding: '5px 0px' }}>
                                            <div>
                                                <label>{field.label}</label>
                                            </div>
                                            <input
                                                type={field.fieldType}
                                                style={{ width: "100%", padding: "5px 3px" }}
                                                name={`${field.fieldName}`}
                                                value={userInfo[field.fieldName]}
                                                onChange={(e) => onChangeFn(field.fieldName, e.target.value)}
                                            />
                                              {err?.[field?.fieldName] && <div style={{color:'red'}}>{err?.[field?.fieldName]}</div>}
                                        </div>
                                     
                                    </ListItem>
                                )
                            })
                        }

                    </List>
                    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                        <Button variant="contained" onClick={submitFn}>Submit</Button>
                        <Button variant="contained" sx={{ backgroundColor: 'red' }} onClick={onCls}>close</Button>
                    </div>

                </DialogContent>
            </Dialog>
        </div>
    )
}
export default UserFormModal;