import React, { Fragment, useEffect, useState } from "react";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import ReviewCard from "./ReviewCard";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import Loader from "../layout/Loader/Loader";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { Carousel } from "react-bootstrap";
import { getCategoryDetails, clearErrorsCategory } from "../../actions/categoryAction";
import { useTranslation } from 'react-i18next';


const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [t, i18n]= useTranslation();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { category, loadingCategory, errorCategory } = useSelector(
    (state) => state.categoryDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );


  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [counter, setCounter] = useState(0);

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };


  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantity));
    alert.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  if (product.category && counter === 0) {
    dispatch(getCategoryDetails(product.category))
    setCounter(1)
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (errorCategory) {
      alert.error(errorCategory);
      dispatch(clearErrorsCategory());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(match.params.id));



  }, [dispatch, match.params.id, error, errorCategory, alert, reviewError, success]);

  return (

    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className="ProductDetails">
            <div>
              <Carousel>

                {product.images &&
                  product.images.map((item, i) => (
                    <Carousel.Item>
                      <img
                        className="CarouselImage"
                        key={i}
                        src={item.url}
                        alt={`${i} Slide`}
                      />
                    </Carousel.Item>
                  ))}

              </Carousel>



            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>{t('Product')} # {product._id}</p>
                <p >{t('category')} {category.name}</p>


              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} {t('Reviews')})
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`$${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <span className="span">{quantity}</span>
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                   {t('Add to Cart')} 
                  </button>
                </div>

                <p>
                {t('Status')}:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
              {t('Description :')} <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
              {t('Submit Review')}
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">{t('REVIEWS')}</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>{t('Submit Review')}</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
              {t('Cancel')}
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
              {t('Submit')}
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>

  );
};



export default ProductDetails;