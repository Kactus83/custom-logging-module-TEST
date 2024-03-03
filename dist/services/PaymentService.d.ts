import { SubProcessLoggerClient } from "custom-logging-module";
export declare class PaymentService extends SubProcessLoggerClient {
    constructor();
    processPayment(): Promise<void>;
}
