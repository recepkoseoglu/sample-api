const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'GET') {
    req.query._limit = req.query._limit || 20;
  }
  next();
});

server.use('/api', router);
server.listen(3000, () => {
  console.log('JSON Server is running from 3000 port');
});
