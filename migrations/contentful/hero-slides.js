module.exports = function (migration) {
  const heroSlide = migration
    .createContentType("heroSlides")
    .name("Hero Slides")
    .description(
      "Slide data for the homepage hero section including image, text, and CTA button."
    )
    .displayField("headline");

  heroSlide
    .createField("image")
    .name("Image")
    .type("Link")
    .linkType("Asset")
    .required(true);

  heroSlide
    .createField("headline")
    .name("Headline")
    .type("Symbol")
    .required(true);

  heroSlide
    .createField("description")
    .name("Description")
    .type("Text")
    .required(true);

  heroSlide
    .createField("buttonLabel")
    .name("Button Label")
    .type("Symbol")
    .required(true);

  heroSlide
    .createField("buttonLink")
    .name("Button Link")
    .type("Symbol")
    .required(true);

  heroSlide.createField("order").name("Order").type("Integer").required(false);

  heroSlide
    .createField("isActive")
    .name("Is Active")
    .type("Boolean")
    .required(false);
};
