// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category / Categories have many Products
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

Category.hasMany(Product, {
  foreignKey: 'category_id'
});

// Products belongToMany Tags / Tags belongToMany Products
Product.belongsToMany(Tag, {
  through: ProductTag,
  as: 'product_id',
  foreignKey: 'tag_id' // doublecheck this
});

Tag.belongsToMany(Product, {
  through: ProductTag,
  as: 'tag_id',
  foreignKey: 'product_id' // doublecheck this
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag
};
