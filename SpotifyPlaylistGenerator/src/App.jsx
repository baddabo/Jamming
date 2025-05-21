import { useState, useEffect } from 'react'
import './App.css'

/*
When a user requests data from Spotify, the JSON response will contain a set of song tracks. 
Your Jammming web app should display the song name, artist, and album for each track in the results list.
Implement this by creating a unidirectional data flow from your root component. The root component should pass down 
the search results to a child component that will return each individual track to be rendered.
Since the Spotify API is not currently set up to be called, you may hard-code an array of track objects to be passed down for now.
*/

function App() {

  // You can access it like this
const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

// 1. Create the authorization URL
const AUTH_URL = 'https://accounts.spotify.com/authorize'
const scopes = ['user-read-private', 'user-read-email'] // Add more as needed

const authParameters = {
  client_id: clientId,
  response_type: 'code',
  redirect_uri: redirectUri,
  scope: scopes.join(' '),
  show_dialog: true
}

// 2. Exchange code for access token
async function getAccessToken(code) {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri
    })
  });
  return response.json();
}

  // Example hard-coded tracks array
  const [tracks] = useState([
    {
      id: 1,
      name: 'Blinding Lights',
      artist: 'The Weeknd',
      album: 'After Hours'
    },
    {
      id: 2,
      name: 'Don’t Start Now',
      artist: 'Dua Lipa',
      album: 'Future Nostalgia'
    },
    {
      id: 3,
      name: 'Watermelon Sugar',
      artist: 'Harry Styles',
      album: 'Fine Line'
    }
  ]);

  // 1. Redirect user to Spotify for authorization
  function handleLogin() {
    const params = new URLSearchParams(authParameters).toString();
    window.location = `${AUTH_URL}?${params}`;
  }

  // 2. Get code from URL after redirect
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  // 3. Exchange code for access token (only if code exists)
  useEffect(() => {
    if (code) {
      getAccessToken(code).then(tokenData => {
        // Save tokenData to state if needed
        // Example: setAccessToken(tokenData.access_token);
      });
    }
  }, [code]);

  return (
    <>
      <h1>Hello World</h1>
      <button onClick={handleLogin}>Login with Spotify</button>
      <button>Save To Spotify</button>
      <button>Search</button>
      <h2>Tracks</h2>
      <ul>
        {tracks.map(track => (
          <li key={track.id}>
            <strong>{track.name}</strong> by {track.artist} ({track.album})
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
