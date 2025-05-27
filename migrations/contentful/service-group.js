module.exports = function (migration) {
  const serviceGroup = migration
    .createContentType("serviceGroup")
    .name("Service Group")
    .description(
      "Group of services with subsets, slug, display order, and expansion toggle."
    )
    .displayField("main");

  serviceGroup.createField("main").name("Main").type("Symbol").required(true);

  serviceGroup
    .createField("url")
    .name("Slug")
    .type("Symbol")
    .required(true)
    .validations([
      { unique: true },
      {
        regexp: {
          pattern: "^[a-z0-9-]+$"
        }
      }
    ]);

  serviceGroup.createField("order").name("Order").type("Integer");

  serviceGroup.createField("isExpanded").name("Is Expanded").type("Boolean");
};

// module.exports = function (migration) {
// 	const serviceGroup = migration.editContentType("serviceGroup");

// 	serviceGroup
// 		.createField("subsets")
// 		.name("Service Group Subsets")
// 		.type("Array")
// 		.items({
// 			type: "Link",
// 			linkType: "Entry",
// 			validations: [{ linkContentType: ["serviceGroupSubset"] }],
// 		})
// 		.required(false); // optional field
// };
