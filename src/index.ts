import { LoggerClient, LogLevel, ColorChoice, LoggerMode, MainProcessLoggerClient } from "custom-logging-module";
import { delay } from "./utils/test-utils";
import { AuthService } from "./services/AuthService";
import { DataService } from "./services/DataService";
import { NotificationService } from "./services/NotificationService";
import { PaymentService } from "./services/PaymentService";


class SomeApp extends MainProcessLoggerClient {
    authService: AuthService;
    dataService: DataService;
    notificationService: NotificationService;
    paymentService: PaymentService;

    constructor() {
        super("SomeApp", LoggerMode.COLORED, LogLevel.TRACE);
        this.authService = new AuthService();
        this.dataService = new DataService();
        this.notificationService = new NotificationService();
        this.paymentService = new PaymentService();
    }

    async run() {
        this.log(LogLevel.INFO, "Démarrage de SomeApp");

        // Essayer d'authentifier jusqu'à 3 fois en cas d'échec
        let authSuccess = false;
        for (let i = 0; i < 3 && !authSuccess; i++) {
            authSuccess = await this.authService.authenticateUser();
            if (!authSuccess) {
                this.log(LogLevel.WARN, "Tentative d'authentification échouée, essai " + (i + 2));
                await delay(500); // Attente avant de réessayer
            }
        }

        if (!authSuccess) {
            this.log(LogLevel.ERROR, "Arrêt de SomeApp après plusieurs tentatives d'authentification échouées.");
            return;
        }

        // Processus de récupération des données
        try {
            await this.dataService.fetchData();
        } catch (error) {
            const errorMessage = (error instanceof Error) ? error.message : "erreur inconnue";
            this.log(LogLevel.ERROR, "Erreur lors de la récupération des données: " + errorMessage);
        }

        // Processus de traitement de paiement
        try {
            await this.paymentService.processPayment();
        } catch (error) {
            const errorMessage = (error instanceof Error) ? error.message : "erreur inconnue";
            this.log(LogLevel.ERROR, "Erreur lors du traitement du paiement: " + errorMessage);
        }

        // Envoi d'une notification
        try {
            await this.notificationService.sendNotification();
        } catch (error) {
            const errorMessage = (error instanceof Error) ? error.message : "erreur inconnue";
            this.log(LogLevel.ERROR, "Erreur lors de l'envoi de la notification: " + errorMessage);
        }

        this.log(LogLevel.INFO, "SomeApp a terminé ses opérations");
    }
}

async function simulateAppBehavior() {
    const app = new SomeApp();
    await app.run();
}

simulateAppBehavior();
