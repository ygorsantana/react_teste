import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ColorLens from '@material-ui/icons/ColorLens';
import Category from '@material-ui/icons/Category';
import ViewHeadline from "@material-ui/icons/ViewHeadline";
import {ExitToApp, Home} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {logout} from "../actions/login";
import {connect} from "react-redux";

class TempDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.setState({...this.state, [side]: open});
    };

    handleClick() {
        const [open, setOpen] = React.useState(true);

        setOpen(!open);
    }

    async logout() {
        // const client = await api.getClient();
        // await client.auth_token_logout_create();
        this.props.logout();
    }

    sideList() {
        return (
            <div
                role="presentation"
                style={{width: 250}}
                onClick={this.props.closeDrawer}
                onKeyDown={this.props.closeDrawer}
            >
                <List>
                    <ListItem button component={Link} to='/'>
                        <ListItemIcon><Home/></ListItemIcon>
                        <ListItemText>Home</ListItemText>
                    </ListItem>
                    <Divider/>
                    <ListItem button component={Link} to='/products'>
                        <ListItemIcon><ViewHeadline/></ListItemIcon>
                        <ListItemText>Products</ListItemText>
                    </ListItem>
                    <ListItem button disabled>
                        <ListItemIcon><ColorLens/></ListItemIcon>
                        <ListItemText>Stores</ListItemText>
                    </ListItem>
                    <ListItem button disabled>
                        <ListItemIcon><Category/></ListItemIcon>
                        <ListItemText>Options</ListItemText>
                    </ListItem>
                    <Divider/>
                    <ListItem button onClick={this.logout.bind(this)}>
                        <ListItemIcon><ExitToApp/></ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </ListItem>

                </List>
            </div>
        )
    }

    render() {
        return (
            <div>
                <Drawer open={this.props.open} onClose={this.props.closeDrawer}>
                    {this.sideList()}
                </Drawer>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        auth: state.auth.token.auth_token,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            dispatch(logout());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TempDrawer);