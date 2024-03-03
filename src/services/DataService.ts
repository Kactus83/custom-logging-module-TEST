import { LogLevel, LoggerClient, SubProcessLoggerConfig } from "custom-logging-module";
import { delay, randomChoice } from "../utils/test-utils";
import { HttpClientService } from "./HttpClientService"; // Assurez-vous d'importer HttpClientService

export class DataService extends LoggerClient {

    private httpClientService: HttpClientService = new HttpClientService(); // Ajout du HttpClientService

    constructor() {
        super(new SubProcessLoggerConfig("DataService", "SomeApp"));
    }

    async fetchData(): Promise<void> {
        this.log(LogLevel.TRACE, "Début de la récupération des données.");

        // Simuler une requête HTTP pour illustrer la récupération de données depuis une API externe
        await this.httpClientService.sendHttpRequest();

        // Étape 1: Connexion à la base de données
        await delay(randomChoice([100, 200, 300]));
        if (Math.random() < 0.15) {
            this.log(LogLevel.ERROR, "Impossible de se connecter à la base de données.");
            return;
        }
        this.log(LogLevel.DEBUG, "Connexion à la base de données réussie.");

        // Étape 2: Requête des données
        await delay(randomChoice([100, 200, 300]));
        if (Math.random() < 0.2) {
            this.log(LogLevel.ERROR, "Échec de la requête des données.");
            return;
        }
        this.log(LogLevel.DEBUG, "Données requêtées avec succès.");

        // Étape 3: Traitement des données
        await delay(randomChoice([100, 200, 300]));
        if (Math.random() < 0.25) {
            this.log(LogLevel.ERROR, "Erreur lors du traitement des données.");
            return;
        }
        this.log(LogLevel.DEBUG, "Données traitées avec succès.");

        // Étape 4: Envoi des données
        await delay(randomChoice([100, 200, 300]));
        if (Math.random() < 0.1) {
            this.log(LogLevel.ERROR, "Impossible d'envoyer les données.");
            return;
        }
        this.log(LogLevel.INFO, "Données envoyées avec succès.");
    }
}
