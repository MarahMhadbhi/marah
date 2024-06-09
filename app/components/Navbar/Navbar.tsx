'use client';

import Container from "../container";
import Categories from "./Categories";
import Logo from "./Logo"; 
import UserMenu from "./UserMenu";
import Search from "./search";
import { SafeUser } from "@/app/types";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar:React.FC<NavbarProps> = ({currentUser}) => {
  console.log({currentUser});
  
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container> 
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search/>
            <UserMenu currentUser={currentUser}/>
          </div>
        </Container>
      </div>
       <Categories/>
    </div>
  );
};

export default Navbar;

// Le composant Barre de navigation crée une barre de navigation
// fixe en haut de la page. Il comprend un logo, une barre de recherche, un menu utilisateur (qui s’adapte en fonction de la proposition currentUser)
// et une section de catégories pour la navigation ou le filtrage de contenu. 
//Le composant garantit une mise en page réactive avec un design épuré et structuré en utilisant les classes CSS Tailwind pour le style.