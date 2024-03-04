import { LogLevel, SubProcessLoggerClient } from "custom-logging-module";
import { delay, randomChoice } from "../utils/test-utils";
import { HttpClientService } from "./HttpClientService";

export class AuthService extends SubProcessLoggerClient {
    private httpClientService: HttpClientService = new HttpClientService(this); 

    constructor(parent: any) {
        super("AuthService", parent);
    }

    async authenticateUser(): Promise<boolean> {
        this.log(LogLevel.TRACE, "Début de l'authentification d'un utilisateur.");

        // Simuler la vérification des identifiants avec une requête HTTP
        await this.httpClientService.sendHttpRequest();
        this.log(LogLevel.DEBUG, "Vérification des identifiants via API externe.");

        // Étape 1: Vérification des identifiants
        await delay(randomChoice([100, 200, 300]));
        if (Math.random() < 0.2) {
            const errorDetails = { error: "Échec de l'authentification", reason: "identifiants manquants" };
            this.log(LogLevel.ERROR, "Échec de l'authentification: identifiants manquants.", errorDetails);
            return false;
        }
        this.log(LogLevel.DEBUG, "Identifiants vérifiés.");

        // Simuler la validation de l'adresse e-mail avec une requête HTTP
        await this.httpClientService.sendHttpRequest();
        this.log(LogLevel.DEBUG, "Validation de l'adresse e-mail via API externe.");

        // Les étapes suivantes restent inchangées...

        this.log(LogLevel.INFO, "Utilisateur authentifié avec succès.");
        return true;
    }
}
