import { prisma } from "@/lib/prisma";
import type { SearchSuggestion } from "@/types/search";

const RESULTS_PER_CATEGORY = 5;
const MAX_TOTAL_RESULTS = 8;

export async function search(query: string): Promise<SearchSuggestion[]> {
  const normalized = query.trim();

  if (!normalized) {
    return [];
  }

  const [references, collections, tags, areas, types] = await Promise.all([
    searchReferences(normalized),
    searchCollections(normalized),
    searchTags(normalized),
    searchAreas(normalized),
    searchTypes(normalized),
  ]);

  const results = [...references, ...collections, ...tags, ...areas, ...types];

  return sortResults(removeDuplicates(results)).slice(0, MAX_TOTAL_RESULTS);
}

async function searchReferences(query: string): Promise<SearchSuggestion[]> {
  const references = await prisma.reference.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    select: { id: true, title: true, slug: true },
    take: RESULTS_PER_CATEGORY,
  });

  return references.map((reference) => ({
    id: reference.id,
    label: reference.title,
    slug: reference.slug,
    type: "reference",
  }));
}

async function searchCollections(query: string): Promise<SearchSuggestion[]> {
  const collections = await prisma.collection.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    select: { id: true, title: true, slug: true },
    take: RESULTS_PER_CATEGORY,
  });

  return collections.map((collection) => ({
    id: collection.id,
    label: collection.title,
    slug: collection.slug,
    type: "collection",
  }));
}

async function searchTags(query: string): Promise<SearchSuggestion[]> {
  const tags = await prisma.tag.findMany({
    where: { name: { contains: query, mode: "insensitive" } },
    select: { id: true, name: true, slug: true },
    take: RESULTS_PER_CATEGORY,
  });

  return tags.map((tag) => ({
    id: tag.id,
    label: tag.name,
    slug: tag.slug,
    type: "tag",
  }));
}

async function searchAreas(query: string): Promise<SearchSuggestion[]> {
  const areas = await prisma.area.findMany({
    where: { name: { contains: query, mode: "insensitive" } },
    select: { id: true, name: true, slug: true },
    take: RESULTS_PER_CATEGORY,
  });

  return areas.map((area) => ({
    id: area.id,
    label: area.name,
    slug: area.slug,
    type: "area",
  }));
}

async function searchTypes(query: string): Promise<SearchSuggestion[]> {
  const types = await prisma.type.findMany({
    where: { name: { contains: query, mode: "insensitive" } },
    select: { id: true, name: true, slug: true },
    take: RESULTS_PER_CATEGORY,
  });

  return types.map((type) => ({
    id: type.id,
    label: type.name,
    slug: type.slug,
    type: "type",
  }));
}

function removeDuplicates(suggestions: SearchSuggestion[]): SearchSuggestion[] {
  return suggestions.filter(
    (suggestion, index, array) =>
      array.findIndex((item) => item.id === suggestion.id) === index
  );
}

function sortResults(suggestions: SearchSuggestion[]): SearchSuggestion[] {
  return suggestions.sort((a, b) => a.label.localeCompare(b.label));
}