import {IQuality} from "./IQuality";

export interface IEpisodeFile {
    dateAdded: Date;
    id: number;
    qualityCutoffNotMet: boolean;
    path: string;
    quality: IQuality;
    relativePath: string;
    sceneName: string;
    seasonNumber: number;
    seriesId: number;
    size: number;
}
