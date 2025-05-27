/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IServiceGroupExtracted {
  main: string;
  url: string;
  order: number;
  isExpanded: boolean;
  subsets: IServiceGroupSubset[];
  id: string;
}

export interface IServiceGroupExtractedWithSubsets
  extends IServiceGroupExtracted {
  subsets: IServiceGroupSubset[];
}

export interface IServiceGroupSubset {
  name: string;
  slug: string;
}

export interface IServiceGroupWithSubsets extends IServiceGroup {
  subsets: IServiceGroupSubset[];
}

export interface IServiceGroup {
  metadata: {
    tags: any[];
    concepts: any[];
  };
  sys: {
    space: Record<string, any>;
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    environment: Record<string, any>;
    publishedVersion: number;
    revision: number;
    contentType: Record<string, any>;
    locale: string;
  };
  fields: {
    main: string;
    url: string;
    order: number;
    isExpanded: boolean;
    subsets: any[];
  };
}
