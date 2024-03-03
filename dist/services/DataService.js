"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataService = void 0;
const custom_logging_module_1 = require("custom-logging-module");
const test_utils_1 = require("../utils/test-utils");
class DataService extends custom_logging_module_1.SubProcessLoggerClient {
    constructor() {
        super("DataService", "SomeApp");
    }
    async fetchData() {
        this.log(custom_logging_module_1.LogLevel.TRACE, "Début de la récupération des données.");
        // Étape 1: Connexion à la base de données
        await (0, test_utils_1.delay)((0, test_utils_1.randomChoice)([100, 200, 300]));
        if (Math.random() < 0.15) {
            this.log(custom_logging_module_1.LogLevel.ERROR, "Impossible de se connecter à la base de données.");
            return;
        }
        this.log(custom_logging_module_1.LogLevel.DEBUG, "Connexion à la base de données réussie.");
        // Étape 2: Requête des données
        await (0, test_utils_1.delay)((0, test_utils_1.randomChoice)([100, 200, 300]));
        if (Math.random() < 0.2) {
            this.log(custom_logging_module_1.LogLevel.ERROR, "Échec de la requête des données.");
            return;
        }
        this.log(custom_logging_module_1.LogLevel.DEBUG, "Données requêtées avec succès.");
        // Étape 3: Traitement des données
        await (0, test_utils_1.delay)((0, test_utils_1.randomChoice)([100, 200, 300]));
        if (Math.random() < 0.25) {
            this.log(custom_logging_module_1.LogLevel.ERROR, "Erreur lors du traitement des données.");
            return;
        }
        this.log(custom_logging_module_1.LogLevel.DEBUG, "Données traitées avec succès.");
        // Étape 4: Envoi des données
        await (0, test_utils_1.delay)((0, test_utils_1.randomChoice)([100, 200, 300]));
        if (Math.random() < 0.1) {
            this.log(custom_logging_module_1.LogLevel.ERROR, "Impossible d'envoyer les données.");
            return;
        }
        this.log(custom_logging_module_1.LogLevel.INFO, "Données envoyées avec succès.");
    }
}
exports.DataService = DataService;
