module.exports = function (migration) {
  const subset = migration
    .createContentType("serviceGroupSubset")
    .name("Service Group Subset")
    .description("Subset entry belonging to a Service Group.")
    .displayField("name");

  subset.createField("name").name("Name").type("Symbol").required(true);

  subset
    .createField("slug")
    .name("Slug")
    .type("Symbol")
    .required(true)
    .validations([{ unique: true }]);

  subset
    .createField("serviceGroup")
    .name("Service Group")
    .type("Link")
    .linkType("Entry")
    .required(true)
    .validations([{ linkContentType: ["serviceGroup"] }]);
};
