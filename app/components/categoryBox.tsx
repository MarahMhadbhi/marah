'use client';
// Importer les hooks pour la navigation et la gestion des paramètres d'URL depuis next/navigation.
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import queryString from "query-string";// Importer la bibliothèque query-string pour analyser et convertir les chaînes de requêtes. 

interface categoryBoxProps{ icon: IconType; label: string; selected?: boolean; }

const CategoryBox: React.FC<categoryBoxProps> =
 ({ 
    icon:Icon,
    label,
    selected,
}) => {
    const router =useRouter();// Obtenir l'instance du router pour la navigation.
    const params = useSearchParams();// Obtenir les paramètres de recherche de l'URL.

    const handleClick = useCallback( () => {
        let currentQuery = {};
        if (params) {
            currentQuery = queryString.parse(params.toString());// pour ne pas supprimer les autres criteres de recherche 

        }

        const updatedQuery:any={
        ...currentQuery,
        category:label,
        }
         //Cliquez dans le type pour obtenir des annonces Cliquez à nouveau Supprimer
        if (params?.get('category') === label) {
            delete updatedQuery.category;
        }
         //redirection a la page d’accueil
        const url = queryString.stringifyUrl({
            url:'/',
            query:updatedQuery
        }, {skipNull:true});

         router.push(url);

    }, [label,params,router]);

    return ( 
        <div 
          onClick={handleClick}
          className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer 
                    ${selected ? 'border-b-neutral-800' : 'border-transparent'}
                    ${selected ? 'text-neutral-800' : 'text-neutral-500'} `}>
            
          <Icon size={26} /> 
           <div className="font-medium text-sm">
               {label}

           </div>
        </div>
    );
 }
 
export default CategoryBox;