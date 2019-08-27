import React from 'react';
import './App.css';
import {connect} from "react-redux";
import Routes from "./container/routes";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDrawer: false
        };
    }

    toggleDrawer(open) {
        this.setState({openDrawer: !this.state.openDrawer})
    }

    render() {
        return (
            <div>
                <Routes openDrawer={this.state.openDrawer} toggleDrawer={this.toggleDrawer.bind(this)}
                        auth={this.props.auth}/>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        auth: state.auth.token,
        loading: state.auth.loading,
    }
};

export default connect(
    mapStateToProps,
    null
)(App);
