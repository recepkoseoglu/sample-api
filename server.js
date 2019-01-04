const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('database/dataset.json');
const middlewares = jsonServer.defaults();

const dataset = require('./database/dataset.json');

const allowedMethods = ['GET'];

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (!allowedMethods.includes(req.method)) {
    return res.send(405, 'Method Not Allowed');
  }
  req.query._limit = req.query._limit || 100;
  next();
});

server.use('/breadcrumb', (req, res, next) => {
  const { categoryId } = req.query;
  if (!categoryId) {
    res.status(400).send('categoryId required as query string');
  }
  const breadcrumb = [];
  const parent = id => {
    const category = dataset.categories.find(i => i.id === id);
    if (category) {
      breadcrumb.push(category);
      category.parentId && parent(category.parentId);
    }
  };
  parent(parseInt(categoryId));
  res.json(breadcrumb);
});

server.use('/', router);

server.listen(3000, () => {
  console.log('JSON Server is running from 3000 port');
});
