import React from "react";
import {connect} from 'react-redux';
import {login} from '../../actions/login';
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: {
                username: '',
                password: ''
            }
        };
    }

    async login() {
        await this.props.login(
            this.state.login,
            this.props.history,
            this.props.location.state ?
                this.props.location.state.from.pathname :
                "/"
        );
    }

    onInputChange(evt) {
        this.setState(
            {
                login: {
                    ...this.state.login,
                    [evt.currentTarget.name]: evt.currentTarget.value
                }
            }
        )
    }

    render() {
        return (
            <div>
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    style={{minHeight: 'calc(100vh - 64px)'}}
                >
                    <Grid item xs={2}>
                        <div>{this.props.auth}</div>
                        <Card id="card">
                            <CardContent>
                                <ValidatorForm
                                    ref="form"
                                    onSubmit={this.login.bind(this)}
                                >
                                    {this.props.error &&
                                        <div style={{color: 'red', fontSize: 14}}>{this.props.error}</div>
                                    }
                                    <TextValidator
                                        label={"Username"}
                                        name="username"
                                        style={{marginBottom: 10}}
                                        value={this.state.login.username}
                                        onChange={this.onInputChange.bind(this)}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                    />
                                    <TextValidator
                                        label={"Password"}
                                        name="password"
                                        type="password"
                                        value={this.state.login.password}
                                        style={{marginBottom: 20}}
                                        onChange={this.onInputChange.bind(this)}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                    />
                                    <Button
                                        fullWidth={true}
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        {!this.props.loading ? (
                                            <span>Entrar</span>
                                        ) : (
                                            <CircularProgress size={25} style={{color: "#ffffff"}}/>
                                        )}
                                    </Button>
                                </ValidatorForm>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        auth: state.auth.token,
        loading: state.auth.loading,
        error: state.auth.error,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        login: (data, history, oldPath) => {
            dispatch(login(data, history, oldPath));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginScreen);
