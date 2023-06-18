export interface IImagePreviewMeta {
  imageUrl: string;
  slug: string;
  publishedAt: string;
  weeklyViewPage: number;
  monthlyViewPage: number;
}

export interface IYearlyChangelog {
  changelogs: IImagePreviewMeta[];
  monthlyViewPage: number;
}
