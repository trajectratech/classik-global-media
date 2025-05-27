module.exports = function (migration) {
  const testimonial = migration
    .createContentType("testimonial")
    .name("Testimonial")
    .description(
      "Customer testimonials with name, role, message, rating, and avatar"
    )
    .displayField("name");

  testimonial.createField("name").name("Name").type("Symbol").required(true);

  testimonial.createField("role").name("Role").type("Symbol").required(false);

  testimonial
    .createField("message")
    .name("Message")
    .type("Text")
    .required(true);

  testimonial
    .createField("rating")
    .name("Rating")
    .type("Integer")
    .required(true)
    .validations([
      {
        range: { min: 1, max: 5 }
      }
    ]);

  testimonial
    .createField("avatar")
    .name("Avatar")
    .type("Symbol") // Using Symbol to store avatar URL as string
    .required(false);
};
