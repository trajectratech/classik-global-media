module.exports = function (migration) {
  const product = migration
    .createContentType("product")
    .name("Product")
    .description("Individual product linked to a service group")
    .displayField("title");

  product.createField("title").name("Title").type("Symbol").required(true);

  product
    .createField("description")
    .name("Description")
    .type("Text")
    .required(true);

  product.createField("price").name("Price").type("Number").required(true);

  product
    .createField("quantity")
    .name("Quantity")
    .type("Integer")
    .required(true);

  product
    .createField("specification")
    .name("Specification")
    .type("Text")
    .required(false);

  product
    .createField("thumbnail")
    .name("Thumbnail Image")
    .type("Link")
    .linkType("Asset")
    .required(false);

  product
    .createField("images")
    .name("Images")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Asset"
    })
    .required(false);

  product
    .createField("serviceGroupSubset")
    .name("Service Group Subset")
    .type("Link")
    .linkType("Entry")
    .required(true)
    .validations([
      {
        linkContentType: ["serviceGroupSubset"]
      }
    ]);
};
