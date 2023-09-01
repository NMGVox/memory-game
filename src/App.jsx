import { useState, useEffect } from 'react'
import { dataList as albums }  from './data/data'
// import Timer from './components/timer'
import './App.css'

function App() {
  const [albumInfo, setAlbumInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  function fetchAlbumInfo() {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'c78f458c76msh16d4ce41cccd8ddp17bd48jsn04deb672eb9d',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
      }
    };
    const covers = []
    albums.map(async (album) => {
      try{
        const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${album}`;
        const data = await fetch(url, options);
        const result = await data.json();
        covers.push(result.data[0].album);
        setAlbumInfo(covers);
      }
      catch (error) {
        console.log(error.message);
      }
    });
  }


  useEffect(() => {
    fetchAlbumInfo()
    setLoading(false);
  }, [])

  function cardClicked(e, cardId) {
    console.log(cardId);
  }


  return (
    <div className="imageGrid">
      {loading && <h1>Loading</h1>}
      {!loading && albumInfo.map((album) => (
        <button onClick={(e) => cardClicked(e, album.id)} key={album.id} className="albumWrapper">
          <img src={album.cover_medium} alt="" />
          <h1>{album.title}</h1>
        </button>
      ))}
    </div>
  )
}

export default App
