export interface ReferenceCard {
  id: string;
  title: string;
  slug: string;
  image: string;
}

export interface ReferencePreview {
  id: string;
  title: string;
  slug: string;
  description?: string;
  image: string;
}

export interface ReferenceFilters {
  type?: string;
  areas?: string[];
  tags?: string[];
}

export interface CreateReferenceInput {}

export interface UpdateReferenceInput {}

export type ReferenceCardData = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  mainImage: { url: string; width: number; height: number; alt?: string };
  type: { name: string; slug: string };
  areas: { name: string; slug: string }[];
  tags: { name: string; slug: string }[];
};

export type ReferenceDetailData = ReferenceCardData & {
  description?: string;
  gallery: { url: string; width: number; height: number; alt?: string }[];
  links: { label: string; url: string }[];
  metadata?: { label: string; value: string }[];
  createdAt: string;
};

export type AdminReferenceRow = {
  id: string;
  slug: string;
  title: string;
  mainImage: { url: string; width: number; height: number };
  type: { id: string; name: string; slug: string };
  areas: { id: string; name: string; slug: string }[];
  tags: { id: string; name: string; slug: string }[];
  createdAt: Date;
  updatedAt: Date;
};
