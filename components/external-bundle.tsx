import React from 'react';
import Script from 'next/script';

export default function ExternalBundle() {
  return (
    <>
      <Script
        type="text/javascript"
        src={`${process.env.NEXT_PUBLIC_LEGACY_DASHBOARD_BUNDLE_URL}/static/js/bundle.js`}
      />
    </>
  );
}
