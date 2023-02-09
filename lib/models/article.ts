export interface Article {
  id: number;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  status: string;
  slug: string;
  category: any;
  created_at: string;
  updated_at: string;
  image: Image;
  authors: {
    id: number;
    name: string;
    email: string;
    bio: string;
    created_at: string;
    updated_at: string;
    picture: Image;
  }[];
}

interface Image {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    large: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    thumbnail: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: any;
  provider: string;
  provider_metadata: any;
  created_at: string;
  updated_at: string;
}

interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: any;
  size: number;
  width: number;
  height: number;
}
