import React,{useState} from 'react';
import './add-image.css';
import axios from 'axios';

const Image = ()=>{

  const [formData, setFormData] = useState({ file: '', tags: '' });
  const [error,setError] = useState();
  const [message,setMessage] = useState();

  const handleChange = (event) => {
    var { name, value } = event.target;
    if(name === 'file'){ 
      const f = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(f);
      reader.onloadend = () => {
        value = reader.result
        setFormData({ ...formData, [name]: value });
      };
    }
    else{
      setFormData({ ...formData, [name]: value });
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(formData);
    try {
      const  data  = await axios.post('http://localhost:5000/upload', formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(data);
      setMessage("Your Image Has Been Successfully Added");
    } catch (error) {
      console.error(error);
      setError('Something Went Wrong');
    }
  };

  return(
    <div className='add-image'>
      <form onSubmit={handleSubmit}>
        <h3>Please add your IMAGE</h3>
        <input
          type="file"
          name="file"
          required
          onChange={handleChange}
        />
        <input
          id='text'
          type='text'
          name='tags'
          placeholder='Add tags to your IMAGE'
          onChange={handleChange}
        />
        {error && <div className="error">{error}</div>}
        <button id='btn' type="submit">Upload</button>
        {message && <div className="msg">{message}</div>}
      </form>
    </div>
  );
}
export default Image;