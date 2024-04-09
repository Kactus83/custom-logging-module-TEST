import { LogLevel, LoggerDetailsLevel, LoggerMode, MainProcessLoggerClient, MainProcessLoggerConfig } from "custom-logging-module";
import { delay } from "./utils/test-utils";
import { AuthService } from "./services/AuthService";
import { DataService } from "./services/DataService";
import { NotificationService } from "./services/NotificationService";
import { PaymentService } from "./services/PaymentService";

/**
 * Boilerplate for main class of an application
 */
class SomeApp extends MainProcessLoggerClient {

    // Services used by the app
    authService: AuthService;
    dataService: DataService;
    notificationService: NotificationService;
    paymentService: PaymentService;

    constructor() {
        super(
            new MainProcessLoggerConfig(
            "SomeApp",                          // The name of the logger, used for identification
            LoggerMode.COLORED,                 // The mode of the logger, determines the output color
            LoggerDetailsLevel.DETAILED,        // The level of details to include in the log messages and the format of logs
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

    /**
     * Run the simulation of the app's behavior
     * @returns 
     */
    async run() {
        this.displayProcessTrees();
        this.log(LogLevel.INFO, "Démarrage de SomeApp");

        // Try to authenticate the user
        let authSuccess = false;
        for (let i = 0; i < 5 && !authSuccess; i++) {
            authSuccess = await this.authService.authenticateUser();
            if (!authSuccess) {
                this.log(LogLevel.WARN, "Tentative d'authentification échouée, essai ", (i + 2));
                await delay(500);
                
            }
        }

        // Stop the app if authentication failed
        if (!authSuccess) {
            this.log(LogLevel.ERROR, "Arrêt de SomeApp après plusieurs tentatives d'authentification échouées.");
            return;
        }

        // Data fetching process
        try {
            await this.dataService.fetchData();
        } catch (error) {
            const errorMessage = (error instanceof Error) ? error.message : "erreur inconnue";
            this.log(LogLevel.ERROR, "Erreur lors de la récupération des données: ", errorMessage);
        }

        // Payment processing
        try {
            await this.paymentService.processPayment();
        } catch (error) {
            const errorMessage = (error instanceof Error) ? error.message : "erreur inconnue";
            this.log(LogLevel.ERROR, "Erreur lors du traitement du paiement: ", errorMessage);
        }

        // Notification sending
        try {
            await this.notificationService.sendNotification();
        } catch (error) {
            const errorMessage = (error instanceof Error) ? error.message : "erreur inconnue";
            this.log(LogLevel.ERROR, "Erreur lors de l'envoi de la notification: ", errorMessage);
        }

        this.log(LogLevel.INFO, "SomeApp a terminé ses opérations");
    }
}

/**
 * Entry point of the logger simulation
 */
async function simulateAppBehavior() {
    const app = new SomeApp();
    await app.run();
}

simulateAppBehavior();
