// la gestion de l'authentification 
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import nextAuth, { AuthOptions } from "next-auth";
import prisma from "@/app/libs/prismadb";

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";// Bibliothèque pour le hachage des mots de passe

// Configuration des options d'authentification
// Utilisation de PrismaAdapter pour gérer les interactions avec la base de données via Prisma
export const authOptions:AuthOptions={
    adapter:PrismaAdapter(prisma),
    providers:[
       

       // Fournisseur Google
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
        }),  // Fournisseur d'authentification par email et mot de passe
        CredentialsProvider({
            name:'crendentials',
            credentials:{
                email:{label:'email',type:'text'},
                password:{label:'password', type:'password'},
            },
            async authorize(credentials){
                
                if (!credentials?.email || !credentials?.password)
                {
                    throw new Error ('invalid credentials');
                }
                // Recherche de l'utilisateur dans la base de données via Prisma
                const user =await prisma.user.findUnique({
                    where:{
                        email:credentials.email
                    }
                });
                // Vérification de l'existence de l'utilisateur et de son mot de passe hashé
                if (!user || !user?.hashedPassword){
                    throw new Error('Invalid crendentials');
                }
                // Comparaison du mot de passe fourni avec le mot de passe hashé stocké
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );
                // Vérification de la validité du mot de passe
                if (!isCorrectPassword){
                    throw new Error('Invalid crendentials');
                }
                // Retourne l'utilisateur si toutes les vérifications sont correctes
                return user;
            }

        })

    ],
    pages:{
        signIn:'/',// Cela signifie que lorsque les utilisateurs doivent se connecter, ils seront redirigés vers cette page.
    },
    debug:process.env.NODE_ENV === 'development',
    session:{
        strategy:"jwt"//JSON Web Tokens, moyen de représenter des informations de manière sécurisée entre deux parties
    },
    //Une clé secrète utilisée par NextAuth pour signer et crypter les tokens JWT
    // lue à partir des variables d'environnement.
    secret:process.env.NEXTAUTH_SECRET,
};

export default nextAuth (authOptions);
//Si l'application est en mode développement ('development'), debug sera défini sur true, ce qui active les messages de débogage supplémentaires.
// Cela aide à diagnostiquer les problèmes pendant le développement.