'use client';

import React from 'react';
import Script from 'next/script';

export default function NetworkPage() {
  return (
    <div style={{ margin: '20px' }}>
      <h1>Minimal reproduction of showing duplicated Sentry baggage headers</h1>
      <ExternalBundle />
    </div>
  );
}

// Loads a legacy create-react-app into the next app.
function ExternalBundle() {
  return (
    <>
      <Script type="text/javascript" src={`http://localhost:9011/vendor.js`} />
      <Script type="text/javascript" src={`http://localhost:9011/main.js`} />
    </>
  );
}
