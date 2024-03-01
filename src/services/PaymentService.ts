import { LogLevel, LoggerClient, LoggerMode } from "custom-logging-module";
import { delay, randomChoice } from "../utils/test-utils";

export class PaymentService extends LoggerClient {
    constructor() {
        super(LoggerMode.COLORED, "PaymentService", false);
    }

    async processPayment(): Promise<void> {
        this.log(LogLevel.TRACE, "Début du processus de paiement.");

        // Étape 1: Validation des détails de paiement
        await delay(randomChoice([100, 200, 300]));
        if (Math.random() < 0.1) {
            this.log(LogLevel.ERROR, "Échec de la validation des détails de paiement.");
            return;
        }
        this.log(LogLevel.DEBUG, "Détails de paiement validés avec succès.");

        // Étape 2: Vérification de la solvabilité
        await delay(randomChoice([100, 200, 300]));
        if (Math.random() < 0.15) {
            this.log(LogLevel.ERROR, "Solde insuffisant pour le paiement.");
            return;
        }
        this.log(LogLevel.DEBUG, "Solvabilité vérifiée avec succès.");

        // Étape 3: Communication avec le processeur de paiement
        await delay(randomChoice([100, 200, 300]));
        if (Math.random() < 0.2) {
            this.log(LogLevel.ERROR, "Échec de la communication avec le processeur de paiement.");
            return;
        }
        this.log(LogLevel.DEBUG, "Communication avec le processeur de paiement réussie.");

        // Étape 4: Finalisation du paiement
        await delay(randomChoice([100, 200, 300]));
        if (Math.random() < 0.25) {
            this.log(LogLevel.ERROR, "Échec de la finalisation du paiement.");
            return;
        }
        this.log(LogLevel.INFO, "Paiement traité et finalisé avec succès.");
    }
}
