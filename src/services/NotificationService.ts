import { LogLevel, SubProcessLoggerClient } from "custom-logging-module";
import { delay, randomChoice } from "../utils/test-utils";
import { LogisticsService } from "./LogisticsService";
import { HttpClientService } from "./HttpClientService";

/**
 * Represents a service for sending notifications.
 */
export class NotificationService extends SubProcessLoggerClient {

    private logisticsService: LogisticsService = new LogisticsService(this);
    private httpClientService: HttpClientService = new HttpClientService(this); 

    /**
     * Creates an instance of NotificationService.
     * @param parent - The parent object.
     */
    constructor(parent: any) {
        super("NotificationService", parent);
    }

    /**
     * Sends a notification.
     * @returns A promise that resolves when the notification is sent.
     */
    async sendNotification(): Promise<void> {
        this.log(LogLevel.TRACE, "Début de la préparation de la notification.");
        
        // Simuler une requête HTTP pour l'envoi de la notification
        await this.httpClientService.sendHttpRequest();

        // Étape 1: Préparation du contenu de la notification
        await delay(randomChoice([100, 200, 300]));
        if (Math.random() < 0.1) {
            this.log(LogLevel.ERROR, "Erreur lors de la préparation du contenu de la notification.");
            return;
        }
        this.log(LogLevel.DEBUG, "Contenu de la notification préparé avec succès.");

        // Étape 2: Sélection des destinataires
        await delay(randomChoice([100, 200, 300]));
        if (Math.random() < 0.15) {
            this.log(LogLevel.ERROR, "Erreur lors de la sélection des destinataires.");
            return;
        }
        this.log(LogLevel.DEBUG, "Destinataires sélectionnés avec succès.");

        // Étape 3: Connexion au service de messagerie
        await delay(randomChoice([100, 200, 300]));
        if (Math.random() < 0.2) {
            this.log(LogLevel.ERROR, "Échec de la connexion au service de messagerie.");
            return;
        }
        this.log(LogLevel.DEBUG, "Connexion au service de messagerie réussie.");

        // Étape 4: Envoi de la notification
        await delay(randomChoice([100, 200, 300]));
        if (Math.random() < 0.25) {
            this.log(LogLevel.ERROR, "Échec de l'envoi de la notification.");
            return;
        }
        this.log(LogLevel.INFO, "Notification envoyée avec succès.");
        
        if (Math.random() < 0.25) {
            this.log(LogLevel.ERROR, "Échec de l'envoi de la notification.");
            return;
        }

        this.log(LogLevel.INFO, "Notification envoyée avec succès.");
        
        await this.logisticsService.handlePostNotificationLogistics();
    }
}
