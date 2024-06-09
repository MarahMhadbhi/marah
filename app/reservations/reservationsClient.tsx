'use client';

import Heading from "../components/Heading";
import Container from "../components/container";
import {useRouter} from "next/navigation";
import { SafeUser, safeReservations } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/listingCard";

interface ReservationClientProps {
    reservations :safeReservations [];
    currentUser?: SafeUser | null;
 }
const ReservationClient: React.FC<ReservationClientProps> = ({
    reservations,
    currentUser
}) => {
    const router= useRouter();
    const [deletingId, setDeletingId] = useState('');// État pour suivre l'ID de la réservation en cours de suppression

    //pour annuler une réservation
    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        
        // Envoyer une requête DELETE à l'API pour annuler la réservation
        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success('Reservations cancelled');
            router.refresh();
        })
        .catch((error) => {
            toast.error(error?.response?.data?.error);
        })
        .finally(() => {
            setDeletingId('');
        });
        

    },[router]);

    return (
       <Container>
           <Heading
                title="Reservations"
                subtitle="Your reserved accommodations" 
            />
            <div
              className="
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
            ">
                {reservations.map((reservation) => (
                    <ListingCard
                      key={reservation.id}
                      data={reservation.listing}
                      reservation={reservation}
                      actionId={reservation.id}
                      onAction={onCancel}
                      disabled={deletingId === reservation.id}
                      actionlabel="Cancel reservation"
                      currentUser={currentUser}
                    />
                ))}

            </div>
       </Container>
    );
}
export default ReservationClient;


