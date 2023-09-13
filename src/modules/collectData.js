import { dataList as albumQueries }  from '../data/data'

function collectData(diff) {
    let numberOfAlbums = 0;
    if(diff === 'hard') {
        numberOfAlbums = 12;
    }else if(diff === 'med') {
        numberOfAlbums = 8;
    } else {
        numberOfAlbums = 6;
    }
    let indexArray = [];
    while(indexArray.length < numberOfAlbums) {
        let tempIndx = Math.floor(Math.random() * albumQueries.length);
        if(indexArray.indexOf(tempIndx) === -1) {
            indexArray.push(tempIndx);
        } 
    }
    let selectedQueries = [];
    while(indexArray.length > 0) {
        selectedQueries.push(albumQueries[indexArray.pop()]);
        indexArray.length;
    }
    return fetchAlbumInfo(selectedQueries);
}


async function fetchAlbumInfo(selectedQueries) {  
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_API_DEEZER_KEY,
      'X-RapidAPI-Host': import.meta.env.VITE_HOST_KEY,
    }
  };

  const covers = []
  await Promise.all(selectedQueries.map(async (query) => {
    try{
      const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`;
      const data = await fetch(url, options);
      const result = await data.json();
      covers.push(result.data[0].album);
    }
    catch (error) {
      console.log(error.message);
    }
  }));
  // setAlbumInfo(covers);
  // setLoading(false);
  return covers;
}

export { collectData }