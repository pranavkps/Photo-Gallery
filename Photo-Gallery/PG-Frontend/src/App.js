import React,{useState } from 'react';
import './App.css';
import Images from './display_images';
import Image from './add_image';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios';
import './display-images.css'

function App() {
  const [search,setSearch] = useState("");
  const [images, setImages] = useState([]);
  const [onSearch,setOnSearch] = useState(false);
  const [error,setError] = useState('');
  const submitHandler =async (e)=>{
    e.preventDefault();
    setOnSearch(true);
    try {
      const res = await axios
        .get('http://localhost:5000/search',search)
        setImages(res.data);
    } catch (error) {
      console.error(error);
      setError('NO Search Found');
    }
  };

  return (
    <div>
      <div className='container'>
      <div className='add-img'>
        <div>
          <Popup trigger = {<button id='btn'>Add Image</button>} modal nested >
          {
            close =>(
              <div className='popup'>
                <button id='btn' onClick={()=>close()}>Close Tab</button>
                <Image/>
              </div>
            )
          } 
          </Popup>
        </div>
        <div className='search-bar'>
          <form onSubmit={submitHandler}>
            <input 
              type='text'
              name ='search'
              value={search}
              placeholder='Search by tag name'
              onChange={(event)=>{
                setSearch(event.target.value);
              }}
            />
            <button id='btn'> search</button>
          </form>
        </div>
      </div>
      </div>
      <div className='display-box'>
        { !onSearch ?  
          <Images/> : 
          <div className="middle">
            <center><h3>Here..! There Are Some Pictures For You ;)</h3></center>
              <div className="display">
                {images.map((image) => (
                  <div key={image._id} className="container1">
                    <img src={image.file} alt="" />
                    <p key={image._id}>{image.tags}</p>
                  </div>
                ))}
              </div>
          </div>
        }
        <div className='display'>
        {error && <div className="error">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
