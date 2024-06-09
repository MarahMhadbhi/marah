// Importation de NextResponse pour envoyer des réponses HTTP.
import { NextResponse } from "next/server";

// Importation de bcrypt pour hacher les mots de passe
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

// Fonction asynchrone pour gérer les requêtes POST. Cette fonction sera appelée lorsqu'une requête POST est envoyée à cet endpoint.
export async function POST(
  request: Request
) {
  const body = await request.json();
  const { 
    email,
    name,
    password,
   } = body;
   // Hachage du mot de passe avec un facteur de coût de 12 pour plus de sécurité.
   const hashedPassword = await bcrypt.hash(password, 12);
   
   // Création d'un nouvel utilisateur dans la base de données avec les données fournies.
   const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    }
  });

  return NextResponse.json(user);
}


//assurant que les mots de passe sont correctement sécurisés et que les informations sont stockées de manière fiable dans la base de données.







