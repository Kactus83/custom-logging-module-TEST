import { SubProcessLoggerClient } from "custom-logging-module";
export declare class DataService extends SubProcessLoggerClient {
    constructor();
    fetchData(): Promise<void>;
}
