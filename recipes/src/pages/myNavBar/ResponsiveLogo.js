import React from 'react';
import logo from './Muffin_200.png';
import { Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function ResponsiveLogo () {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return(
        <div className="toolbar__subbar">
            <img src={logo} alt="Logo"/>
            {matches && <Typography variant="subtitle1">finnupa.de</Typography>}
        </div>
    );
}

export default ResponsiveLogo;