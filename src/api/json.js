const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // db.json dosyanızın yolu
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

module.exports = (req, res) => {
  return server(req, res);
};
