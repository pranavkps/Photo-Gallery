import React, { useState, useEffect } from "react";
import './display-images.css';
import axios from "axios";

const Images = () => {
  const [images, setImages] = useState([]);
  const [error,setError] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:5000/get")
      .then((res) => {
        console.log(res.data);
        setImages(res.data);
      })
      .catch((err) =>{ 
        console.log(err);
        setError("Can'fetch Images / NO Images Found");
      });
  }, []);

  setTimeout(()=>{
    setError("")
  },10000);

  return (
    <div className="middle">
      <center><h3>Here..! There Are Some Pictures For You ;)</h3></center>
      <div className="display">
      {error && <div className="error">{error}</div>}
      {images.map((image) => (
        <div key={image._id} className="container1">
          <img src={image.file} alt="" />
          <p key={image._id}>{image.tags}</p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Images;