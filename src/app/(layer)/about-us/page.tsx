import { ISiteSettings } from "@/interface/site-settings";
import { ITeamData } from "@/interface/teams";
import { getSharedData, getTeams } from "@/lib/contentful";
import { fixUrl } from "@/lib/utils";
import { headers } from "next/headers";
import Image from "next/image";

const sections = [
  {
    title: "Our Mission",
    content:
      "To have a global brand which can be trusted and reliable for excellent product/services in all aspect of media production to meet global standard."
  },
  {
    title: "Our Vision",
    content:
      "To drive by excellent and exceptional to deliver the mind of our customers at all level of craft and media production services."
  },
  {
    title: "Our Code Standard",
    content: "Always Committed to meet up client satisfaction."
  },
  {
    title: "Our Motto",
    content: "Trusted by many, made for everyone."
  }
];

const values = [
  {
    name: "Creativity",
    text: "We celebrate and encourage creative expression in all forms, from the art we create to the solutions we offer to our clients."
  },
  {
    name: "Quality",
    text: "We are commited to deliverying products and services that meet the highest standard of quality, craftmanship, and aesthetics."
  },
  {
    name: "Customer Centricity",
    text: "Our customers are at the heart of everything we do. We listen, understand, and prioritize their needs to provide exceptional services."
  },
  {
    name: "Innovation",
    text: "We embrace innovation as a driving force behind our growth, constantly seeking new ways to improve and elevate our offerings."
  },
  {
    name: "Integrity",
    text: "We operate with integrity, honesty, and transparency in all our interactions, fostering trust and accountability."
  },
  {
    name: "Sustainability",
    text: "We are dedicated to ethical and sustainable practices, ensuring that our creativity doesn't harm the planet."
  },
  {
    name: "Collaboration",
    text: "We believe in the power of collaboration, both within our team and with our clients, to achieve the best results."
  },
  {
    name: "Diversity and Inclusion",
    text: "We value and respect the diversity of perspectives, ideas, and cultures that enrich our organization."
  },
  {
    name: "Continouse Learning",
    text: "We are a learning organization, committed to personal and professional growth, both individual and as a team."
  }
];

export const generateMetadata = async () => {
  const host = headers().get("host");
  const proto = headers().get("x-forwarded-proto") || "http";
  const baseUrl = `${proto}://${host}`;

  const dynamicUrl = `${baseUrl}`;

  const teams: ITeamData[] = await getTeams();

  const data = await getSharedData();
  const { siteSettings } = data;

  const { socialLinks, businessDescription } =
    siteSettings as unknown as ISiteSettings;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Classik Global Media",
    url: dynamicUrl,
    logo: `${dynamicUrl}/logo.png`,
    description: businessDescription,
    sameAs: socialLinks?.map((d) => d?.url),
    address: {
      "@type": "PostalAddress",
      streetAddress: "34 Binuyo Street, Off Aroloya",
      addressLocality: "Lagos Island",
      addressRegion: "Lagos",
      postalCode: "102273",
      addressCountry: "NG"
    },
    founder: {
      "@type": "Person",
      name: "Founder Name"
    },
    employee: teams?.map((team) => ({
      "@type": "Person",
      name: `${team.firstName} ${team.lastName}`,
      jobTitle: team?.role,
      image: fixUrl(team?.avatar?.file?.url) || undefined
    })),
    brand: {
      "@type": "Brand",
      name: "Classik Global Media",
      slogan: "Trusted by many, made for everyone."
    },
    knowsAbout: [
      "Creative Design",
      "Media Production",
      "Wall Art",
      "Photography",
      "Brand Identity"
    ],
    values: {
      "@type": "DefinedTermSet",
      name: "Core Values",
      hasDefinedTerm: [
        { "@type": "DefinedTerm", name: "Creativity" },
        { "@type": "DefinedTerm", name: "Quality" },
        { "@type": "DefinedTerm", name: "Customer Centricity" },
        { "@type": "DefinedTerm", name: "Innovation" },
        { "@type": "DefinedTerm", name: "Integrity" },
        { "@type": "DefinedTerm", name: "Sustainability" },
        { "@type": "DefinedTerm", name: "Collaboration" },
        { "@type": "DefinedTerm", name: "Diversity and Inclusion" },
        { "@type": "DefinedTerm", name: "Continuous Learning" }
      ]
    }
  };

  return {
    title: "About Us | Classik Global Media",
    description: businessDescription,
    keywords: [
      "Classik Global Media",
      "Media Production",
      "Wall Art",
      "Creative Agency",
      "Our Mission",
      "Creative Team",
      "Art Services",
      "Media Company",
      "Innovation",
      "Customer Centric Media",
      "Creative Expression"
    ],
    openGraph: {
      title: "About Us | Classik Global Media",
      description:
        "Learn more about Classik Global Media – our mission, vision, values, and team behind world-class media production services.",
      url: dynamicUrl + "/about-us",
      type: "website",
      images: [
        {
          url: dynamicUrl + "/logo.png",
          width: 1200,
          height: 630,
          alt: "Classik Global Media Team"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "About Us | Classik Global Media",
      description: businessDescription,
      images: [dynamicUrl + "/logo.png"]
    },
    other: {
      "application/ld+json": JSON.stringify(jsonLd)
    },
    alternates: {
      canonical: dynamicUrl + "/about-us"
    },
    robots: { index: true, follow: true }
  };
};

export default async function AboutUs() {
  const teams = await getTeams();
  return (
    <div className="bg-almostblack text-white">
      {/* Hero Section */}
      <section className="relative py-28 px-6 text-center bg-gradient-to-b from-almostblack to-black">
        <h1 className="text-5xl md:text-6xl font-bold font-serif text-golden mb-6">
          Who We Are
        </h1>
        <p className="max-w-2xl mx-auto text-white/80 text-lg font-light tracking-wide">
          Classik Global Media is more than just an art company, we are
          creators, curators, and enthusiasts who are deeply passionate about
          the transformative power of art. Our journey began with a simple, yet
          profound vision: to bring exceptional wall art to life and make it
          accessible to art lovers worldwide. Over the years, we have expanded
          our horizons to offer a broader spectrum of creative products and
          services.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 bg-black">
        {sections.map((section, index) => {
          const isBottom = index < 2; // top row
          const isLeft = index % 2 === 0; // left column

          const borderClasses = `
											${isBottom ? "border-b border-golden" : ""}
											${isLeft ? "md:border-r md:border-golden" : ""}
   											`;

          return (
            <section
              key={index}
              className={`py-10 px-6 ${borderClasses.trim()}`}
            >
              <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-golden mb-6">
                  {section.title}
                </h2>
                <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
                  {section.content}
                </p>
              </div>
            </section>
          );
        })}
      </div>

      {/* Values Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-black via-almostblack to-black">
        <h2 className="text-4xl font-bold text-golden mb-12 text-center">
          Our Values
        </h2>
        <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-3 text-center">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-almostblack border border-golden rounded-xl p-8 shadow-md hover:shadow-golden/40 transition"
            >
              <h3 className="text-2xl font-semibold text-golden mb-4">
                {value.name}
              </h3>
              <p className="text-white/80">{value.text}</p>
            </div>
          ))}

          {/* <div className="bg-almostblack border border-golden rounded-xl p-8 shadow-md hover:shadow-golden/40 transition">
						<h3 className="text-2xl font-semibold text-golden mb-4">Craft</h3>
						<p className="text-white/80">
							Every piece is rooted in care, tradition, and tactile experience.
						</p>
					</div>
					<div className="bg-almostblack border border-golden rounded-xl p-8 shadow-md hover:shadow-golden/40 transition">
						<h3 className="text-2xl font-semibold text-golden mb-4">
							Expression
						</h3>
						<p className="text-white/80">
							We believe in the power of bold storytelling through visuals.
						</p>
					</div>
					<div className="bg-almostblack border border-golden rounded-xl p-8 shadow-md hover:shadow-golden/40 transition">
						<h3 className="text-2xl font-semibold text-golden mb-4">
							Innovation
						</h3>
						<p className="text-white/80">
							Where tradition meets technology, we find new ways to move people.
						</p>
					</div> */}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-golden mb-12">
            Meet Our Team
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            {teams
              ?.slice()
              .sort((a, b) => Number(a.order) - Number(b.order))
              .map((team, i) => {
                const url = fixUrl(team?.avatar?.file?.url);
                return (
                  <div key={i} className="flex flex-col items-center">
                    {/* <div className="w-32 h-32 bg-golden rounded-full mb-4"></div> */}
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm">
                      {fixUrl(team?.avatar?.file?.url) ? (
                        <Image
                          height={56}
                          width={56}
                          src={fixUrl(team?.avatar?.file?.url)}
                          alt={team.firstName}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="bg-gray-300 w-full h-full flex items-center justify-center text-white text-xl font-semibold">
                          {team?.firstName.charAt(0)}
                        </div>
                      )}
                    </div>
                    <h4 className="text-xl font-semibold text-white">
                      {team.firstName} {team.lastName}
                    </h4>
                    <p className="text-white/60 text-sm italic">{team?.role}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-black via-almostblack to-black text-center">
        <h2 className="text-4xl font-bold text-golden mb-6">
          Let’s Create Together
        </h2>
        <p className="text-white/80 max-w-xl mx-auto mb-8">
          Whether you have a vision or want to explore possibilities, we’re
          ready to collaborate and bring your ideas to life.
        </p>
        <a
          href="mailto:classikglobalmedia@gmail.com"
          className="inline-block bg-golden text-almostblack font-medium px-6 py-3 rounded-full hover:bg-golden/80 transition"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
}
