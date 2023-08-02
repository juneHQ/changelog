import { IImagePreviewMeta } from "lib/models/view";

export interface IGridProps {
  changelogs: IImagePreviewMeta[];
  isFirstItem?: boolean; // used for animating the first item
}
