module.exports = function (migration) {
  const socialLink = migration
    .createContentType("socialLink")
    .name("Social Link")
    .description(
      "Stores social media links with platform name, icon identifier, and profile URL."
    )
    .displayField("name");

  socialLink.createField("name").name("Name").type("Symbol").required(true);

  socialLink
    .createField("url")
    .name("URL")
    .type("Symbol")
    .required(true)
    .validations([
      {
        regexp: {
          pattern: "^(https?):\\/\\/"
        }
      }
    ]);

  socialLink
    .createField("icon")
    .name("Icon Identifier")
    .type("Symbol")
    .required(true);

  socialLink.createField("order").name("Order").type("Integer");
};
