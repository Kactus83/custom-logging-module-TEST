"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const custom_logging_module_1 = require("custom-logging-module");
const test_utils_1 = require("../utils/test-utils");
class NotificationService extends custom_logging_module_1.SubProcessLoggerClient {
    constructor() {
        super("NotificationService", "SomeApp");
    }
    async sendNotification() {
        this.log(custom_logging_module_1.LogLevel.TRACE, "Début de la préparation de la notification.");
        // Étape 1: Préparation du contenu de la notification
        await (0, test_utils_1.delay)((0, test_utils_1.randomChoice)([100, 200, 300]));
        if (Math.random() < 0.1) {
            this.log(custom_logging_module_1.LogLevel.ERROR, "Erreur lors de la préparation du contenu de la notification.");
            return;
        }
        this.log(custom_logging_module_1.LogLevel.DEBUG, "Contenu de la notification préparé avec succès.");
        // Étape 2: Sélection des destinataires
        await (0, test_utils_1.delay)((0, test_utils_1.randomChoice)([100, 200, 300]));
        if (Math.random() < 0.15) {
            this.log(custom_logging_module_1.LogLevel.ERROR, "Erreur lors de la sélection des destinataires.");
            return;
        }
        this.log(custom_logging_module_1.LogLevel.DEBUG, "Destinataires sélectionnés avec succès.");
        // Étape 3: Connexion au service de messagerie
        await (0, test_utils_1.delay)((0, test_utils_1.randomChoice)([100, 200, 300]));
        if (Math.random() < 0.2) {
            this.log(custom_logging_module_1.LogLevel.ERROR, "Échec de la connexion au service de messagerie.");
            return;
        }
        this.log(custom_logging_module_1.LogLevel.DEBUG, "Connexion au service de messagerie réussie.");
        // Étape 4: Envoi de la notification
        await (0, test_utils_1.delay)((0, test_utils_1.randomChoice)([100, 200, 300]));
        if (Math.random() < 0.25) {
            this.log(custom_logging_module_1.LogLevel.ERROR, "Échec de l'envoi de la notification.");
            return;
        }
        this.log(custom_logging_module_1.LogLevel.INFO, "Notification envoyée avec succès.");
    }
}
exports.NotificationService = NotificationService;
