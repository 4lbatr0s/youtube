import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { userRequest } from "../../redux/requestMethods";
import { useEffect } from "react";

export default function Product() {

    //INFO: How to get product id from url!
    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const [productStats, setProductStats] = useState([]);
    const product = useSelector((state) => 
    state.product.products.find(product => product._id === productId));
    

    const MONTHS = useMemo(
        () => [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Agu",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        []
      );


      useEffect(() => {
        const getStats = async () => {
          try {
            const response = await userRequest.get("/orders/income?pid="+productId);
            const list = response.data.sort((a,b)=> a._id - b._id)
            list.map((item) => {
              setProductStats((prev) => [
                ...prev,
                { name: MONTHS[item._id  - 1], Sales:item.total }, //INFO: How to convert month ids to month names!
              ]);
            });
          } catch (error) {
            console.log(error);
          }
        };
    
        getStats();
      }, []);
    


  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={productStats} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={product && (product.image || "")} alt="" className="productInfoImg" />
                  <span className="productName">{product.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{product._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">in stock:</span>
                      <span className="productInfoValue">{product.inStock ? "Yes" : "No"}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Product Name</label>
                  <input type="text" placeholder={product.title} />
                  <label>Product Description</label>
                  <input type="text" placeholder={product.description} />
                  <label>Product Price</label>
                  <input type="text" placeholder={product.price} />
                  <label>In Stock</label>
                  <select name="inStock" id="idStock">
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                  </select>
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="productUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  <button className="productButton">Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
