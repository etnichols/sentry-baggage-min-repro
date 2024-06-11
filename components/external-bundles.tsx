import React from 'react';
import Script from 'next/script';

export function ExternalBundle() {
  return (
    <>
      <Script type="text/javascript" src={`http://localhost:9011/vendor.js`} />
      <Script type="text/javascript" src={`http://localhost:9011/main.js`} />
    </>
  );
}
