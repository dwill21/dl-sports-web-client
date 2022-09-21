import { MeiliSearch } from 'meilisearch';

const searchClient = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_CMS_SEARCH_URL ?? "",
  // apiKey: 'masterKey',
});

type Index = "article";

const search = async (indexName: Index, input: string, offset = 0, limit = 10) => {
  const index = searchClient.index(indexName);
  return await index.search(input, { offset, limit });
};

export { search }
