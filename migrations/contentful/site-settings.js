module.exports = function (migration) {
  const siteSettings = migration
    .createContentType("siteSettings")
    .name("Site Settings")
    .description(
      "Global site settings like business name, contact info, and logo."
    )
    .displayField("businessName");

  siteSettings
    .createField("businessName")
    .name("Business Name")
    .type("Symbol")
    .required(true);

  siteSettings
    .createField("phoneNumber")
    .name("Phone Number")
    .type("Symbol")
    .required(true);

  siteSettings
    .createField("emailAddress")
    .name("Email Address")
    .type("Symbol")
    .required(true)
    .validations([
      {
        regexp: {
          pattern: "^\\S+@\\S+\\.\\S+$"
        },
        message: "Must be a valid email address"
      }
    ]);

  siteSettings
    .createField("logo")
    .name("Logo")
    .type("Link")
    .linkType("Asset")
    .required(true);

  siteSettings
    .createField("socialLinks")
    .name("Social Links")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [
        {
          linkContentType: ["socialLink"]
        }
      ]
    });

  // Add WhatsApp Number
  siteSettings
    .createField("whatsAppNumber")
    .name("WhatsApp Number")
    .type("Symbol")
    .required(false)
    .validations([
      {
        regexp: {
          pattern: "^\\d{10,15}$" // Basic phone number validation
        },
        message: "Must be a valid phone number without symbols or spaces"
      }
    ]);
};
