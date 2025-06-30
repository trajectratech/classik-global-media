import { cache } from "react";

import { getSharedData } from "./contentful";

export const getCachedSharedData = cache(() => getSharedData());
