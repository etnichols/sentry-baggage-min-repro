import React from 'react';
import network from '../../utils/network';

function AppComponent() {
  return (
    <div>
      <div>Observe duplicated Baggage headers on this sentry request.</div>
      <button
        style={{ margin: '20px' }}
        onClick={() => {
          network.fetchCurrentUser().then((user) => {
            console.log('Fetch current user! user', user);
          });
        }}
      >
        Fetch current user
      </button>
    </div>
  );
}

export default AppComponent;
