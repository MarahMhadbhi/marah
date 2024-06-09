'use client';
import useCountries from "@/app/hooks/useStates";
import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
    const searchModal = useSearchModal();
    const params = useSearchParams(); // Accède aux paramètres de recherche d’URL.
    const {getByValue} = useCountries();//Récupère les données de pays ou d’état en fonction d’une valeur

    const locationValue = params?.get('locationValue');
    const startDate = params?.get('startDate');
    const endDate = params?.get('endDate');
    const guestCount = params?.get('guestCount');

    //Mémorisez l’étiquette d’emplacement pour éviter les nouveaux rendus inutiles.
    const locationLabel = useMemo(() => {
        if(locationValue) {
            return getByValue(locationValue as string)?.label;//Obtenez l’étiquette de la valeur de l’emplacement.
        }

        return 'Anywhere';//Étiquette par défaut si aucune valeur d’emplacement n’est fournie.
    } ,[getByValue , locationValue] );

    const durationLabel = useMemo (() => {
        if (startDate && endDate) {
            const start= new Date(startDate as string);
            const end = new Date (endDate as string);
            let diff = differenceInDays(end, start);//Calculez la différence en jours

                if (diff === 0) {
                    diff = 1 
                }

                return ` ${diff} Days`;//Renvoie la durée en jours.
        }

        return 'Any week'
        
    },[startDate, endDate]);

    const guestLabel = useMemo (() => {
        if (guestCount) {
            return `${guestCount} Guests`;//Renvoyer le nombre d’invités
        }

        return 'Add Guests';
    },[guestCount]);

    return ( 
        <div 
            onClick={searchModal.onOpen}// ouvrir searchModal 
            className="
            border-[1px]
            w-full
            md:w-auto
            py-2
            rounded-full
            shadow-sm
            hover:shadow-md
            transition
            cursor-pointer
        ">

            <div className="
                flex
                flex-row
                items-center
                justify-between">

                <div 
                    className="
                    text-sm
                    font-semibold
                    px-6"
                >
                    {locationLabel} {/* afficher*/}
                </div>
                <div 
                    className="
                    hidden 
                    sm:block
                    text-sm
                    font-semibold
                    px-6
                    border-x-[1px]
                    flex-1
                    text-center"
                >
                    {durationLabel} {/* afficher*/}
                </div>
                <div className="text-sm pl-6 text-black-600
                    flex
                    flex-row
                    items-center
                    gap-3">
                    <div className="hidden sm:block font-semibold ">
                       {guestLabel} {/* afficher*/}
                    </div>
                    <div className="p-2 bg-rose-500 rounded-full
                        text-white">
                        <BiSearch size={18} />
                    </div>
                </div>

            </div> 
        </div>
    );
}
 
export default Search;

