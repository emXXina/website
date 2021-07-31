import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { Alert } from "@material-ui/lab";

export default function Warning(props) {
    return(
        <Dialog open={props.isOpen} onClose={props.close} aria-labelledby="Titel darf nicht leer sein.">
            <DialogTitle><Alert severity="error">{props.content.errorTitle || "Fehler"}</Alert></DialogTitle>
            <DialogContent>
                <DialogContentText>{props.content.errorDescription || "Bitte versuche, den Fehler zu beheben."}</DialogContentText>
                <DialogActions>
                    <Button onClick={props.close} color="primary" variant="contained" disableElevation>Schließen</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}