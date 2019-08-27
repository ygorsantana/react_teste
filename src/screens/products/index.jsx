import React from "react";
import Grid from "@material-ui/core/Grid";
import MUIDataTable from "mui-datatables";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getProducts} from "../../actions/products";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import EditProductDialog from "../../components/EditProduct";

class ProductsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            openEditProductDialog: false,
            uuid: ""
        };
    }

    componentDidMount() {
        this.props.getProducts();
    }

    onRowClick = (row, i) => {
        const id = this.props.products[i.rowIndex] ? this.props.products[i.rowIndex].id : null;
        this.openEditProductDialog(id);
        // console.log(id);
    };

    openEditProductDialog(id) {
        // console.log(this.state.openEditProductDialog);
        this.setState(
            {openEditProductDialog: !this.state.openEditProductDialog, uuid: id}
        )
    }

    render() {
        let {products} = this.props;
        const columns = [
            {
                name: "name",
                label: "Name",
                options: {
                    filter: false,
                    sort: true,
                },
            },
            {
                name: "code",
                label: "Código",
                options: {
                    filter: false,
                    sort: true,
                }
            },
            {
                name: "store",
                label: "Loja",
                options: {
                    filter: true,
                    sort: true,
                }
            }
        ];
        const options = {
            filterType: "dropdown",
            responsive: "stacked",
            print: false,
            pagination: true,
            rowsPerPageOptions: [10, 30, 45],
            downloadOptions: {
                filename: 'products.csv',
                separator: ';'
            },
            serverSide: false,
            count: this.props.count,
            onRowClick: this.onRowClick,
        };

        // console.log(products);
        if (products) {
            products = products.map((product) => {
                return {
                    name: product.name,
                    code: product.code,
                    store: product.store.name
                }
            });
        } else {
            products = [];
        }
        return (
            <div>
                <Grid container>
                    <Grid item xs={12}>
                        <MUIDataTable
                            title={
                                <Typography variant="h4">
                                    {this.props.isLoading ?
                                        <CircularProgress style={{marginLeft: 15, position: 'relative', top: 4}}/> :
                                        "Products list"
                                    }
                                </Typography>
                            }
                            data={products}
                            columns={columns}
                            options={options}
                        />
                    </Grid>
                </Grid>
                {
                    this.state.uuid && this.state.openEditProductDialog &&
                        <EditProductDialog
                            open={this.state.openEditProductDialog}
                            onClose={this.openEditProductDialog.bind(this)}
                            uuid={this.state.uuid}
                        />
                }
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    // console.log(state.products);
    return {
        products: state.products.products.results,
        count: state.products.count,
        isLoading: state.products.loading,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getProducts: () => {
            dispatch(getProducts());
        }
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductsScreen));
