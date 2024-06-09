'use client';

import useTunisiaStates from "@/app/hooks/useStates";
import { SafeListing, SafeUser, safeReservations,  } from "@/app/types";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import {format} from 'date-fns';
import Image from 'next/image';
import HeartButton from "../HeartButton";
import Button from "../Button";

// Définir les propriétés que le composant ListingCard peut accepter.
interface ListingCardProps {
    data: SafeListing;
    reservation?:safeReservations;
    onAction?:(id: string) => void;
    disabled?: boolean;
    actionlabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null ;
}

// Définir le composant ListingCard en tant que fonction composant React.
const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionlabel,
    actionId ="",
    currentUser

    }) => {
        const router = useRouter();// pour la navigation
        const {getByValue} = useTunisiaStates();

        // Utilisation de useMemo pour obtenir la localisation à partir de la valeur de location.
        const location = useMemo(() => getByValue(data.locationValue), [data.locationValue, getByValue]);

         // Fonction de rappel pour gérer l'annulation d'une action.
        const handleCancel = useCallback (
            (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if  (disabled) {
                return;

            }
            onAction?.(actionId);
        },[onAction, actionId,disabled]);

        // Utilisation de useMemo pour calculer le prix basé sur la réservation ou les données.
        const price = useMemo(() => {
            if (reservation) {
                return reservation.totalPrice;
            }
            return data.price;
        }, [reservation,data.price]);

          // Utilisation de useMemo pour formater la date de réservation.
         const reservationDate = useMemo(() => {
            if(!reservation) {
                return null;
            }

            const start = new Date(reservation.startDate);
            const end = new Date(reservation.endDate);

            return `${format(start, 'Pp')} - ${format(end, 'Pp')}`

         },[reservation]);
    return (
        <div
           onClick={() => router.push(`/listings/${data.id}`)}
           className="col-span-1 cursor-pointer group">
             <div className="flex flex-col gap-2 w-full">
                <div className="
                   aspect-square
                   w-full
                   relative
                   overflow-hidden
                   rounded-xl">
                     <Image
                       fill
                       alt="Listing"
                       src={data.imageSrc}
                       className="
                         object-cover
                         h-full
                         w-full
                         group-hover:scale-110
                         transition"
                       
                     />
                     <div className="absolute top-3 right-3">
                        <HeartButton
                          listingId={data.id}
                          currentUser={currentUser}
                        />

                     </div>

                </div>
                <div className="font-semibold text-sm">
                   {location?.region},{location?.label}
                </div>
                <div className="font-light text-neutral-500">
                    {reservationDate || data.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold text-xs ">
                        TND  {price}
                    </div>
                    
                    {!reservation && (
                        <div className="font-light">
                            night
                        </div>
                    )}

                    </div>
                       {onAction && actionlabel && (
                          <Button
                             disabled={disabled}
                             small
                             label={actionlabel}
                             onClick={handleCancel}
                           />
                       ) }

                </div>

             </div>
        
    );
}

export default ListingCard;

//Le composant retourne une carte d'annonce avec une image, des informations de localisation, des dates de réservation (si disponibles), et un bouton d'action (si fourni).