import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { Alert } from "@material-ui/lab";

export default function Warning(props) {
    return(
        <Dialog open={props.isOpen} onClose={props.close} aria-labelledby="Titel darf nicht leer sein.">
            <DialogTitle><Alert severity="error">Kein Titel</Alert></DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Bitte gib deinem Rezept einen Titel. Sollte dir keiner so richtig einfallen dann nimm doch einfach
                    den Standardnamen für dein Gericht und füge ein &bdquo;à la&ldquo; und deinen Namen hinzu.
                </DialogContentText>
                <DialogActions>
                    <Button onClick={props.close} color="primary" variant="contained" disableElevation>Schließen</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}