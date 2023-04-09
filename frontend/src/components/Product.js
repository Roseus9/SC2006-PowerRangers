import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { findBookmarks } from "../actions/bookmarkActions";
import { BOOKMARK_FIND_RESET } from "../constants/constants";
import axios from "axios";
function Product({ product }) {
  const pid = product._id;
  const dispatch = useDispatch();
  const findBookmarkState = useSelector((state) => state.findBookmark);
  const [likes, setLikes] = useState(0);
  // // useEffect(() => {
  // //   if (!findBookmarkState.done) dispatch(findBookmarks(pid));
  // // }, [pid]);

  // // useEffect(() => {
  // //   if (findBookmarkState.done) {
  // //     console.log(findBookmarkState);
  // //     setLikes(findBookmarkState.count);
  // //     dispatch({ type: BOOKMARK_FIND_RESET });
  // //   }
  // }, [findBookmarkState.done]);
  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(`/api/findbookmarks/${pid}`);
      const { count } = data;
      setLikes(count);
    };
    fetch();
  });
  return (
    <Card className="my-3 p-3 rounded" style={{ height: "504px" }}>
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant="top"
          style={{ height: "250px", objectFit: "cover" }}
        />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">
            <Rating value={product.rating} />
            {product.rating} from {product.numReviews} reviews
          </div>
        </Card.Text>
        <Card.Text
          as="h3"
          className={`my-3`}
          style={{ color: Number(product.price) === 0.0 ? "#F24E1E" : "" }}
        >
          {Number(product.price) === 0.0 ? "Free" : "$" + product.price}
        </Card.Text>
        <Button
          bg="secondary"
          style={{
            fontSize: "15px",
            backgroundColor: "#d3d3d3",
            color: "#000000",
            border: "none",
          }}
          disabled
        >
          <b>{likes}</b> ❤️
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Product;
