import React from 'react';
import { AppBar, Toolbar, IconButton, Divider } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import TuneIcon from '@material-ui/icons/Tune';
import FavoriteIcon from '@material-ui/icons/Favorite';

import './mynavbar.scss';
import logo from './Muffin_200.png';

class MyNavBar extends React.Component {
    render() {
        return(
            <AppBar position="fixed">
                <Toolbar className="toolbar">
                    <div className="toolbar__subbar">
                        <img src={logo} alt="Logo"/>
                        <h4>finnupa.de</h4>
                    </div>

                    <h1>Rezepte</h1>

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
}

export default MyNavBar;