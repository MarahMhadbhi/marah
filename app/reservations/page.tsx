import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationClient from "./reservationsClient";

const ReservationPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                  title="Unauthorized"
                  subtitle="Please login"
                />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({
        userId: currentUser.id
    });

    if (reservations.length === 0 ) {
        return (
            <ClientOnly>
                <EmptyState
                   title="No reservations found"
                   subtitle="Looks like you haven't reserved anything"/>
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <ReservationClient
               reservations={reservations}
               currentUser={currentUser}
            />
        </ClientOnly>
    )

}
export default ReservationPage;
// pour voir l’historique de la réservation
