import {HTTP} from "@nofrills/http";
import {URL} from "url";
import {IEpisode, IQualityProfile, IReleaseInfo, ISeries} from "./models";

export class Sonarr extends HTTP {

    /**
     * Constructor
     */
    constructor(private readonly baseUrl: URL, private readonly apiKey: string) {
        super();
    }

    /**
     * Get All Episodes, optionally for a Series
     */
    public async episodes(seriesId?: number): Promise<IEpisode[]> {
        if (seriesId) {
            return this.get<IEpisode[]>(`${this.baseUrl.toString()}/api/episode?seriesId=${seriesId}`);
        }

        return this.get<IEpisode[]>(`${this.baseUrl.toString()}/api/episode`);
    }

    /**
     * Push a Release
     */
    public async release(release: IReleaseInfo): Promise<void> {
        return this.post<IReleaseInfo, void>(`${this.baseUrl.toString()}/api/release/push`, release);
    }

    /**
     * Toggle Monitor status for a Series
     */
    public async toggleMonitor(seriesId: number, toggle: boolean): Promise<void> {
        const series = await this.show(seriesId);
        series.monitored = toggle;
        await this.update(series);
        this.log.info(`turned ${this.onoff(toggle)} monitoring for: "${series.title}" (${series.year})`);
    }

    /**
     * Toggle Monitor status for a Season in a Series
     */
    public async toggleSeasonMonitor(seriesId: number, seasonNumber: number, toggle: boolean): Promise<void> {
        const series = await this.show(seriesId);
        const season = series.seasons.find((s) => s.seasonNumber === seasonNumber);

        if (season) {
            season.monitored = toggle;
            await this.update(series);
            this.log.info(`turned ${this.onoff(toggle)} monitoring for: "${series.title}" (${series.year}), season: ${seasonNumber}`);
            return;
        }

        throw new Error(`season ${seasonNumber} not found for ${seriesId}`);
    }

    /**
     * Get Profiles
     */
    public async profiles(): Promise<IQualityProfile[]> {
        return this.get<IQualityProfile[]>(`${this.baseUrl.toString()}/api/profile`);
    }

    /**
     * Get a Series
     */
    public async show(seriesId: number): Promise<ISeries> {
        return this.get<ISeries>(`${this.baseUrl.toString()}/api/series/${seriesId}`);
    }

    /**
     * Delete a Series
     */
    public async deleteShow(seriesId: number): Promise<Object> {
        return this.delete<Object>(`${this.baseUrl.toString()}/api/series/${seriesId}`);
    }

    /**
     * Get all Series
     */
    public async shows(): Promise<ISeries[]> {
        const series = await this.get<ISeries[]>(`${this.baseUrl.toString()}/api/series`);
        return series.sort((a, b) => a.sortTitle < b.sortTitle ? -1 : 1);
    }

    /**
     * Update a Series
     */
    public async update(series: ISeries): Promise<void> {
        return this.put<ISeries, void>(`${this.baseUrl.toString()}/api/series`, series);
    }

    /**
     * Name of Class
     */
    public get name(): string {
        return "sonarr";
    }

    /**
     * HTTP Request
     */
    public async request<T>(body?: T): Promise<RequestInit> {
        return {
            body: JSON.stringify(body),
            headers: {
                "accept":       "application/json,text/json",
                "content-type": "application/json",
                "x-api-key":    this.apiKey,
            },
        };
    }

    /**
     * Inverts a on/off
     */
    private onoff(value: boolean): string {
        return value ? "on" : "off";
    }
}
