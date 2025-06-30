/* eslint-disable @typescript-eslint/no-explicit-any */
import { Entry, EntrySkeletonType, createClient } from "contentful";

import {
  IServiceGroupExtractedWithSubsets,
  IServiceGroupWithSubsets
} from "@/interface/service-group";
import { mapEntryToProduct } from "./utils";
import { IProduct } from "@/interface/product";
import { IContentfulService, IService } from "@/interface/services";
import { ITestimonials, ITestimonialsParent } from "@/interface/testimonials";
import { SlideData, SlideDataParent } from "@/interface/hero";
import { ITeamData, ITeamParent } from "@/interface/teams";
import { IContentfulImageField } from "@/interface/site-settings";
import { IMediaResponse } from "@/interface/media";
import { getCachedSharedData } from "./shared";

export const photographyVideo = "photography-video";

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!
});

export const getServiceGroup = async () => {
  const entries = await client.getEntries({ content_type: "serviceGroup" });
  return entries;
};

export const getServiceGroupSubsets = async () => {
  const entries = await client.getEntries({
    content_type: "serviceGroupSubsets"
  });
  return entries;
};

export async function getAllProducts() {
  const entry = await client.getEntries({
    content_type: "product",
    limit: 200
  });
  return entry?.items?.map(mapEntryToProduct);
}

export async function getProductById(id: string) {
  const entry = await client.getEntry(id);
  return entry;
}

export const getAllCategories = async () => {
  const serviceGroupRes = await client.getEntries({
    content_type: "serviceGroup",
    include: 2,
    order: ["fields.order"]
  });
  return serviceGroupRes?.items?.map((service) => {
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
};

export async function getProductsByServiceGroupUrl(
  category: string,
  options: { limit: number; offset?: number }
) {
  // 1. Get service group by URL
  const serviceGroupEntries = await client.getEntries({
    content_type: "serviceGroup",
    "fields.url": category
  });

  if (!serviceGroupEntries?.items?.length) return [];

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

export async function getPageSpecificData() {
  const [
    heroSlidesParent,
    testimonialsParent,
    parentServices,
    featuredEntries,
    sharedData
  ] = await Promise.all([
    client.getEntries({
      content_type: "heroSlides",
      limit: 1000,
      order: ["-sys.createdAt"]
    }),
    client.getEntries({
      content_type: "testimonials",
      limit: 1000,
      order: ["-sys.createdAt"]
    }),
    client.getEntries({
      content_type: "services",
      limit: 1
    }),
    client.getEntries({
      content_type: "product",
      "fields.isFeatured": true,
      limit: 20,
      order: ["-sys.createdAt"]
    }),
    getCachedSharedData()
  ]);

  // Hero Slides
  const heroSlides = heroSlidesParent?.items?.map((x) => {
    const data = x?.fields as unknown as SlideDataParent;
    return {
      headline: data?.headline,
      buttonLabel: data?.buttonLabel,
      buttonLink: data?.buttonLink,
      description: data?.description,
      image: data?.image?.fields
    };
  }) as SlideData[];

  // Testimonials
  const testimonials = testimonialsParent?.items?.map((x) => {
    const data = x?.fields as unknown as ITestimonialsParent;
    return {
      name: data?.name,
      message: data?.message,
      role: data?.role,
      rating: data?.rating,
      avatar: data?.avatar?.fields
    };
  }) as ITestimonials[];

  // Services
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
            thumbnail: thumbnail?.fields
          };
        }) ?? [];

      return {
        title: data?.title,
        description: data?.description,
        services: normalizedServices
      };
    }) ?? [];

  const extractedServices = services?.[0]?.services;

  // Featured Products
  const featuredProducts = featuredEntries.items
    .map(mapEntryToProduct)
    .filter((item): item is IProduct => item != null);

  // Grouped Products by Service Group
  const serviceGroups = sharedData?.serviceGroups || [];
  const serviceGroupIds = serviceGroups
    .map((group) => group.id)
    .filter(Boolean);

  const serviceGroupEntries = await client.getEntries({
    content_type: "product",
    "fields.serviceGroup.sys.id[in]": serviceGroupIds.join(","),
    limit: 1000,
    order: ["-sys.createdAt"]
  });

  const groupedProductsByServiceGroup: Record<
    string,
    {
      name: string;
      products: IProduct[];
    }
  > = {};

  for (const productEntry of serviceGroupEntries?.items) {
    const mapped = mapEntryToProduct(productEntry);
    if (!mapped) continue;

    const groupId = (productEntry.fields?.serviceGroup as Entry<any>)?.sys?.id;

    if (!groupId) continue;

    const group = serviceGroups.find((g) => g.id === groupId);
    if (!group) continue;

    if (!groupedProductsByServiceGroup[groupId]) {
      groupedProductsByServiceGroup[groupId] = {
        name: group.main,
        products: []
      };
    }

    if (groupedProductsByServiceGroup[groupId].products.length < 10) {
      groupedProductsByServiceGroup[groupId].products.push(mapped);
    }
  }

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
    query,
    limit: 30,
    order: ["-sys.createdAt"]
  });

  const matched = matchedEntries?.items
    ?.map(mapEntryToProduct)
    .filter((product): product is IProduct => product != null);

  if (matchedEntries.items.length === 0) {
    // No matched results, get featured products as fallback
    const fallbackEntries = await client.getEntries({
      content_type: "product",
      "fields.isFeatured": true,
      limit: 10
    });

    const related = fallbackEntries.items
      ?.map(mapEntryToProduct)
      .filter((product): product is IProduct => product != null);

    return {
      matched: [],
      related
    };
  }

  // 2. Extract first matched product's serviceGroup ID safely
  const firstServiceGroup = matchedEntries.items[0].fields.serviceGroup as
    | { sys: { id: string } }
    | undefined;

  const firstServiceGroupId = firstServiceGroup?.sys?.id;

  if (!firstServiceGroupId) {
    return {
      matched,
      related: []
    };
  }

  // 3. Fetch related products with same serviceGroup excluding matched ones in parallel with return
  const excludeIds = matchedEntries.items.map((item) => item.sys.id);

  const relatedEntriesPromise = client.getEntries({
    content_type: "product",
    "fields.serviceGroup.sys.id": firstServiceGroupId,
    "sys.id[nin]": excludeIds,
    limit: 30,
    order: ["-sys.createdAt"]
  });

  const relatedEntries = await relatedEntriesPromise;

  const related = relatedEntries.items
    ?.map(mapEntryToProduct)
    .filter((product): product is IProduct => product != null);

  return {
    matched,
    related
  };
}
export async function getMediaByServiceGroupUrl(
  category: string,
  options: { limit: number; offset?: number }
) {
  try {
    // Step 1: Fetch the service group by category URL
    const serviceGroupEntries = await client.getEntries({
      content_type: "serviceGroup",
      "fields.url": category
    });

    const serviceGroup = serviceGroupEntries?.items?.[0];
    const serviceGroupId = serviceGroup?.sys?.id;

    if (!serviceGroupId) return null;

    const commonQueryParams = {
      "fields.serviceGroup.sys.id": serviceGroupId,
      limit: options.limit,
      skip: options.offset ?? 0
    };

    // Step 2: Fetch photos and videos simultaneously
    const [photoResponse, videoResponse] = await Promise.all([
      client.getEntries({
        content_type: "photos",
        ...commonQueryParams
      }),
      client.getEntries({
        content_type: "videos",
        ...commonQueryParams
      })
    ]);

    type IVideoMediaItem = {
      fields: {
        heading?: string;
        videos?: IContentfulImageField[];
      };
    };

    type IPhotoMediaItem = {
      fields: {
        heading?: string;
        photos?: IContentfulImageField[];
      };
    };

    const photos = (photoResponse?.items ?? []).map(
      (item: IPhotoMediaItem) => ({
        heading: item.fields.heading ?? "Untitled",
        photos: Array.isArray(item.fields.photos)
          ? item.fields.photos.map((photoItem) => photoItem.fields ?? photoItem)
          : []
      })
    );

    const videos = (videoResponse?.items ?? []).map(
      (item: IVideoMediaItem) => ({
        heading: item.fields.heading ?? "Untitled",
        videos: Array.isArray(item.fields.videos)
          ? item.fields.videos.map((videoItem) => videoItem.fields ?? videoItem)
          : []
      })
    );

    return { photos, videos } as IMediaResponse;
  } catch (error) {
    console.error("Error fetching media by service group URL:", error);
    return null;
  }
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
