import { LogLevel, LoggerClient, SubProcessLoggerConfig } from "custom-logging-module";
import { delay, randomChoice } from "../utils/test-utils";

export class AuthService extends LoggerClient {

    constructor() {

        super(
            new SubProcessLoggerConfig(
                "AuthService", 
                "SomeApp"
                )
            );
    }

    async authenticateUser(): Promise<boolean> {
        this.log(LogLevel.TRACE, "Début de l'authentification d'un utilisateur.");

        // Étape 1: Vérification des identifiants
        await delay(randomChoice([100, 200, 300]));
        if (Math.random() < 0.2) {
            this.log(LogLevel.ERROR, "Échec de l'authentification: identifiants manquants.");
            return false;
        }
        this.log(LogLevel.DEBUG, "Identifiants vérifiés.");

        // Étape 2: Validation de l'adresse e-mail
        await delay(randomChoice([100, 200, 300]));
        if (Math.random() < 0.2) {
            this.log(LogLevel.ERROR, "Échec de l'authentification: adresse e-mail invalide.");
            return false;
        }
        this.log(LogLevel.DEBUG, "Adresse e-mail validée.");

        // Étape 3: Vérification de l'existence de l'utilisateur
        await delay(randomChoice([100, 200, 300]));
        if (Math.random() < 0.2) {
            this.log(LogLevel.ERROR, "Échec de l'authentification: utilisateur non trouvé.");
            return false;
        }
        this.log(LogLevel.DEBUG, "Utilisateur trouvé dans la base de données.");

        // Étape 4: Vérification finale et authentification
        await delay(randomChoice([100, 200, 300]));
        if (Math.random() < 0.1) {
            this.log(LogLevel.ERROR, "Échec de l'authentification: erreur de serveur interne.");
            return false;
        }
        this.log(LogLevel.INFO, "Utilisateur authentifié avec succès.");
        return true;
    }
}
