import { LogLevel, SubProcessLoggerClient } from "custom-logging-module";
import { delay, randomChoice } from "../utils/test-utils";
import { HttpClientService } from "./HttpClientService";

/**
 * Represents the authentication service.
 */
export class AuthService extends SubProcessLoggerClient {
    private httpClientService: HttpClientService = new HttpClientService(this); 

    constructor(parent: any) {
        super("AuthService", parent);
    }

    /**
     * Authenticates a user.
     * @returns A promise that resolves to a boolean indicating whether the authentication was successful.
     */
    async authenticateUser(): Promise<boolean> {
        this.log(LogLevel.TRACE, "Starting user authentication.");

        // Simulate credentials verification with an HTTP request
        await this.httpClientService.sendHttpRequest();
        this.log(LogLevel.DEBUG, "Verifying credentials via external API.");

        // Step 1: Verify credentials
        await delay(randomChoice([100, 200, 300]));
        if (Math.random() < 0.2) {
            const errorDetails = { error: "Authentication failed", reason: "missing credentials" };
            this.log(LogLevel.ERROR, "Authentication failed: missing credentials.", errorDetails);
            return false;
        }
        this.log(LogLevel.DEBUG, "Credentials verified.");

        // Simulate email address validation with an HTTP request
        await this.httpClientService.sendHttpRequest();
        this.log(LogLevel.DEBUG, "Validating email address via external API.");


        // Email validation 
        await delay(randomChoice([100, 200, 300]));
        if (Math.random() < 0.2) {
            this.log(LogLevel.ERROR, "Échec de l'authentification: utilisateur non trouvé.");
            return false;
        }
        this.log(LogLevel.DEBUG, "Utilisateur trouvé dans la base de données.");

        // User authentication
        await delay(randomChoice([100, 200, 300]));
        if (Math.random() < 0.1) {
            this.log(LogLevel.ERROR, "Échec de l'authentification: erreur de serveur interne.");
            return false;
        }

        this.log(LogLevel.INFO, "User authenticated successfully.");
        return true;
    }
}
