import React from "react";
import {AppBar, IconButton, Toolbar} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    companyPage() {
        this.props.history.push('/company');
    }

    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        onClick={this.props.openDrawer}
                        edge="start"
                        styles={style.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon/>
                    </IconButton>
                    {/*<Typography variant="h6" styles={style.title}>*/}
                    {/*    News*/}
                    {/*</Typography>*/}
                    {/*<Button color="inherit">Login</Button>*/}
                </Toolbar>
            </AppBar>
        )
    }
}

const style = {
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: 20,
    },
    title: {
        flexGrow: 1,
    },
    logoutButton: {
        float: 'right',
    }
};

export default Header;