import React from 'react';
import { AppBar, Toolbar, IconButton, Divider, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import TuneIcon from '@material-ui/icons/Tune';
import FavoriteIcon from '@material-ui/icons/Favorite';

import './mynavbar.scss';
import ResponsiveLogo from './ResponsiveLogo.js';

class MyNavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {smallNavBar: ! window.matchMedia('(min-width: 950px)').matches};
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.handleScroll);
    }

    handleScroll() {
        let scrollTop = window.scrollY;
        let isBigDevice = window.matchMedia('(min-width: 950px)').matches;

        if (scrollTop > 70 || (! isBigDevice)) {
            this.setState({ smallNavBar: true });
        } else {
            this.setState({ smallNavBar: false });
        }
        
    }

    render() {
        return(
            <AppBar position="fixed">
                <Toolbar className="toolbar" style={this.state.smallNavBar ? {margin: "0 0"} : {margin: "1rem 0"}}>
                    <ResponsiveLogo/>

                    <Typography variant={this.state.smallNavBar ? "h4" : "h1"} component="h1" id="title">Rezepte</Typography>

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