import { PrismaClient } from "@prisma/client";

// Déclaration globale pour TypeScript afin d'éviter les erreurs de type.
declare global {
    var prisma:PrismaClient | undefined
}

// Création d'une instance de PrismaClient ou utilisation de l'instance globale existante si elle est déjà définie.
// Cela permet de réutiliser une seule instance de PrismaClient,
const client=globalThis.prisma || new PrismaClient();

// Si l'environnement n'est pas en production, l'instance de PrismaClient est assignée à la variable globale.
if (process.env.NODE_ENV !== 'production')
    globalThis.prisma=client
 
export default client;
//e code est essentiel pour gérer correctement les instances de PrismaClient,