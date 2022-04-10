import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function ProductItem() {
  const data1 = JSON.parse(localStorage.getItem("items"));
  const { id } = useParams();
  const [cnt, setCnt] = useState(0);
  const [value,setValue]=useState(data1)
  const [post, setPost] = useState([]);

 
  const url = `https://fakestoreapi.com/products`;
  useEffect(() => {
    axios.get(`${url}`).then((res) => {
      setPost(res.data);
     
     
    });
  }, []);
  const RemoveHandler=(id)=>{
    const remove=value.filter((i)=>i.id!==id)
    setValue(remove)
   const items= localStorage.setItem("items",JSON.stringify(remove))
  
   
   
  }

  const Increment = (id) => {
   value.map((i)=>{
     if(i.id===id){
       return{...i,quantity:i.id+1}
     }
     return i
   })
    localStorage.setItem("quantity", JSON.stringify(cnt));
    //localStorage.getItem("quantity");
  };
  const Decrement = (id) => {
    if (cnt > 0) {
      const decrement = value.filter((each) => each.id === id);
      setCnt(prev=>prev-1);
      localStorage.setItem("quantity", JSON.stringify(cnt));
     // localStorage.getItem("quantity");
    }
  };

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
                Cart
              </Link>

              <a class="nav-link" href="#">
                Pricing
              </a>
              <a class="nav-link disabled">Disabled</a>
            </div>
          </div>
        </div>
      </nav>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Category</th>
            <th scope="col">Quantity</th>
          

          </tr>
        </thead>
        {data1?.map((a, i) => {
          return (
            <>
              <tbody>
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{a.title}</td>
                  <td>{a.price}</td>
                  <td>{a.category}</td>
                  <td>
                    <lable>
                      <button
                        class="btn btn-secondary "
                        onClick={()=>Increment(a.id)}
                        style={{ margin: "15px" }}
                      >
                        +
                      </button>
                      {cnt}
                      <button
                        onClick={()=>Decrement(a.id)}
                        class="btn btn-secondary "
                        style={{ margin: "15px" }}
                      >
                        -
                      </button>
                    </lable>

                    <button
                    onClick={()=>RemoveHandler(a.id)}
                        class="btn btn-danger "
                        style={{ margin: "10px" }}
                      >
                        X
                      </button>
                  </td>
                </tr>
              </tbody>
            </>
          );
        })}
      </table>
    </>
  );
}

export default ProductItem;
