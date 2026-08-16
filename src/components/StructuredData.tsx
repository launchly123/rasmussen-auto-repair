import { business, siteUrl } from "@/lib/business";
import { allServices } from "@/lib/services";

/**
 * AutoRepair (a LocalBusiness subtype) + WebSite graph. Every value is read
 * from `business.ts`, so the structured data can never drift from the NAP
 * rendered on the page.
 */
export function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AutoRepair",
        "@id": `${siteUrl}/#business`,
        name: business.name,
        url: siteUrl,
        telephone: business.phone.display,
        foundingDate: String(business.founded),
        founder: { "@type": "Person", name: business.founder },
        description:
          "Family-owned auto repair shop in Fresno, California. Diagnostics, brake repair, maintenance, diesel and fleet service for American, Japanese and European vehicles since 1967.",
        image: [
          `${siteUrl}/images/rasmussen-team.jpg`,
          `${siteUrl}/images/rasmussen-shop-maple-ave.jpg`,
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: business.address.street,
          addressLocality: business.address.city,
          addressRegion: business.address.region,
          postalCode: business.address.postalCode,
          addressCountry: business.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: business.geo.lat,
          longitude: business.geo.lng,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: business.openingHours.days,
            opens: business.openingHours.opens,
            closes: business.openingHours.closes,
          },
        ],
        areaServed: {
          "@type": "City",
          name: "Fresno",
          containedInPlace: {
            "@type": "State",
            name: business.address.regionName,
          },
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Automotive repair services",
          itemListElement: allServices.map((service) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: service },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: business.name,
        publisher: { "@id": `${siteUrl}/#business` },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Structured data is generated from local constants only.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
