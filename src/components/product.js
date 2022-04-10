import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

function Product() {
   const data = JSON.parse(localStorage.getItem("items")) || [];
  const [post, setPost] = useState([]);
  const [add, setAdd] = useState([]);
  const [cnt, setCnt] = useState(0);
  const [disable,setDisable]=useState(false)

  const navigate = useNavigate();

  const url = `https://fakestoreapi.com/products`;
  useEffect(() => {
    axios.get(`${url}`).then((res) => {
      setPost(res.data);
      console.log(res.data);
    });
  }, []);

  const ClickHandler = (id) => {
    console.log(id);

    alert("product added!", id);
    const value = post.filter((i) => i.id === id);
    console.log(value);
    add.push(...value);
    setCnt(cnt+1)
  
    //console.log("false")
    localStorage.setItem("items", JSON.stringify(add));
   
    //navigate(`/product/${post.id}`);
  };

 
  console.log(post);
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Navbar
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <Link class="nav-link active" aria-current="page" to="/">
                Home
              </Link>

              <Link class="nav-link" to="/product">
                Cart({cnt})
              </Link>

              <a class="nav-link" href="#">
                Pricing
              </a>
              <a class="nav-link disabled">Disabled</a>
            </div>
          </div>
        </div>
      </nav>

      <div class="row p-5 row-cols-1 row-cols-md-3 g-4">
        {post?.map((a, i) => {
          console.log(a.id);
          return (
            <div class="col p-5 " key={a.id}>
              <div class="card p-5">
                <div class="card-body">
                  <h5 class="card-title">
                    {a.title ? a.title.slice(0, 45) : ""}
                  </h5>
                  <img src={a.image} class="card-img-top" alt="..."></img>
                  <h6 class="card-title">Price:${a.price}</h6>
                  <h6 class="card-title">Rating:${a.rating.rate}</h6>
                  <p class="card-text">
                    {a.description ? a.description.slice(0, 85) : ""}
                  </p>

                  <h6 class="card-title">{a.category}</h6>
                  <button
                    disabled={disable}
                    onClick={() => ClickHandler(a.id)}
                    class="btn btn-primary"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Product;
