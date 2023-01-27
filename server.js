import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import renderApp from "./dist/server/ServerApp.js";

// cant import jsx file directly has to be built
// bc we are in esm modules with node, dirname doesnt exist
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 3001;

// project is going to build out HTML file and we are going too read that HTML file because we need all the paths in there
// paths meaning we need where the ccs is, javascript is because they have hashes attached to them (not going to be ClientApp.jsx at the end, it'll be hashed js)
const html = fs
  .readFileSync(path.resolve(__dirname, "./dist/client/index.html"))
  .toString();

// when user makes a req, ill give them head first (looking at index.html, immediately we can flesh out head, [modal and root],
// which is good cuz they can start loading all css [and move js as well to load all javascript])
// so while parsing all this, we can run SSR in the background -> mult things happening at once so giving best experience that we possibly can
const parts = html.split("not rendered");

const app = express();
app.use(
  "/assets",
  express.static(path.resolve(__dirname, "./dist/client/assets"))
);

// anything not served by a static asset, let React handle
app.use((req, res) => {
  //flush header
  res.write(parts[0]);

  const stream = renderApp(req.url, {
    onShellReady() {
      // stream, getting back renderToPipeableStream which is a known datatype streams.
      // when we pipe together, the response obj and React stream are connected together so that
      // whatever is coming out of React is going straight to User

      // might todo: if it is the crawler, do nothing here.
      stream.pipe(res);
    },
    onShellError() {
      // do error handling here. log out of error service
    },
    onAllReady() {
      // might todo: if it is the crawler, stream.pipe(res) [everything ready, dumb everything at once] so it'll maintain back pressure and dump it out all at once

      // last thing to write = everything thing is done now / all pieces, good to go and write tail of it and close req
      res.write(parts[1]);
      res.end();
    },
    onError(err) {
      console.error(err);
    },
  });
});

console.log(`listening on http://localhost:${PORT}`);
app.listen(PORT);
