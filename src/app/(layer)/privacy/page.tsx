import { headers } from "next/headers";

export const generateMetadata = async () => {
  const host = headers().get("host");
  const proto = headers().get("x-forwarded-proto") || "http";
  const baseUrl = `${proto}://${host}`;

  const dynamicUrl = `${baseUrl}`;

  const jsonLdPrivacyPolicy = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy - Classik Global Media",
    url: dynamicUrl + "/privacy",
    description:
      "Read Classik Global Media's Privacy Policy to learn how we handle your personal data, what information we collect, and how we keep it secure.",
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: "Classik Global Media",
      url: dynamicUrl,
      logo: {
        "@type": "ImageObject",
        url: dynamicUrl + "/logo.png"
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": dynamicUrl + "/privacy"
    }
  };

  return {
    title: "Privacy Policy | Classik Global Media",
    description:
      "Learn how Classik Global Media protects your data and respects your privacy. We collect only essential information for processing transactions.",
    keywords: [
      "Privacy Policy",
      "Classik Global Media",
      "Data Protection",
      "Personal Information",
      "Secure Transactions",
      "User Privacy",
      "Media Company",
      "Wall Art"
    ],
    openGraph: {
      title: "Privacy Policy | Classik Global Media",
      description:
        "Understand how your data is handled by Classik Global Media. We value your trust and privacy in all our media services.",
      url: dynamicUrl + "/privacy",
      type: "website",
      images: [
        {
          url: dynamicUrl + "/logo.png",
          width: 1200,
          height: 630,
          alt: "Privacy Policy - Classik Global Media"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "Privacy Policy | Classik Global Media",
      description:
        "At Classik Global Media, your privacy matters. Learn about the data we collect, how it's used, and our security practices.",
      images: [dynamicUrl + "/logo.png"]
    },
    other: {
      "application/ld+json": JSON.stringify(jsonLdPrivacyPolicy)
    },
    alternates: {
      canonical: dynamicUrl + "/privacy"
    },
    robots: { index: true, follow: true }
  };
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-almostblack text-white px-6 py-28">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-golden mb-10 text-center">
          Privacy Policy
        </h1>

        <p className="text-white/80 mb-6 leading-relaxed">
          Your privacy is important to us. This Privacy Policy outlines the
          limited information we collect and how we use it in connection with
          your purchase of our products.
        </p>

        <h2 className="text-2xl font-semibold text-golden mb-4">
          1. Information We Collect
        </h2>
        <p className="text-white/80 mb-6">
          We only collect necessary account details — such as your name, email,
          and payment information — when you make a purchase through our
          platform.
        </p>

        <h2 className="text-2xl font-semibold text-golden mb-4">
          2. How We Use Your Information
        </h2>
        <p className="text-white/80 mb-6">
          The information you provide is strictly used to facilitate your
          transaction and deliver your product. We do not sell, rent, or share
          your information with third parties.
        </p>

        <h2 className="text-2xl font-semibold text-golden mb-4">
          3. Data Security
        </h2>
        <p className="text-white/80 mb-6">
          We take appropriate technical measures to ensure your data is
          protected and processed securely.
        </p>

        <h2 className="text-2xl font-semibold text-golden mb-4">
          4. Third-Party Services
        </h2>
        <p className="text-white/80 mb-6">
          We may use secure third-party payment gateways to process
          transactions. These services have their own privacy policies and are
          compliant with data security standards.
        </p>

        <h2 className="text-2xl font-semibold text-golden mb-4">5. Updates</h2>
        <p className="text-white/80 mb-6">
          This Privacy Policy may be updated periodically. We will notify users
          of important changes via our website.
        </p>

        <h2 className="text-2xl font-semibold text-golden mb-4">6. Contact</h2>
        <p className="text-white/80 mb-6">
          If you have any questions about our Privacy Policy, feel free to{" "}
          <a
            href="mailto:classikglobalmedia@gmail.com"
            className="text-golden underline hover:text-golden/80"
          >
            contact us
          </a>
          .
        </p>
      </div>
    </div>
  );
}
