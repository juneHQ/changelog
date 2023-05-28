export interface MdxMeta {
  publishedAt: string;
  title: string;
  headerImage: string;
  summary: string;
  authors: {
    name: string;
    description: string;
    avatarUrl: string;
  }[];
  slug: string;
}
