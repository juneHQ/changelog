export interface IImagePreviewMeta {
  imageUrl: string | null;
  slug: string;
  publishedAt: string;
  weeklyViewPage: number;
  monthlyViewPage: number;
}

export interface IYearlyChangelog {
  changelogs: IImagePreviewMeta[];
  monthlyViewPage: number;
}

export interface IAggregatedChangelogs {
  [key: string]: IImagePreviewMeta[];
}
