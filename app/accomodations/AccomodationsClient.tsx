'use client';
import {toast} from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { SafeUser, safeReservations } from "../types";
import Heading from "../components/Heading";
import Container from "../components/container";
import ListingCard from "../components/listings/listingCard";

interface AccomodationsClientProps {
    reservations: safeReservations[];
    currentUser?: SafeUser | null;
}

const AccomodationsClient: React.FC<AccomodationsClientProps> = ({
    reservations,
    currentUser

}) => {
    const router = useRouter();
    const [deletingId, setDeletingId ] = useState('');

    const OnCancel = useCallback ((id: string) => {
       setDeletingId(id);

       axios.delete(`/api/reservations/${id}`)
       .then (() => {
          toast.success("Reservation canceled");
          router.refresh();
        })

        .catch(() => {
            toast.error('Something went wrong');
        })

        .finally(() => {
            setDeletingId('');
        })

    },[router]);

    return(
        <Container>
            <Heading
               title="Accommodations"
               subtitle="Bookings on your properties"
            />
            <div 
              className="
                mt-10
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-col-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8"
            >
                {reservations.map((reservation) => (
                    <ListingCard
                       key={reservation.id}
                       data={reservation.listing}
                       reservation={reservation}
                       actionId={reservation.id}
                       onAction={OnCancel}
                       disabled={deletingId === reservation.id}
                       actionlabel="Cancel guest reservation"
                       currentUser={currentUser}
                    />

                ))}

            </div>
        </Container>
    );
}

export default AccomodationsClient;
