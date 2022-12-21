import './App.css'
import { useState } from 'react';
import axios from 'axios';
import Loader from './components/Loader';

function App() {

   const [data, setData] = useState({
     prompt : '',
     size : ''
   });
   const [loading, setLoading] = useState(false)
   const [image, setImage] = useState()

   const handleChange = (event) => {
    const { name, value } = event.target;

    setData ({
      ...data, [name] : value
    })
   }

   const generateImageRequest = async () => {
    const details = {
      prompt : data.prompt,
      size  : data.size
    }
        setLoading(true)
      try {
        const res = await axios.post('http://localhost:5000/openai/generateimage', details)
           setImage(res.data.data)
      } 
      catch (error) {
        console.log(error);
      }
      finally {
        setLoading(false)
      }
   }

  const handleSubmit = (e) => {
    e.preventDefault()

   generateImageRequest();
    
  }

  return (
    <div className='ml-8 mt-44'>
      <form onSubmit = {handleSubmit}>
        <div>
        <input
         name = 'prompt'
         className='mt-6 border border-black'
         type = 'text'
         value = {data.prompt}
         onChange = {handleChange}
         />

        </div>
      <div>
      <select 
        name="size"  
        className='border border-black mt-5 px-5'        
        type = 'text'
        value = {data.size}
        onChange = {handleChange}>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
      </div>
      <button type='submit' className='border bg-black text-white'> generate </button>
      </form>
      <div>
       {loading ?  <Loader />  :  <img src= {image} alt=""  /> }
        </div>
    </div>
  )
}

export default App
