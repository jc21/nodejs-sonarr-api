import {ISeriesStatistics} from "./ISeriesStatistics";

export interface ISeriesSeason {
    monitored: boolean;
    seasonNumber: number;
    statistics: ISeriesStatistics;
}
