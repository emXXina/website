import React, { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { AppBar, Toolbar, IconButton, Divider, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import TuneIcon from '@material-ui/icons/Tune';
import FavoriteIcon from '@material-ui/icons/Favorite';

import './mynavbar.scss';
import Logo from './Logo.js';

function MyNavBar() {
    const theme = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const isBigDevice = useMediaQuery(theme.breakpoints.up('md'));

    useEffect (() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    const handleScroll = () => {
        let scrollTop = window.scrollY;

        if (scrollTop > 70) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }  
    };

    return(
        <AppBar position="fixed">
            <Toolbar className="toolbar">
                <Logo/>

                <Typography variant={(scrolled || !isBigDevice) ? "h4" : "h1"} component="h1" id="title">Rezepte</Typography>

                <div className="toolbar__subbar">
                    <IconButton color="inherit">
                        <SearchIcon/>
                    </IconButton>
                    <IconButton color="inherit">
                        <TuneIcon/>
                    </IconButton>
                    <Divider orientation="vertical" />
                    <IconButton color="inherit">
                        <FavoriteIcon/>
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default MyNavBar;