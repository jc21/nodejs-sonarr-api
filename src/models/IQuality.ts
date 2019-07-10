import {IQualityType} from "./IQualityType";
import {IRevision} from "./IRevision";

export interface IQuality {
    quality: IQualityType;
    revision: IRevision;
}
