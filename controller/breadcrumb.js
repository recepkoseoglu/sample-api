const dataset = require('../database/dataset.json');

export default (req, res, next) => {
  const { categoryId, categorySlug } = req.query;
  const breadcrumb = [];
  const parent = (id, categorySlug) => {
    const category = dataset.categories.find(i =>
      categorySlug ? i.slug === categorySlug : i.id === id,
    );
    if (category) {
      breadcrumb.push(category);
      category.parentId && parent(category.parentId);
    }
  };
  parent(parseInt(categoryId), categorySlug);
  res.json(breadcrumb);
};
