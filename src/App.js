
import { useState } from "react";
import './App.css';

function App() {
  const [songs, setSongs] = useState(null);
  const [lyrics, setLyrics] = useState(null);
  const apiURL = 'https://api.lyrics.ovh';

  async function submit() {
    setLyrics(null);
    const searchInput = document.getElementById("search");
    const term = searchInput.value.trim();
    await fetch(apiURL + '/suggest/' + term)
    .then(res => res.json())
    .then(data => setSongs(data));
  }

  async function songButton(artist, songTitle) {
    await fetch(apiURL + "/v1/" + artist + "/" + songTitle)
    .then(res => res.json())
    .then(data => {
      // todo -> Need to fix this dynamic break
      const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, `<br>`);
      setLyrics(lyrics);
    });
  }
  
  async function clearResults() {
    setSongs(null);
    setLyrics(null);
  }

  async function getMoreSongs(url) {
    // await fetch(url)
    await fetch("https://cors-anywhere.herokuapp.com/" + url)
    .then(res => res.json())
    .then(data => console.info(data));
    // .then(data => setSongs(data));
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="form">
          <input type="text" id="search" placeholder="Find a song!" />
          <button className="search-btn" onClick={submit}>Search</button>
          {/* <button className="clear-btn" onClick={clearResults}>Clear</button> */}
        </div>
      </header>
      <div className="container">
        {!lyrics ?
          <ul className="songs">
            {!songs ? "Enter a search to find songs!" :
              songs.data.map((songs) => (
                <li key={songs.id} style={{listStyleType:'none', indent:"none"}}>
                  <span><strong>{songs.title}</strong> - {songs.artist.name}</span>
                  <button className="btn" onClick={() => songButton(songs.artist.name, songs.title)}>
                    Get Lyrics
                  </button>
                </li>
              ))
            }
          </ul>
          : "" 
        }
      </div>
      <div className="container centered">
        {!lyrics ? "" : <p>{lyrics}</p>}
      </div>
      {/* todo -> need to fix prev and next buttons when available */}
      {/* {!lyrics && songs.prev ? 
        <button className="btn" onClick={() => getMoreSongs(songs.prev)}>Prev</button>
        : ""
      }
      {!lyrics && songs.next ? 
        <button className="btn" onClick={() => getMoreSongs(songs.next)}>Next</button>
        : ""
      } */}
    </div>
  );
}

export default App;