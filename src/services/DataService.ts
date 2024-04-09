import { LogLevel, SubProcessLoggerClient } from "custom-logging-module";
import { delay, randomChoice } from "../utils/test-utils";
import { HttpClientService } from "./HttpClientService";

/**
 * The DataService class extends the SubProcessLoggerClient class and provides methods for fetching and processing data.
 */
export class DataService extends SubProcessLoggerClient {

    private httpClientService: HttpClientService = new HttpClientService(this);

    /**
     * Constructs a new instance of the DataService class.
     * @param parent The parent object.
     */
    constructor(parent: any) {
        super("DataService", parent);
    }

    /**
     * Fetches data from an external API, processes it, and sends it.
     */
    async fetchData(): Promise<void> {
        this.log(LogLevel.TRACE, "Starting data retrieval.");

        // Simulate an HTTP request to illustrate data retrieval from an external API
        await this.httpClientService.sendHttpRequest();

        // Step 1: Connect to the database
        await delay(randomChoice([100, 200, 300]));
        if (Math.random() < 0.15) {
            this.log(LogLevel.ERROR, "Failed to connect to the database.");
            return;
        }
        this.log(LogLevel.DEBUG, "Successfully connected to the database.");

        // Step 2: Query the data
        await delay(randomChoice([100, 200, 300]));
        if (Math.random() < 0.2) {
            this.log(LogLevel.ERROR, "Failed to query the data.");
            return;
        }
        this.log(LogLevel.DEBUG, "Successfully queried the data.");

        // Step 3: Process the data
        await delay(randomChoice([100, 200, 300]));
        if (Math.random() < 0.25) {
            const errorDetails = {
                error: "Error while processing the data",
                code: 500,
                context: {
                    step: "Data processing",
                    requestId: "abc123",
                    additionalInfo: "Additional error detail"
                }
            };
            this.log(LogLevel.ERROR, "Error while processing the data.", errorDetails);
            return;
        }

        this.log(LogLevel.DEBUG, "Successfully processed the data.");

        // Step 4: Send the data
        await delay(randomChoice([100, 200, 300]));
        if (Math.random() < 0.1) {
            this.log(LogLevel.ERROR, "Failed to send the data.");
            return;
        }
        this.log(LogLevel.INFO, "Successfully sent the data.");

        // Simulate a detailed response from the external API
        const apiResponse = {
            status: 200,
            data: {
                users: [
                    { id: 1, name: "John Doe", email: "john.doe@example.com" },
                    { id: 2, name: "Jane Doe", email: "jane.doe@example.com" }
                ],
                metadata: {
                    pageCount: 10,
                    currentPage: 1,
                    hasMore: true
                }
            },
            timestamp: new Date().toISOString()
        };
        this.log(LogLevel.DEBUG, "Successfully received response from the external API.", apiResponse);

    }
}
