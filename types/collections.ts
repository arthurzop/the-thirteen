export interface CollectionCard {
  id: string;
  title: string;
  slug: string;
  image: string;
}

export interface CollectionPreview {
  id: string;
  title: string;
  slug: string;
  description?: string;
}

export interface CreateCollectionInput {}

export interface UpdateCollectionInput {}