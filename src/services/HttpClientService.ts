import { LogLevel, SubProcessLoggerClient } from "custom-logging-module";
import { delay, randomChoice } from "../utils/test-utils";

interface HttpRequestOutcome {
    success: boolean;
    message: string;
}

export class HttpClientService extends SubProcessLoggerClient {

    constructor(parent: any) {
        super("HttpClientService", parent);
    }

    async sendHttpRequest(): Promise<void> {
        const outcomes: HttpRequestOutcome[] = [
            { success: true, message: "Requête HTTP réussie avec une réponse 200 OK." },
            { success: false, message: "Échec de la requête HTTP avec un timeout." },
            { success: false, message: "Erreur de serveur 500 lors de la requête HTTP." },
            { success: true, message: "Requête HTTP réussie avec une redirection 302." },
            { success: false, message: "Échec de la requête HTTP avec une erreur 404 Not Found." }
        ];

        this.log(LogLevel.TRACE, "Envoi d'une requête HTTP.");
        await delay(randomChoice([100, 200, 300]));

        const outcome = randomChoice(outcomes);

        if (outcome.success) {
            this.log(LogLevel.INFO, outcome.message);
            // Exemple d'action supplémentaire en cas de succès
            await this.handleSuccessScenario();
        } else {
            this.log(LogLevel.ERROR, outcome.message);
            // Exemple d'action supplémentaire en cas d'échec
            await this.handleFailureScenario();
        }
    }

    private async handleSuccessScenario(): Promise<void> {
        // Simuler une action de traitement supplémentaire
        await delay(100); // Délai simulé
        this.log(LogLevel.DEBUG, "Traitement supplémentaire après succès.");
        // Ajouter d'autres actions ou logs si nécessaire
    }

    private async handleFailureScenario(): Promise<void> {
        // Simuler une tentative de réessai
        await delay(200); // Délai simulé pour le réessai
        this.log(LogLevel.WARN, "Tentative de réessai après échec.");
        // Réessayer la requête ou prendre d'autres mesures de récupération
    }
}
