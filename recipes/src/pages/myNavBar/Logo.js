import React, { useState, useEffect } from 'react';
import logo from './Muffin_200.png';
import { Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import styles from '../../utils.module.css';
import classNames from 'classnames/bind';

function Logo () {
    const theme = useTheme();
    const largeWidth = useMediaQuery(theme.breakpoints.up('md'));
    const [scrolledDown, setScrolledDown] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    const handleScroll = (e) => {
        let scrollTop = window.scrollY;

        if (scrollTop > 70 ) {
            setScrolledDown(true);
        } else {
            setScrolledDown(false);
        }
    };

    return(
        <div className={`${styles.grow} toolbar__logo ${(scrolledDown || !largeWidth) ? "toolbar__logo_sm" : ""}`}>
            <img src={logo} alt="Logo"/>
            {largeWidth && <Typography variant="subtitle1">finnupa.de</Typography>}
        </div>
    );
}

export default Logo;