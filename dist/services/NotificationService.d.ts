import { SubProcessLoggerClient } from "custom-logging-module";
export declare class NotificationService extends SubProcessLoggerClient {
    constructor();
    sendNotification(): Promise<void>;
}
