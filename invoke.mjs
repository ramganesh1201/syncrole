import http from 'http';
import m from './.vercel/output/functions/__server.func/index.mjs';

const handler = m.default;

const server = http.createServer(handler);
server.listen(3000, () => {
  console.log("Server listening on 3000");
  fetch('http://localhost:3000/').then(async (res) => {
    console.log("STATUS:", res.status);
    console.log("BODY:", await res.text());
    server.close();
  }).catch(err => {
    console.error(err);
    server.close();
  });
});
