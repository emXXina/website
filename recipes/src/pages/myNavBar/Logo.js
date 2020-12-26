import React, { useState, useEffect } from 'react';
import logo from './Muffin_200.png';
import { Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function Logo () {
    const theme = useTheme();
    const largeWidth = useMediaQuery(theme.breakpoints.up('sm'));

    const [scrolledDown, setScrolledDown] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    const handleScroll = (e) => {
        let scrollTop = window.scrollY;

        // img only needs to become smaller if scrolled and a large device, otherwise there is no text so it has more space
        if (scrollTop > 70 && largeWidth) {  
            setScrolledDown(true);
        } else {
            setScrolledDown(false);
        }
    }

    return(
        <div className={scrolledDown ? "toolbar__logo toolbar_logo_sm" : "toolbar__logo"}>
            <img src={logo} alt="Logo"/>
            {largeWidth && <Typography variant="subtitle1">finnupa.de</Typography>}
        </div>
    );
}

export default Logo;