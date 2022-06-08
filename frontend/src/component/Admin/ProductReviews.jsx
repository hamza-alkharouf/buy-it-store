import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productReviews.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@mui/icons-material/Delete";
import Star from "@mui/icons-material/Star";

import SideBar from "./Sidebar";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import { useTranslation } from 'react-i18next';

const ProductReviews = ({ history }) => {
  const dispatch = useDispatch();
  const [t, i18n]= useTranslation();

  const alert = useAlert();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );
    console.log(reviews)
  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      history.push("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, history, isDeleted, productId]);

  const columns = [
    { field: "id", headerName: t('Review ID'), minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: t('User'),
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: t('Comment'),
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: t('Rating'),
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
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
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
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

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className="dashboard margin">
        <SideBar />
        <div className="">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">{t('ALL REVIEWS')}</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder={t('Product ID')}
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              className="buttonProcess"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              {t('Search')}
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">{t('No Reviews Found')}</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
