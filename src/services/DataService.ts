import { LogLevel, SubProcessLoggerClient } from "custom-logging-module";
import { delay, randomChoice } from "../utils/test-utils";
import { HttpClientService } from "./HttpClientService"; 

export class DataService extends SubProcessLoggerClient {

    private httpClientService: HttpClientService = new HttpClientService(this); 

    constructor(parent: any) {
        super("DataService", parent);
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
            const errorDetails = {
                error: "Erreur lors du traitement des données",
                code: 500,
                context: {
                    step: "Traitement des données",
                    requestId: "abc123",
                    additionalInfo: "Détail supplémentaire sur l'erreur"
                }
            };
            this.log(LogLevel.ERROR, "Erreur lors du traitement des données.", errorDetails);
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

        // Simuler une réponse détaillée de l'API externe
        const apiResponse = {
            status: 200,
            data: {
                users: [
                    { id: 1, name: "John Doe", email: "john.doe@example.com" },
                    { id: 2, name: "Jane Doe", email: "jane.doe@example.com" }
                ],
                metadata: {
                    pageCount: 10,
                    currentPage: 1,
                    hasMore: true
                }
            },
            timestamp: new Date().toISOString()
        };
        this.log(LogLevel.DEBUG, "Réponse de l'API externe reçue avec succès.", apiResponse);

    }
}
