import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
    clearErrorsCategory,
    getAllCategories,
    deleteCategory,
} from "../../actions/categoryAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { DELETE_CATEGORY_RESET } from "../../constants/categoryConstants";
import { useTranslation } from 'react-i18next';

const Categories = ({ history }) => {
    const dispatch = useDispatch();
    const [t, i18n]= useTranslation();
    
    const alert = useAlert();

    const { error, categories } = useSelector((state) => state.allCategories);

    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.category
    );

    const deleteCategoryHandler = (id) => {
        dispatch(deleteCategory(id));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrorsCategory());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrorsCategory());
        }

        if (isDeleted) {
            alert.success("Category Deleted Successfully");
            history.push("/admin/categories");
            dispatch({ type: DELETE_CATEGORY_RESET });
        }

        dispatch(getAllCategories());
    }, [dispatch, alert, error, deleteError, history, isDeleted]);

    const columns = [
        { field: "id", headerName: t('Category ID'), minWidth: 200, flex: 0.5 },

        {
            field: "name",
            headerName: t('Name'),
            minWidth: 350,
            flex: 1,
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
                        <Link to={`/admin/category/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteCategoryHandler(params.getValue(params.id, "id"))
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

    categories &&
        categories.forEach((item) => {
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
                    <h1 id="productListHeading">ALL categories</h1>

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


export default Categories;
