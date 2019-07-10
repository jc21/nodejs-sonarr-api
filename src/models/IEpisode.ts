import {IEpisodeFile} from "./IEpisodeFile";

export interface IEpisode {
    absoluteEpisodeNumber: number;
    airDate: Date;
    airDateUTC: Date;
    episodeFile: IEpisodeFile;
    episodeNumber: number;
    hasFile: boolean;
    id: number;
    monitored: boolean;
    overview: string;
    seasonNumber: number;
    seriesId: number;
    title: string;
    unverifiedSceneNumbering: boolean;
}
