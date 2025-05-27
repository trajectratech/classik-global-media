import { Entry, EntrySkeletonType, createClient } from "contentful";

import {
  IServiceGroup,
  IServiceGroupExtractedWithSubsets,
  IServiceGroupWithSubsets
} from "@/interface/service-group";
import { mapEntryToProduct } from "./utils";
import { IProduct } from "@/interface/product";
import { IContentfulService, IService } from "@/interface/services";
import { ITestimonials, ITestimonialsParent } from "@/interface/testimonials";
import { SlideData, SlideDataParent } from "@/interface/hero";
import { ITeamData, ITeamParent } from "@/interface/teams";

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!
});

export async function getProductById(id: string) {
  const entry = await client.getEntry(id);
  return entry;
}

export async function getProductsByServiceGroupUrl(
  category: string,
  options: { limit: number; offset?: number }
) {
  // 1. Get service group by URL
  const serviceGroupEntries = await client.getEntries({
    content_type: "serviceGroup",
    "fields.url": category
  });

  if (!serviceGroupEntries.items.length) return [];

  const serviceGroupId = serviceGroupEntries?.items?.[0]?.sys.id;

  // 2. Get products linked to this service group
  const products = await client.getEntries({
    content_type: "product",
    "fields.serviceGroup.sys.id": serviceGroupId,
    limit: options.limit,
    skip: options.offset
  });

  return products.items;
}

export async function getProductsByServiceGroupSubsetUrl(
  serviceGroupUrl: string,
  subsetUrl: string,
  options: { limit: number; offset?: number }
) {
  // 1. Get the service group entry by URL
  const serviceGroupEntries = await client.getEntries({
    content_type: "serviceGroup",
    "fields.url": serviceGroupUrl,
    limit: 1
  });

  if (!serviceGroupEntries.items.length) return [];

  const serviceGroupId = serviceGroupEntries.items[0].sys.id;

  // 2. Get the subset entry by URL **and** parent service group ID
  const subsetEntries = await client.getEntries({
    content_type: "serviceGroupSubset",
    "fields.slug": subsetUrl,
    "fields.serviceGroup.sys.id": serviceGroupId,
    limit: 1
  });

  if (!subsetEntries.items.length) return [];

  const subsetId = subsetEntries.items[0].sys.id;

  // 3. Query products linked **only** to the subset
  const products = await client.getEntries({
    content_type: "product",
    limit: options.limit,
    skip: options.offset,
    "fields.serviceGroupSubset.sys.id": subsetId
  });

  return products.items;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getSocialLinks() {
  const res = await client.getEntries({
    content_type: "siteSettings",
    order: ["fields.order"]
  });
  return res?.items?.map((item) => item.fields);
}

// Define a generic skeleton for socialLink entries
export type TypeSkeleton = EntrySkeletonType<{
  platform: string;
  url: string;
}>;

// Type guard to ensure the value is an array of SocialLink entries
export function isEntryArray(value: unknown): value is Entry<TypeSkeleton>[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) => typeof item === "object" && item !== null && "fields" in item
    )
  );
}

export async function getGlobalData(isLandingPage = false) {
  const [siteSettingsRes, serviceGroupRes] = await Promise.all([
    client.getEntries({ content_type: "siteSettings", limit: 1 }),
    client.getEntries({
      content_type: "serviceGroup",
      include: 2,
      order: ["fields.order"]
    })
  ]);

  // Map service groups and subsets
  const serviceGroups = (serviceGroupRes?.items || []).map((service) => {
    const fields = service?.fields ?? {};
    const subsets = fields.subsets;

    return {
      ...fields,
      subsets: isEntryArray(subsets)
        ? subsets.map((subset) => subset?.fields ?? {})
        : [],
      id: service?.sys?.id ?? "",
      url: fields.url ?? "",
      name: fields.name ?? ""
    };
  }) as unknown as IServiceGroupWithSubsets[];

  // Get site settings
  const siteSettingsItem = siteSettingsRes?.items?.[0];
  const rawFields = siteSettingsItem?.fields ?? {};
  const rawSocialLinks = rawFields.socialLinks ?? [];

  const resolvedSocialLinks = isEntryArray(rawSocialLinks)
    ? rawSocialLinks.map((link) => link?.fields ?? {})
    : [];

  const siteSettings = {
    ...rawFields,
    socialLinks: resolvedSocialLinks
  };

  let featuredProducts: IProduct[] = [];
  let groupedProductsByServiceGroup: {
    name: string;
    products: IProduct[];
  }[] = [];

  if (isLandingPage) {
    // Fetch featured products
    const featuredEntries = await client.getEntries({
      content_type: "product",
      "fields.isFeatured": true,
      limit: 10
    });

    featuredProducts = (featuredEntries?.items || []).map((entry) =>
      mapEntryToProduct(entry)
    );

    // Fetch grouped products by service group
    const groupedMap: Record<string, { name: string; products: IProduct[] }> =
      {};

    await Promise.all(
      (serviceGroups || []).map(async (group) => {
        const res = await client.getEntries({
          content_type: "product",
          order: ["-sys.createdAt"],
          "fields.serviceGroup.sys.id": group.sys.id,
          limit: 10
        });

        groupedMap[group.sys.id] = {
          name: group.fields.main || "Unnamed Group",
          products: (res?.items || []).map((entry) => mapEntryToProduct(entry))
        };
      })
    );

    groupedProductsByServiceGroup = Object.values(groupedMap);
  }

  return {
    siteSettings,
    serviceGroups,
    featuredProducts,
    groupedProductsByServiceGroup
  };
}

export async function getGroupedProductsByServiceGroup() {
  const res = await client.getEntries({
    content_type: "product",
    limit: 100,
    order: ["-sys.createdAt"]
  });

  const grouped: Record<string, { name: string; products: IProduct[] }> = {};

  for (const entry of res.items) {
    const product = mapEntryToProduct(entry);
    // const serviceGroup = entry.fields.serviceGroup?.fields;
    const serviceGroup = product.serviceGroup?.fields;

    if (!serviceGroup) continue;

    const groupName = serviceGroup.url;
    if (!grouped[groupName]) {
      grouped[groupName] = {
        name: groupName,
        products: []
      };
    }

    grouped[groupName]?.products?.push(product);
  }

  // Convert to array if needed for iteration in UI
  return Object.values(grouped);
}

export async function getSharedData() {
  const [siteSettingsRes, serviceGroupRes] = await Promise.all([
    client.getEntries({ content_type: "siteSettings", limit: 1 }),
    client.getEntries({
      content_type: "serviceGroup",
      include: 2,
      order: ["fields.order"]
    })
  ]);

  const serviceGroups = serviceGroupRes?.items?.map((service) => {
    const { subsets, ...restFields } = service.fields;

    return {
      ...restFields,
      subsets: isEntryArray(subsets)
        ? subsets.map((subset) => subset.fields)
        : [],
      id: service.sys.id,
      url: service.fields.url,
      name: service.fields.name
    };
  }) as unknown as IServiceGroupExtractedWithSubsets[];

  const rawFields = siteSettingsRes.items[0]?.fields || {};
  const rawSocialLinks = rawFields.socialLinks || [];

  const resolvedSocialLinks = isEntryArray(rawSocialLinks)
    ? rawSocialLinks.map((link) => link.fields)
    : [];

  const siteSettings = {
    ...rawFields,
    socialLinks: resolvedSocialLinks
  };

  return { siteSettings, serviceGroups };
}

export const getTeams = async () => {
  const teamsParent = await client.getEntries({
    content_type: "teams",
    limit: 1000,
    order: ["-sys.createdAt"]
  });

  const teams = teamsParent?.items?.map((x) => {
    const data = x?.fields as unknown as ITeamParent;
    return {
      firstName: data?.firstName,
      lastName: data?.lastName,
      role: data?.role,
      order: data?.order,
      avatar: data?.avatar?.fields
    };
  }) as unknown as ITeamData[];

  return teams;
};

export async function getPageSpecificData() {
  const heroSlidesParent = await client.getEntries({
    content_type: "heroSlides",
    limit: 1000,
    order: ["-sys.createdAt"]
  });

  const heroSlides = heroSlidesParent?.items?.map((x) => {
    const data = x?.fields as unknown as SlideDataParent;
    return {
      headline: data?.headline,
      buttonLabel: data?.buttonLabel,
      buttonLink: data?.buttonLink,
      description: data?.description,
      image: data?.image?.fields
    };
  }) as unknown as SlideData[];

  const testimonialsParent = await client.getEntries({
    content_type: "testimonials",
    limit: 1000,
    order: ["-sys.createdAt"]
  });

  const testimonials = testimonialsParent?.items?.map((x) => {
    const data = x?.fields as unknown as ITestimonialsParent;
    const avatar = data?.avatar?.fields;
    return {
      name: data?.name,
      message: data?.message,
      role: data?.role,
      rating: data?.rating,
      avatar
    };
  }) as unknown as ITestimonials[];

  const parentServices = await client.getEntries({
    content_type: "services",
    limit: 1
  });

  const services =
    parentServices?.items?.map((item) => {
      const data = item?.fields as unknown as {
        title: string;
        description: string;
        services: { fields: IContentfulService[] }[];
      };

      const _services = data?.services?.map(
        (x) => x?.fields
      ) as unknown as IContentfulService[];

      const normalizedServices: IService[] =
        _services?.map((x) => {
          const { thumbnail, ...rest } = x;

          return {
            ...rest,
            thumbnail: thumbnail?.fields // unwrap thumbnail
          };
        }) ?? [];

      return {
        title: data?.title,
        description: data?.description,
        services: normalizedServices
      };
    }) ?? [];

  const extractedServices = services?.[0]?.services;

  const featuredEntries = await client.getEntries({
    content_type: "product",
    "fields.isFeatured": true,
    limit: 20,
    order: ["-sys.createdAt"]
  });

  // Map and filter out null/undefined mapped results
  const featuredProducts = featuredEntries.items
    .map(mapEntryToProduct)
    .filter((item): item is IProduct => item != null);

  const serviceGroups = (await getSharedData()).serviceGroups || [];

  const groupedProductsByServiceGroup: Record<
    string,
    {
      name: string;
      products: IProduct[];
    }
  > = {};

  await Promise.all(
    serviceGroups
      .filter((group) => group?.id && group?.main)
      .map(async (group) => {
        const res = await client.getEntries({
          content_type: "product",
          order: ["-sys.createdAt"],
          "fields.serviceGroup.sys.id": group?.id,
          // "fields.serviceGroup.sys.id[in]": group?.id,
          limit: 10
        });

        const products = res.items
          .map(mapEntryToProduct)
          .filter((product): product is IProduct => product != null);

        // Only assign if we have products
        if (products.length > 0) {
          groupedProductsByServiceGroup[group?.id] = {
            name: group?.main,
            products
          };
        }
      })
  );

  const orderedGroupedProducts = serviceGroups
    .filter((group) => group?.id && groupedProductsByServiceGroup[group.id])
    .map((group) => groupedProductsByServiceGroup[group.id]);

  return {
    featuredProducts,
    groupedProductsByServiceGroup: orderedGroupedProducts,
    companyServices: {
      title: services?.[0]?.title,
      description: services?.[0]?.description,
      services: extractedServices
    },
    testimonials,
    heroSlides
  };
}

export async function fetchProductsByQuery(query: string) {
  // 1. Search by full-text query
  const matchedEntries = await client.getEntries({
    content_type: "product",
    query, // full-text search
    limit: 30,
    order: ["-sys.createdAt"]
  });

  const _matchedEntries = matchedEntries?.items
    ?.map(mapEntryToProduct)
    .filter((product): product is IProduct => product != null);

  // If no results, fallback to featured products
  if (matchedEntries.items.length === 0) {
    const fallbackEntries = await client.getEntries({
      content_type: "product",
      "fields.isFeatured": true,
      limit: 10
    });

    const _fallbackEntries = fallbackEntries.items
      ?.map(mapEntryToProduct)
      .filter((product): product is IProduct => product != null);

    return {
      matched: [] as unknown as IProduct[],
      related: _fallbackEntries
    };
  }

  // 2. Extract serviceGroup ID from first matched product
  const firstServiceGroup = matchedEntries.items[0].fields
    .serviceGroup as unknown as IServiceGroup;

  // const firstServiceGroupId =
  // 	matchedEntries.items[0].fields.serviceGroup?.sys?.id;
  const firstServiceGroupId = firstServiceGroup?.sys?.id;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let relatedEntries: IProduct[] = [];

  // 3. Fetch related products with same serviceGroup excluding matched ones
  if (firstServiceGroupId) {
    const res = await client.getEntries({
      content_type: "product",
      "fields.serviceGroup.sys.id": firstServiceGroupId,
      "sys.id[nin]": matchedEntries?.items?.map((item) => item?.sys?.id),
      limit: 30,
      order: ["-sys.createdAt"]
    });

    relatedEntries = res?.items
      ?.map(mapEntryToProduct)
      .filter((product): product is IProduct => product != null);
  }

  return {
    matched: _matchedEntries,
    related: relatedEntries
  };
}
