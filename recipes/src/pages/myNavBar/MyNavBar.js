import React from 'react';
import { AppBar, Toolbar, IconButton, Divider, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import TuneIcon from '@material-ui/icons/Tune';
import FavoriteIcon from '@material-ui/icons/Favorite';

import './mynavbar.scss';
import logo from './Muffin_200.png';

class MyNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {small: false};

        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(event) {
        let scrollTop = window.scrollY;

        if (scrollTop > 100) {
            this.setState({ small: true });
            document.getElementById("toolbar").style.margin = "0 0";    
        } else {
            this.setState({ small: false });
            document.getElementById("toolbar").style.margin = "1rem 0"; 
        }
        
    }

    render() {
        return(
            <AppBar position="fixed">
                <Toolbar className="toolbar" id="toolbar">
                    <div className="toolbar__subbar">
                        <img src={logo} alt="Logo"/>
                        <Typography variant="subtitle1">finnupa.de</Typography>
                    </div>

                    <Typography variant={this.state.small ? "h4" : "h1"} component="h1" id="title">Rezepte</Typography>

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