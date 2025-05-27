import { MetadataRoute } from "next";
import { getAllCategories, getAllProducts } from "@/lib/contentful";
import { IServiceGroupSubset } from "@/interface/service-group";

const baseUrl = process.env.BASE_URL || "https://www.classikglobalmedia.com";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories()
  ]);

  const urls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5
    },
    ...(products || []).map((product) => ({
      url: `${baseUrl}/product/${product.id}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7
    })),
    ...(categories || []).flatMap((category) => {
      const mainUrl = {
        url: `${baseUrl}/${category.url}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.7
      };

      const subsetUrls = (category.subsets || [])?.map(
        (subset: IServiceGroupSubset) => ({
          url: `${baseUrl}/${category.url}/${subset.slug}`,
          lastModified: now,
          changeFrequency: "weekly" as const,
          priority: 0.6
        })
      );

      return [mainUrl, ...subsetUrls];
    })
  ];

  return urls;
}
