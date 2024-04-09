import { LogLevel, SubProcessLoggerClient } from "custom-logging-module";
import { delay, randomChoice } from "../utils/test-utils";

/**
 * Represents the outcome of an HTTP request.
 */
interface HttpRequestOutcome {
    success: boolean;
    message: string;
}

/**
 * Represents a service for sending HTTP requests and handling the outcomes.
 */
export class HttpClientService extends SubProcessLoggerClient {

    /**
     * Creates an instance of HttpClientService.
     * @param parent - The parent object.
     */
    constructor(parent: any) {
        super("HttpClientService", parent);
    }

    /**
     * Sends an HTTP request and handles the outcome.
     */
    async sendHttpRequest(): Promise<void> {
        const outcomes: HttpRequestOutcome[] = [
            { success: true, message: "HTTP request succeeded with a 200 OK response." },
            { success: false, message: "HTTP request failed with a timeout." },
            { success: false, message: "Server error 500 occurred during the HTTP request." },
            { success: true, message: "HTTP request succeeded with a 302 redirection." },
            { success: false, message: "HTTP request failed with a 404 Not Found error." }
        ];

        this.log(LogLevel.TRACE, "Sending an HTTP request.");
        await delay(randomChoice([100, 200, 300]));

        const outcome = randomChoice(outcomes);

        if (outcome.success) {
            this.log(LogLevel.INFO, outcome.message);
            // Example of additional action on success
            await this.handleSuccessScenario();
        } else {
            this.log(LogLevel.ERROR, outcome.message);
            // Example of additional action on failure
            await this.handleFailureScenario();
        }
    }

    /**
     * Handles the success scenario after an HTTP request.
     */
    private async handleSuccessScenario(): Promise<void> {
        // Simulate additional processing action
        await delay(100); // Simulated delay
        this.log(LogLevel.DEBUG, "Additional processing after success.");
        // Add more actions or logs if needed
    }

    /**
     * Handles the failure scenario after an HTTP request.
     */
    private async handleFailureScenario(): Promise<void> {
        // Simulate retry attempt
        await delay(200); // Simulated delay for retry
        this.log(LogLevel.WARN, "Retry attempt after failure.");
        // Retry the request or take other recovery measures
    }
}
