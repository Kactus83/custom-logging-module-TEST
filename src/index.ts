import { LogLevel, LoggerDetailsLevel, LoggerMode, MainProcessLoggerClient, MainProcessLoggerConfig } from "custom-logging-module";
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
        super(
            new MainProcessLoggerConfig(
            "SomeApp",                          // The name of the logger, used for identification
            LoggerMode.COLORED,                 // The mode of the logger, determines the output format
            LoggerDetailsLevel.DETAILED,        // The level of details to include in the log messages
            LogLevel.TRACE,                     // The minimum log level to display
            true,                               // Whether to include timestamps in the log messages
            true                                // Whether to include the log level in the log messages
            )
        );

        this.authService = new AuthService(this);
        this.dataService = new DataService(this);
        this.notificationService = new NotificationService(this);
        this.paymentService = new PaymentService(this);
    }

    async run() {
        this.log(LogLevel.INFO, "Démarrage de SomeApp");

        // Essayer d'authentifier jusqu'à 5 fois en cas d'échec
        let authSuccess = false;
        for (let i = 0; i < 5 && !authSuccess; i++) {
            authSuccess = await this.authService.authenticateUser();
            if (!authSuccess) {
                this.log(LogLevel.WARN, "Tentative d'authentification échouée, essai ", (i + 2));
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
            this.log(LogLevel.ERROR, "Erreur lors de la récupération des données: ", errorMessage);
        }

        // Processus de traitement de paiement
        try {
            await this.paymentService.processPayment();
        } catch (error) {
            const errorMessage = (error instanceof Error) ? error.message : "erreur inconnue";
            this.log(LogLevel.ERROR, "Erreur lors du traitement du paiement: ", errorMessage);
        }

        // Envoi d'une notification
        try {
            await this.notificationService.sendNotification();
        } catch (error) {
            const errorMessage = (error instanceof Error) ? error.message : "erreur inconnue";
            this.log(LogLevel.ERROR, "Erreur lors de l'envoi de la notification: ", errorMessage);
        }

        this.log(LogLevel.INFO, "SomeApp a terminé ses opérations");
    }
}

async function simulateAppBehavior() {
    const app = new SomeApp();
    await app.run();
}

simulateAppBehavior();
