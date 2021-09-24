import React, { useState, useEffect} from 'react';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';

function App() {
  //create state
  //empty array which gets filled when we make request
  const [images, setImages] = useState([]);
  //once we are done fetching we can set it to false
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=23539789-a55746300d6f9fa5025c9db84&q=${term}&image_type=photo&pretty=true`)
      .then(res=> res.json())
      .then(data=> {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch(err=>console.log(err));
  }, [term]);

  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text) => setTerm(text)}/>

      {!isLoading && images.length ===0 && <h1 className="text-6xl text-center mx-auto mt-32">No images found</h1>}

      {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1>: <div className="grid grid-cols-3 gap-4">
        {images.map(image => (
          <ImageCard key={image.id} image={image}/>
        ))}
      </div>}

    </div>
  );
}

export default App;
