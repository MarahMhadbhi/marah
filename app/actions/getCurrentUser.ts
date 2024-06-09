import { getServerSession } from "next-auth/next";//pour récupérer la session côté serveur
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import  prisma from "@/app/libs/prismadb";

export async function getSession(){
    return await getServerSession(authOptions);
}

// Fonction asynchrone pour obtenir l'utilisateur actuellement connecté
export default async function getCurrentUser () {
   try {
     const session = await getSession ();

     if (!session?.user?.email){
        return null;
      } 
    
    const currentUser =await prisma.user.findUnique({
        where :{
          email:session.user.email as string,
        }
      });
    
    if (!currentUser) {
       return null;
    }
    
    // Retourne les informations de l'utilisateur avec les dates converties en chaîne de caractères ISO
    return{
      ...currentUser,
      createdAt:currentUser.createdAt.toISOString(),
      updated:currentUser.updated.toISOString(),
      emailVerified:currentUser.emailVerified?.toISOString()|| null
    };
  }
    catch(error:any)
    {
     return null;
    }
}

