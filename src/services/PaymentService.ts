import { LogLevel, SubProcessLoggerClient } from "custom-logging-module";
import { delay, randomChoice } from "../utils/test-utils";
import { LogisticsService } from "./LogisticsService";
import { HttpClientService } from "./HttpClientService";

/**
 * Represents a payment service that handles the payment process.
 * @extends SubProcessLoggerClient
 */
export class PaymentService extends SubProcessLoggerClient {
    
    private logisticsService: LogisticsService = new LogisticsService(this);
    private httpClientService: HttpClientService = new HttpClientService(this);

    /**
     * Creates an instance of PaymentService.
     * @param {any} parent - The parent object.
     */
    constructor(parent: any) {
        super("PaymentService", parent);
    }

    /**
     * Processes the payment.
     * @returns {Promise<void>} A promise that resolves when the payment process is completed.
     */
    async processPayment(): Promise<void> {
        this.log(LogLevel.TRACE, "Début du processus de paiement.");

        // Simulate an HTTP request to validate payment details
        await this.httpClientService.sendHttpRequest();
        // The following logic depends on the results simulated by sendHttpRequest
        
        // Step 1: Validate payment details
        await delay(randomChoice([100, 200, 300]));
        if (Math.random() < 0.1) {
            this.log(LogLevel.ERROR, "Échec de la validation des détails de paiement.");
            return;
        }
        this.log(LogLevel.DEBUG, "Détails de paiement validés avec succès.");

        // Step 2: Verify solvency
        await delay(randomChoice([100, 200, 300]));
        if (Math.random() < 0.15) {
            this.log(LogLevel.ERROR, "Solde insuffisant pour le paiement.");
            return;
        }
        this.log(LogLevel.DEBUG, "Solvabilité vérifiée avec succès.");

        // Simulate an HTTP request to confirm the transaction with the payment processor
        await this.httpClientService.sendHttpRequest();
        // The following logic depends on the results simulated by sendHttpRequest
        
        // Step 4: Finalize the payment
        await delay(randomChoice([100, 200, 300]));
        if (Math.random() < 0.25) {
            this.log(LogLevel.ERROR, "Échec de la finalisation du paiement.");
            return;
        }
        const paymentDetails = { amount: 100, currency: "EUR", status: "success" };
        this.log(LogLevel.INFO, "Paiement traité et finalisé avec succès.", paymentDetails);        
        
        // Handle post-payment logistics actions
        await this.logisticsService.handlePostPaymentLogistics();
    }
}
