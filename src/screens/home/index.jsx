import React from "react";
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import Grid from "@material-ui/core/Grid";

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (<div>
            <Grid
                container
                justify="center"
                alignItems="center"
            >
                <Grid item xs={4}>
                    <h3>Welcome to the home page</h3>
                    <h4>Go to companies page to see the companies registered.</h4>
                    <h5>(Click in the menu and select companies)</h5>
                </Grid>
            </Grid>
        </div>)
    }
}

const mapStateToProps = function (state) {
    return {
        auth: state.auth.token.auth_token,
        loading: state.auth.loading,
    }
};

export default withRouter(connect(
    mapStateToProps,
    null
)(HomeScreen));
