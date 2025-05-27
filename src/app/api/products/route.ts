import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/contentful";
import { mapEntryToProduct } from "@/lib/utils";

export async function GET(req: Request) {
  try {
    // const url = new URL(req.url);
    const url = (req as NextRequest).nextUrl as URL;
    const category = url.searchParams.get("category"); // serviceGroup URL slug
    const subcategory = url.searchParams.get("subcategory"); // serviceGroupSubset URL slug (optional)
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "50", 10);
    const skip = (page - 1) * pageSize;

    if (!category) {
      return NextResponse.json(
        { error: "Missing 'category' query parameter" },
        { status: 400 }
      );
    }

    // Build the query object dynamically depending on whether subcategory is provided
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = {
      content_type: "product",
      limit: pageSize,
      skip,
      // Filter by serviceGroup by URL slug
      "fields.serviceGroup.sys.contentType.sys.id": "serviceGroup",
      "fields.serviceGroup.fields.url": category
    };

    if (subcategory) {
      // Add filter for serviceGroupSubset by URL slug
      query["fields.serviceGroupSubset.sys.contentType.sys.id"] =
        "serviceGroupSubset";
      query["fields.serviceGroupSubset.fields.slug"] = subcategory;
    }

    const entries = await client.getEntries(query);
    const products = entries.items.map(mapEntryToProduct);

    return NextResponse.json(
      { data: products, totalCount: entries.total },
      { status: 200 }
    );
  } catch (error) {
    console.error("API /api/products error:", error);
    return NextResponse.json(
      { error: "Something went wrong, please try again later or refresh." },
      { status: 500 }
    );
  }
}
