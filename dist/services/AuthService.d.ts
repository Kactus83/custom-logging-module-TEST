import { SubProcessLoggerClient } from "custom-logging-module";
export declare class AuthService extends SubProcessLoggerClient {
    constructor();
    authenticateUser(): Promise<boolean>;
}
