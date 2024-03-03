"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custom_logging_module_1 = require("custom-logging-module");
const test_utils_1 = require("./utils/test-utils");
const AuthService_1 = require("./services/AuthService");
const DataService_1 = require("./services/DataService");
const NotificationService_1 = require("./services/NotificationService");
const PaymentService_1 = require("./services/PaymentService");
class SomeApp extends custom_logging_module_1.MainProcessLoggerClient {
    constructor() {
        super("SomeApp", custom_logging_module_1.LoggerMode.COLORED, custom_logging_module_1.LogLevel.TRACE);
        this.authService = new AuthService_1.AuthService();
        this.dataService = new DataService_1.DataService();
        this.notificationService = new NotificationService_1.NotificationService();
        this.paymentService = new PaymentService_1.PaymentService();
    }
    async run() {
        this.log(custom_logging_module_1.LogLevel.INFO, "Démarrage de SomeApp");
        // Essayer d'authentifier jusqu'à 3 fois en cas d'échec
        let authSuccess = false;
        for (let i = 0; i < 3 && !authSuccess; i++) {
            authSuccess = await this.authService.authenticateUser();
            if (!authSuccess) {
                this.log(custom_logging_module_1.LogLevel.WARN, "Tentative d'authentification échouée, essai " + (i + 2));
                await (0, test_utils_1.delay)(500); // Attente avant de réessayer
            }
        }
        if (!authSuccess) {
            this.log(custom_logging_module_1.LogLevel.ERROR, "Arrêt de SomeApp après plusieurs tentatives d'authentification échouées.");
            return;
        }
        // Processus de récupération des données
        try {
            await this.dataService.fetchData();
        }
        catch (error) {
            const errorMessage = (error instanceof Error) ? error.message : "erreur inconnue";
            this.log(custom_logging_module_1.LogLevel.ERROR, "Erreur lors de la récupération des données: " + errorMessage);
        }
        // Processus de traitement de paiement
        try {
            await this.paymentService.processPayment();
        }
        catch (error) {
            const errorMessage = (error instanceof Error) ? error.message : "erreur inconnue";
            this.log(custom_logging_module_1.LogLevel.ERROR, "Erreur lors du traitement du paiement: " + errorMessage);
        }
        // Envoi d'une notification
        try {
            await this.notificationService.sendNotification();
        }
        catch (error) {
            const errorMessage = (error instanceof Error) ? error.message : "erreur inconnue";
            this.log(custom_logging_module_1.LogLevel.ERROR, "Erreur lors de l'envoi de la notification: " + errorMessage);
        }
        this.log(custom_logging_module_1.LogLevel.INFO, "SomeApp a terminé ses opérations");
    }
}
async function simulateAppBehavior() {
    const app = new SomeApp();
    await app.run();
}
simulateAppBehavior();
