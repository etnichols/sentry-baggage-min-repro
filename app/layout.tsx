export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        {children}
        <div id="root-1"></div>
        <div id="root-2"></div>
      </body>
    </html>
  );
}
