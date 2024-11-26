
import { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios';

function App() {
  const [jokes, setjokes] = useState([]); 
  useEffect(() => {
    axios.get('/api/jokes')
    .then((response) => {
      // console.log(response);
      
      setjokes(response.data);
    })
    .catch((error) => {
      console.log("Response error", error);
      
    });
    
  })


  return (
    <>
    <h1>Backend Test and Learning</h1>
    <p>Jokes : {jokes.length} </p>

    {
      jokes.map((joke, index) => (
        <div key = {joke.id}>
          <h3>{joke.title}</h3>
          <p>{joke.content}</p>
        </div>
      ))
    }
    </>
  )
}

export default App
