import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/data";

export default function JsonLd() {
  const baseUrl = PERSONAL_INFO.siteUrl.replace(/\/$/, "");

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        name: PERSONAL_INFO.name,
        alternateName: [PERSONAL_INFO.shortName, "Dileepa"],
        jobTitle: PERSONAL_INFO.title,
        description: PERSONAL_INFO.bio,
        url: baseUrl,
        image: `${baseUrl}${PERSONAL_INFO.avatar}`,
        email: `mailto:${PERSONAL_INFO.email}`,
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "University of Moratuwa",
          url: "https://uom.lk",
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "Sri Lanka",
        },
        sameAs: SOCIAL_LINKS.map((s) => s.href).filter((href) => href.startsWith("http")),
        knowsAbout: [
          "Software Engineering",
          "Full Stack Development",
          "Backend Engineering",
          "Distributed Systems",
          "React",
          "Next.js",
          "TypeScript",
          "JavaScript",
          "Spring Boot",
          "Java",
          "Python",
          "MySQL",
          "PostgreSQL",
          "Tailwind CSS",
          "REST APIs",
          "Artificial Intelligence",
          "Cybersecurity",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: `${PERSONAL_INFO.name} — Portfolio`,
        description: `${PERSONAL_INFO.name} - ${PERSONAL_INFO.tagline}`,
        publisher: {
          "@id": `${baseUrl}/#person`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "ProfilePage",
        "@id": `${baseUrl}/#profilepage`,
        url: baseUrl,
        name: `${PERSONAL_INFO.name} — Software Engineer`,
        mainEntity: {
          "@id": `${baseUrl}/#person`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
