import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./product.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import { useTranslation } from 'react-i18next';

const ProductList = ({ history }) => {
    const dispatch = useDispatch();
    const [t, i18n]= useTranslation();

    const alert = useAlert();
  
    const { error, products } = useSelector((state) => state.products);
  
    const { error: deleteError, isDeleted } = useSelector(
      (state) => state.product
    );
  
    const deleteProductHandler = (id) => {
      dispatch(deleteProduct(id));
    };
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (deleteError) {
        alert.error(deleteError);
        dispatch(clearErrors());
      }
  
      if (isDeleted) {
        alert.success("Product Deleted Successfully");
        history.push("/admin/dashboard");
        dispatch({ type: DELETE_PRODUCT_RESET });
      }
  
      dispatch(getAdminProduct());
    }, [dispatch, alert, error, deleteError, history, isDeleted]);
  
    const columns = [
      { field: "id", headerName: t('Product ID'), minWidth: 200, flex: 0.5 },
  
      {
        field: "name",
        headerName: t('Name'),
        minWidth: 350,
        flex: 1,
      },
      {
        field: "stock",
        headerName: t('Stock'),
        type: "number",
        minWidth: 150,
        flex: 0.3,
      },
  
      {
        field: "price",
        headerName:t('Price'),
        type: "number",
        minWidth: 270,
        flex: 0.5,
      },
  
      {
        field: "actions",
        flex: 0.3,
        headerName: t('Actions'),
        minWidth: 150,
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <Fragment>
              <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                <EditIcon />
              </Link>
  
              <Button
                onClick={() =>
                  deleteProductHandler(params.getValue(params.id, "id"))
                }
              >
                <DeleteIcon />
              </Button>
            </Fragment>
          );
        },
      },
    ];
  
    const rows = [];
  
    products &&
      products.forEach((item) => {
        rows.push({
          id: item._id,
          stock: item.Stock,
          price: item.price,
          name: item.name,
        });
      });
  
    return (
      <Fragment>
        <MetaData title={`ALL PRODUCTS - Admin`} />
  
        <div className="dashboard margin">
          <SideBar />
          <div className="productListContainer">
            <h1 id="productListHeading">{t('ALL PRODUCTS')}</h1>
  
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          </div>
        </div>
      </Fragment>
    );
  };
  

export default ProductList;
