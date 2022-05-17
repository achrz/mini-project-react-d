import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { NavLink } from "react-router-dom";

const Product = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
        console.log(filter);
      }
      return () => {
        componentMounted = false;
      };
    };
    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  const filterProduct = (kategori) => {
    const updateListnya = data.filter(
      (hasilFilter) => hasilFilter.category === kategori
    );
    setFilter(updateListnya);
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <div
            className="btn btn-outline-dark me-2"
            onClick={() => setFilter(data)}
          >
            All
          </div>
          <div
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("men's clothing")}
          >
            For Men
          </div>
          <div
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("women's clothing")}
          >
            For Women
          </div>
          <div
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelery
          </div>
          <div
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronic
          </div>
        </div>
        {filter.map((product) => {
          return (
            <>
              <div className="col-md-3 mb-4">
                <div className="card h-00 text-center p-5" key={product.id}>
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                    height="200px"
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-0">
                      {product.title.substring(0, 13)} ...
                    </h5>
                    <p className="card-text lead fw-bold">
                      Rp {product.price * 14600}
                    </p>
                    <p className="card-text lead fw-bold">
                      {product.rating && product.rating.rate}
                      <i className="fa fa-star"></i>
                    </p>
                    <NavLink
                      to={`/products/${product.id}`}
                      className="btn btn-outline-dark "
                    >
                      Buy Now
                    </NavLink>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };
  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Latest Product</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </div>
  );
};

export default Product;
