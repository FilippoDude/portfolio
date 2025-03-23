import express from 'express';
import next from 'next';
const dev = false;
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const app = express();

nextApp.prepare().then(() => {
  // Your static files (optional)
  app.use(express.static('public'));  // Or wherever you have static assets

  // Route to handle all requests and serve Next.js pages
  app.all('*', (req, res) => {
    return handle(req, res); // Let Next.js handle the routing
  });

  // Start the server
  app.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
