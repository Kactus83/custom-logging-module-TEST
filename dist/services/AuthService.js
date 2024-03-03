"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const custom_logging_module_1 = require("custom-logging-module");
const test_utils_1 = require("../utils/test-utils");
class AuthService extends custom_logging_module_1.SubProcessLoggerClient {
    constructor() {
        super("AuthService", "SomeApp");
    }
    async authenticateUser() {
        this.log(custom_logging_module_1.LogLevel.TRACE, "Début de l'authentification d'un utilisateur.");
        // Étape 1: Vérification des identifiants
        await (0, test_utils_1.delay)((0, test_utils_1.randomChoice)([100, 200, 300]));
        if (Math.random() < 0.2) {
            this.log(custom_logging_module_1.LogLevel.ERROR, "Échec de l'authentification: identifiants manquants.");
            return false;
        }
        this.log(custom_logging_module_1.LogLevel.DEBUG, "Identifiants vérifiés.");
        // Étape 2: Validation de l'adresse e-mail
        await (0, test_utils_1.delay)((0, test_utils_1.randomChoice)([100, 200, 300]));
        if (Math.random() < 0.2) {
            this.log(custom_logging_module_1.LogLevel.ERROR, "Échec de l'authentification: adresse e-mail invalide.");
            return false;
        }
        this.log(custom_logging_module_1.LogLevel.DEBUG, "Adresse e-mail validée.");
        // Étape 3: Vérification de l'existence de l'utilisateur
        await (0, test_utils_1.delay)((0, test_utils_1.randomChoice)([100, 200, 300]));
        if (Math.random() < 0.2) {
            this.log(custom_logging_module_1.LogLevel.ERROR, "Échec de l'authentification: utilisateur non trouvé.");
            return false;
        }
        this.log(custom_logging_module_1.LogLevel.DEBUG, "Utilisateur trouvé dans la base de données.");
        // Étape 4: Vérification finale et authentification
        await (0, test_utils_1.delay)((0, test_utils_1.randomChoice)([100, 200, 300]));
        if (Math.random() < 0.1) {
            this.log(custom_logging_module_1.LogLevel.ERROR, "Échec de l'authentification: erreur de serveur interne.");
            return false;
        }
        this.log(custom_logging_module_1.LogLevel.INFO, "Utilisateur authentifié avec succès.");
        return true;
    }
}
exports.AuthService = AuthService;
