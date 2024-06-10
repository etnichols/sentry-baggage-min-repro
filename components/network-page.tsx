'use client';

import ExternalBundle from './external-bundle';
import React from 'react';
import { fetch as fetchPolyfill } from 'whatwg-fetch';

export default function NetworkPage() {
  return (
    <div style={{ margin: '20px' }}>
      <h1>
        Minimal reproduction of showing duplicated baggage headers getting sent
      </h1>
      <button
        onClick={() => {
          fetchPolyfill('/fake/redirected/get', {
            credentials: 'include',
            cache: 'no-store',
          })
            .then((res) => res.json())
            .then((data) => console.log('Fake endpoint 1: ', data));
        }}
      >
        Dummy GET (/fake/redirected/get)
      </button>
      <br />
      <br />
      <br />
      <button
        onClick={() => {
          fetchPolyfill('/fake/redirected/post', {
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
      <br />
      <br />
      <br />
      <button
        onClick={() => {
          fetchPolyfill('/fake/redirected/delete', {
            method: 'DELETE',
          })
            .then((res) => res.json())
            .then((data) => console.log('Fake endpoint 2: ', data));
        }}
      >
        Dummy DELETE (/fake/redirected/delete)
      </button>
      <br />
      <br />
      <br />
      <ExternalBundle />
    </div>
  );
}
