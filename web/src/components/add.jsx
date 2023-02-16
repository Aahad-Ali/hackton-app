import React from 'react';
import "./add.css"
import "../App.css"
import { useState ,useEffect} from "react";
import axios from "axios";




let baseUrl = "";
if (window.location.href.split(":")[0] === "http") {
    baseUrl = `http://localhost:5001`;
} else {
    baseUrl = `https://awful-lingerie-fox.cyclic.app/`;
}




const Add = () => {


    const [productName, setproductName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setdescription] = useState("");
    const [unit, setUnit] = useState("");
    const [price, setPrice] = useState("");

    const productHandler = async (e) => {
        e.preventDefault();


        try {
            let response = await axios.post(`${baseUrl}/api/v1/add`, {
                productName: productName,
                category: category,
                description: description,
                unit: unit,
                price: price,
            });

            console.log("product add successful");
            alert("product add Successfully")
            // setResult("signup successful");
        } catch (e) {
            console.log("e: ", e);
        }
    }


    useEffect(() => {

        // Add a request interceptor
        axios.interceptors.request.use(function (config) {
          // Do something before request is sent
          config.withCredentials = true;
          return config;
        }, function (error) {
          // Do something with request error
          return Promise.reject(error);
        });
    
        // Add a response interceptor
        axios.interceptors.response.use(function (response) {
          // Any status code that lie within the range of 2xx cause this function to trigger
          // Do something with response data
          return response;
        }, function (error) {
          // Any status codes that falls outside the range of 2xx cause this function to trigger
          // Do something with response error
        //   if (error.response.status === 401) {
        //     dispatch({
        //       type: 'USER_LOGOUT'
        //     })
        //   }
          return Promise.reject(error);
        });
      }, [])


    return (
        <div className='main-add'>
            <form id='add-product' onSubmit={productHandler}>
                <h1>Add Product</h1>

                <input type="text" placeholder='product name'
                    onChange={(e) => {
                        setproductName(e.target.value);
                    }} />
                <select placeholder='select catecory' onChange={(e) => {
                    setCategory(e.target.value);
                }}>
                    <option></option>
                    <option value="Fruit">Fruit</option>
                    <option value="Vagatable">Vagatable</option>
                    <option value="Meet">Meet</option>
                </select>
                <textarea cols="40" rows="5" placeholder='description' onChange={(e) => {
                    setdescription(e.target.value);
                }}></textarea>
                <input type="text" placeholder='KG/LITER/DOZEN' onChange={(e) => {
                    setUnit(e.target.value);
                }} />
                <input type="number" placeholder='product price' onChange={(e) => {
                    setPrice(e.target.value);
                }} />
                <button type='submit'>Add Product</button>

            </form>
        </div>
    )
}
export default Add;