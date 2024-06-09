// Importer les polices nécessaires depuis Google Fonts
import {Nunito,Inter} from "next/font/google"; 
// Importation des types nécessaires à partir de Next.js
import type { Metadata } from "next";
//Importation de composants
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/Modals/RegisterModal";
import ToasterProvider from "./providers/ToastProvider";
import LoginModal from "./components/Modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/Modals/RentModal";
import SearchModal from "./components/Modals/SearchModal";

export const metadata: Metadata = {
  title: "QuikStay", // le nom de plateforme dans le navigateur
  description: "QuikStay clone",
};

// Définition des paramètres de police
const font= Nunito({
  subsets:["latin"]
});
// Composant de mise en page principal
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) 
{
  // Récupération des informations utilisateur actuelles de manière asynchrone
  const currentUser = await getCurrentUser ();
  return (
    <html lang="en">
      <body className={font.className}>
      {/*Encapsulation de composants client uniquemen*/}
        <ClientOnly>
          {/*Fournir des notifications toast*/}
          <ToasterProvider/>
          <SearchModal/>
          <RegisterModal/>
          <RentModal/>  
          <LoginModal/> 
          {/*Barre de navigation avec les informations actuelles sur l’utilisateur */}
          <Navbar currentUser={currentUser}/>
          </ClientOnly>
          <div className="pb-20 pt-28">
            {children}
          </div>
        
        </body>
    </html>
  );
}
