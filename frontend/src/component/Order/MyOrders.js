import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@mui/icons-material/Launch";
import { useTranslation } from 'react-i18next';

const MyOrders = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);
  const [t, i18n]= useTranslation();
  
  const columns = [
    { field: "id", headerName: t('Order ID'), minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: t('Status'),
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: t('Items Qty'),
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: t('Amount'),
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
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: t(item.orderStatus),
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />

      <div className="margin">
          <h1 className="m-3">{t('My Orders')}</h1>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="m-5">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            
            autoHeight
          />

        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
