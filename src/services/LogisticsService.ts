import { LogLevel, SubProcessLoggerClient } from "custom-logging-module";
import { delay, randomChoice } from "../utils/test-utils";

/**
 * Represents a logistics service that handles post-payment and post-notification operations.
 */
export class LogisticsService extends SubProcessLoggerClient {

    /**
     * Creates an instance of LogisticsService.
     * @param parent - The parent object.
     */
    constructor(parent: any) {
        super("LogisticsService", parent);
    }

    /**
     * Handles post-payment logistics operations.
     * @returns A promise that resolves when the operations are completed.
     */
    async handlePostPaymentLogistics(): Promise<void> {
        this.log(LogLevel.INFO, "Début des opérations logistiques suite à un paiement.");
        await delay(randomChoice([500, 1000, 1500]));
        if (Math.random() < 0.5) {
            this.log(LogLevel.INFO, "Expédition du produit démarrée.");
        } else {
            this.log(LogLevel.WARN, "Retard dans l'expédition du produit.");
        }
    }

    /**
     * Handles post-notification logistics operations.
     * @returns A promise that resolves when the operations are completed.
     */
    async handlePostNotificationLogistics(): Promise<void> {
        this.log(LogLevel.INFO, "Analyse des retours suite à la notification.");
        await delay(randomChoice([500, 1000, 1500]));
        if (Math.random() < 0.5) {
            this.log(LogLevel.INFO, "Engagement utilisateur constaté après notification.");
        } else {
            this.log(LogLevel.WARN, "Peu ou pas d'engagement utilisateur après notification.");
        }
    }
}
