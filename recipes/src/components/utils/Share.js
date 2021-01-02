import React, { useState } from 'react';
import ShareIcon from '@material-ui/icons/Share';
import { IconButton, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function Share(props) {
    let link = props.link;
    if (link == null) {
        link = window.location.href;
    }

    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => {setOpenDialog(true)};
    const handleCloseDialog = () => {setOpenDialog(false)};

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const handleOpenSnackbar = () => {setOpenSnackbar(true)};
    const handleCloseSnackbar = () => {setOpenSnackbar(false)};

    return(
        <div>
        <IconButton aria-label="Teilen" onClick={handleOpenDialog}>
            <ShareIcon/>
        </IconButton>
        <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="Link kopieren">
            <DialogTitle>Teilen</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Um diese Seite mit anderen zu teilen, schicke ihnen den folgenden Link.
                </DialogContentText>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextField
                        fullWidth
                        autoFocus
                        margin="dense"
                        label="URL"
                        variant="outlined"
                        defaultValue={link}
                        InputProps={{
                        readOnly: true,
                        }}
                        onFocus={event => {
                            event.target.select()}}/>
                    <CopyToClipboard style={{ marginLeft: '1rem' }} text={link} onCopy={() => handleOpenSnackbar()}>
                        <Button color="primary">Kopieren</Button>
                    </CopyToClipboard>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} color="primary" variant="contained" disableElevation>Schließen</Button>
            </DialogActions>
        </Dialog>
        <Snackbar
            open={openSnackbar}
            autoHideDuration={5000}
            onClose={handleCloseSnackbar}
            message="Link kopiert">
                <Alert severity="success" elevation={6} variant="filled">
                    Link kopiert!
                </Alert>
        </Snackbar>
        </div>
    );
}