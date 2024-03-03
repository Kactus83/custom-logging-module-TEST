"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const custom_logging_module_1 = require("custom-logging-module");
const test_utils_1 = require("../utils/test-utils");
class PaymentService extends custom_logging_module_1.SubProcessLoggerClient {
    constructor() {
        super("PaymentService", "SomeApp");
    }
    async processPayment() {
        this.log(custom_logging_module_1.LogLevel.TRACE, "Début du processus de paiement.");
        // Étape 1: Validation des détails de paiement
        await (0, test_utils_1.delay)((0, test_utils_1.randomChoice)([100, 200, 300]));
        if (Math.random() < 0.1) {
            this.log(custom_logging_module_1.LogLevel.ERROR, "Échec de la validation des détails de paiement.");
            return;
        }
        this.log(custom_logging_module_1.LogLevel.DEBUG, "Détails de paiement validés avec succès.");
        // Étape 2: Vérification de la solvabilité
        await (0, test_utils_1.delay)((0, test_utils_1.randomChoice)([100, 200, 300]));
        if (Math.random() < 0.15) {
            this.log(custom_logging_module_1.LogLevel.ERROR, "Solde insuffisant pour le paiement.");
            return;
        }
        this.log(custom_logging_module_1.LogLevel.DEBUG, "Solvabilité vérifiée avec succès.");
        // Étape 3: Communication avec le processeur de paiement
        await (0, test_utils_1.delay)((0, test_utils_1.randomChoice)([100, 200, 300]));
        if (Math.random() < 0.2) {
            this.log(custom_logging_module_1.LogLevel.ERROR, "Échec de la communication avec le processeur de paiement.");
            return;
        }
        this.log(custom_logging_module_1.LogLevel.DEBUG, "Communication avec le processeur de paiement réussie.");
        // Étape 4: Finalisation du paiement
        await (0, test_utils_1.delay)((0, test_utils_1.randomChoice)([100, 200, 300]));
        if (Math.random() < 0.25) {
            this.log(custom_logging_module_1.LogLevel.ERROR, "Échec de la finalisation du paiement.");
            return;
        }
        this.log(custom_logging_module_1.LogLevel.INFO, "Paiement traité et finalisé avec succès.");
    }
}
exports.PaymentService = PaymentService;
