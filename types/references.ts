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