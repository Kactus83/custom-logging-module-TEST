import { LogLevel, SubProcessLoggerClient } from "custom-logging-module";
import { delay, randomChoice } from "../utils/test-utils";
import { LogisticsService } from "./LogisticsService";
import { HttpClientService } from "./HttpClientService";

export class PaymentService extends SubProcessLoggerClient {
    
    private logisticsService: LogisticsService = new LogisticsService(this);
    private httpClientService: HttpClientService = new HttpClientService(this);

    constructor(parent: any) {
        super("PaymentService", parent);
    }

    async processPayment(): Promise<void> {
        this.log(LogLevel.TRACE, "Début du processus de paiement.");

        // Simuler une requête HTTP pour valider les détails de paiement
        await this.httpClientService.sendHttpRequest();
        // La logique suivante dépend des résultats simulés par sendHttpRequest
        
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

        // Simuler une requête HTTP pour confirmer la transaction avec le processeur de paiement
        await this.httpClientService.sendHttpRequest();
        // La logique suivante dépend des résultats simulés par sendHttpRequest
        
        // Étape 4: Finalisation du paiement
        await delay(randomChoice([100, 200, 300]));
        if (Math.random() < 0.25) {
            this.log(LogLevel.ERROR, "Échec de la finalisation du paiement.");
            return;
        }
        const paymentDetails = { amount: 100, currency: "EUR", status: "success" };
        this.log(LogLevel.INFO, "Paiement traité et finalisé avec succès.", paymentDetails);        
        
        // Gérer les actions logistiques post-paiement
        await this.logisticsService.handlePostPaymentLogistics();
    }
}
