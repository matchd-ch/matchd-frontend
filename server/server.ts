import express from 'express';
import { join } from 'path';
import * as ejs from 'ejs';

async function start() {

  // Express server
  const app = express();

  const HOST = 'http://localhost';
  const PORT = process.env.PORT || 4000;
  const DIST_FOLDER = join(process.cwd(), 'dist');

  app.engine('html', ejs.renderFile);

  app.set('view engine', 'html');
  app.set('views', DIST_FOLDER);

  /// Serve static files from /browser
  app.get('*.*', express.static(DIST_FOLDER, {
    maxAge: '1y'
  }));

// All regular routes use the index html file
  app.get('*', (req, res) => {
    res.render('index', );
  });

  // Start up the Node server
  app.listen(PORT, () => {
    console.log(`Node Express server listening on ${HOST}:${PORT}`);
  });
}

start();
