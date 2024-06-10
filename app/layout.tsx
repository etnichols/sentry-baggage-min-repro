export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        {children}
        <div id="root"></div>
      </body>
    </html>
  );
}
