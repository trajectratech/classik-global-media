module.exports = function (migration) {
  const featuredProduct = migration
    .createContentType("featuredProduct")
    .name("Featured Product")
    .description("Featured product with details and images")
    .displayField("title");

  featuredProduct
    .createField("title")
    .name("Title")
    .type("Symbol")
    .required(true);

  featuredProduct
    .createField("description")
    .name("Description")
    .type("Text")
    .required(true);

  featuredProduct
    .createField("price")
    .name("Price")
    .type("Number")
    .required(true);

  featuredProduct
    .createField("quantity")
    .name("Quantity")
    .type("Integer")
    .required(true);

  featuredProduct
    .createField("specification")
    .name("Specification")
    .type("Text")
    .required(true);

  featuredProduct
    .createField("thumbnail")
    .name("Thumbnail Image")
    .type("Link")
    .linkType("Asset")
    .required(true);

  featuredProduct
    .createField("images")
    .name("Images")
    .type("Array")
    .required(true)
    .items({
      type: "Link",
      linkType: "Asset"
    });
};
