import App from './pages/App';
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root-1')
);

if (module.hot) {
  module.hot.accept('./pages/App', () => {
    const NewApp = require('./pages/App').default;

    // render the app to the id
    render(
      <AppContainer>
        <NewApp />
      </AppContainer>,
      document.getElementById('root-1')
    );
  });
}
