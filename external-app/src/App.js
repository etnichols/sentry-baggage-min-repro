import './App.css';

import logo from './logo.svg';

function App() {
  const fetchCurrentUser = (options) =>
    fetch(`/api/user`, {
      method: 'GET',
      cache: 'no-cache',
    }).then((response) => response.json());

  return (
    <div className="App">
      <header className="App-header">
        This is an "external" app that was created with Create React App.
      </header>
      <button
        onClick={() => {
          fetchCurrentUser().then((user) => {
            console.log('Fetch current user! user', user);
          });
        }}
      >
        Fetch current user
      </button>
      <button
        onClick={() => {
          fetch('/fake/redirected/post', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ key: 'value' }),
          })
            .then((res) => res.json())
            .then((data) => console.log('Fake endpoint 2: ', data));
        }}
      >
        Dummy POST (/fake/redirected/post)
      </button>
    </div>
  );
}

export default App;
