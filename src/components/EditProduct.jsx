import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import {api} from "../api/api";
import {getProduct} from "../actions/products";
import {connect} from "react-redux";
import Switch from "@material-ui/core/Switch";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";

class EditProductDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: this.props.product || {},
            variants: [
                {
                    "id": "ee74cc45-65d2-4b2c-8462-08f797c1468a",
                    "name": "Sku teste 1",
                    "master": 0,
                    "code": "1-1",
                    "color": "",
                    "size": "PP",
                    "price": "249.90",
                    "amount": 0,
                    "extra": null,
                    "product": {
                        "id": "d4ffe007-07c4-40db-9587-6fa880b68d87",
                        "created_at": "2019-08-09T17:01:31.168121Z",
                        "updated_at": "2019-08-12T18:58:02.207678Z",
                        "name": "Teste 1",
                        "middleware_name": "stesta",
                        "code": "1",
                        "stock_control": true,
                        "ean_code": null,
                        "extra_fields": null,
                        "is_active": false,
                        "store": "a0688ca4-3b73-491d-aacb-98d2ef36ad68",
                        "category": null
                    }
                },
                {
                    "id": "ee74cc45-65d2-4b2c-8462-08f797c1468a",
                    "name": "Sku teste 1",
                    "master": 0,
                    "code": "1-1",
                    "color": "",
                    "size": "P",
                    "price": "249.90",
                    "amount": 0,
                    "extra": null,
                    "product": {
                        "id": "d4ffe007-07c4-40db-9587-6fa880b68d87",
                        "created_at": "2019-08-09T17:01:31.168121Z",
                        "updated_at": "2019-08-12T18:58:02.207678Z",
                        "name": "Teste 1",
                        "middleware_name": "stesta",
                        "code": "1",
                        "stock_control": true,
                        "ean_code": null,
                        "extra_fields": null,
                        "is_active": false,
                        "store": "a0688ca4-3b73-491d-aacb-98d2ef36ad68",
                        "category": null
                    }
                },
                {
                    "id": "ee74cc45-65d2-4b2c-8462-08f797c1468a",
                    "name": "Sku teste 1",
                    "master": 0,
                    "code": "1-1",
                    "color": "",
                    "size": "M",
                    "price": "249.90",
                    "amount": 0,
                    "extra": null,
                    "product": {
                        "id": "d4ffe007-07c4-40db-9587-6fa880b68d87",
                        "created_at": "2019-08-09T17:01:31.168121Z",
                        "updated_at": "2019-08-12T18:58:02.207678Z",
                        "name": "Teste 1",
                        "middleware_name": "stesta",
                        "code": "1",
                        "stock_control": true,
                        "ean_code": null,
                        "extra_fields": null,
                        "is_active": false,
                        "store": "a0688ca4-3b73-491d-aacb-98d2ef36ad68",
                        "category": null
                    }
                }
            ]
        }
    }

    componentDidMount() {
        this.props.getProduct(this.props.uuid);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.product.id !== this.props.product.id) {
            this.setState({product: this.props.product})
        }
    }

    onInputChange(evt) {
        this.setState({
            product: {
                ...this.state.product,
                [evt.currentTarget.name]: evt.currentTarget.value,
            }
        })
    }

    onInputChangeVariant = (index) => (evt) => {
        let variants = [...this.state.variants];
        variants[index] = {
            ...variants[index],
            [evt.currentTarget.name]: evt.currentTarget.value,
        };
        this.setState({
            variants: variants
        });
    };

    handleIsActive() {
        this.setState({
            product: {
                ...this.state.product,
                is_active: !this.state.product.is_active,
            }
        })
    }

    submitValues = async () => {
        const token = window.localStorage.getItem('token');
        const client = await api(token).getClient();
        await client.products_update({id: this.state.product.id}, {
            ...this.state.product
        }).then(() => {
            this.props.onClose();
        })
    };

    submitValuesVariants = async () => {
        const token = window.localStorage.getItem('token');
        const client = await api(token).getClient();
        await this.state.variants.map(async (variant) => {
            await client.skus_update({id: variant.id}, {
                ...variant
            })
        });
        this.props.onClose();
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.onClose}
                    maxWidth={"sm"}
                    fullWidth={true}
                    scroll={'paper'}
                >
                    {
                        // this.props.product && !this.props.isLoading &&
                        this.props.isLoading ?
                            <div
                                align={'center'}
                                style={{marginTop: 250, marginBottom: 250}}
                            >
                                <CircularProgress
                                    size={50}
                                    style={{position: 'relative'}}
                                />
                            </div>
                            :
                            <React.Fragment>
                                <DialogTitle align={'center'}>Atualizando produto.</DialogTitle>
                                <Divider/>
                                <ValidatorForm
                                    ref="form"
                                    onSubmit={this.submitValues}
                                >
                                    <DialogContent>
                                        <DialogContentText>
                                            Produto
                                        </DialogContentText>
                                        <TextValidator
                                            style={{marginTop: 10}}
                                            disabled
                                            label="Name"
                                            name="name"
                                            value={this.state.product.name}
                                            fullWidth
                                        />
                                        <TextValidator
                                            style={{marginTop: 10}}
                                            label="Middleware Name *"
                                            name="middleware_name"
                                            value={this.state.product.middleware_name || ""}
                                            onChange={this.onInputChange.bind(this)}
                                            fullWidth
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                        />
                                        <TextValidator
                                            style={{marginTop: 10}}
                                            label="Category *"
                                            name="category"
                                            value={this.state.product.category || ""}
                                            onChange={this.onInputChange.bind(this)}
                                            fullWidth
                                            maxLength={4}
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                        />
                                        <TextValidator
                                            style={{marginTop: 10}}
                                            disabled
                                            label="Images"
                                            name="images"
                                            value={"Not implemented yet, this feature will be implemented on future."}
                                            fullWidth
                                        />
                                        <div
                                            style={{marginTop: 10}}
                                        >
                                            Active:
                                            <Switch
                                                checked={this.state.product.is_active}
                                                onChange={this.handleIsActive.bind(this)}
                                                value={this.state.product.is_active || false}
                                                color="primary"
                                                inputProps={{'aria-label': 'primary checkbox'}}
                                            />
                                        </div>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={this.props.onClose} color="primary">
                                            Cancel
                                        </Button>
                                        <Button color="primary" type="submit">
                                            Save
                                        </Button>
                                    </DialogActions>
                                </ValidatorForm>
                                <Divider/>
                                <ValidatorForm
                                    ref="form"
                                    onSubmit={this.submitValuesVariants}
                                >
                                    {
                                        this.state.variants.map(
                                            (item, index) => {
                                                return (
                                                    <div
                                                    key={index}
                                                    >
                                                        <DialogContent>
                                                            <DialogContentText>
                                                                Variante {index + 1}
                                                            </DialogContentText>
                                                            <TextValidator
                                                                style={{marginTop: 10}}
                                                                disabled
                                                                label="Name"
                                                                name="name"
                                                                value={item.name}
                                                                fullWidth
                                                            />
                                                            <TextValidator
                                                                style={{marginTop: 10}}
                                                                disabled
                                                                label="Code"
                                                                name="Code"
                                                                value={item.code}
                                                                fullWidth
                                                            />
                                                            <TextValidator
                                                                style={{marginTop: 10}}
                                                                label="Color *"
                                                                name="color"
                                                                value={item.color || ""}
                                                                onChange={this.onInputChangeVariant(index).bind(this)}
                                                                fullWidth
                                                                validators={['required']}
                                                                errorMessages={['this field is required']}
                                                            />
                                                            <TextValidator
                                                                style={{marginTop: 10}}
                                                                label="Size *"
                                                                name="size"
                                                                value={item.size || ""}
                                                                onChange={this.onInputChangeVariant(index).bind(this)}
                                                                fullWidth
                                                                validators={['required']}
                                                                errorMessages={['this field is required']}
                                                            />
                                                            <TextValidator
                                                                style={{marginTop: 10}}
                                                                disabled
                                                                label="Price"
                                                                name="price"
                                                                value={item.price}
                                                                fullWidth
                                                            />
                                                            <TextValidator
                                                                style={{marginTop: 10}}
                                                                disabled
                                                                label="Quantity"
                                                                name="amount"
                                                                value={item.amount}
                                                                fullWidth
                                                            />
                                                        </DialogContent>
                                                        <Divider/>
                                                    </div>
                                                )
                                            }
                                        )
                                    }
                                    <DialogActions>
                                        <Button onClick={this.props.onClose} color="primary">
                                            Cancel
                                        </Button>
                                        <Button color="primary" type="submit">
                                            Save
                                        </Button>
                                    </DialogActions>
                                </ValidatorForm>
                            </React.Fragment>
                    }
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        product: state.products.product,
        isLoading: state.products.loading,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getProduct: (uuid) => {
            dispatch(getProduct(uuid));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditProductDialog);
