import { Listing, Reservation, User } from "@prisma/client";

export type SafeListing = Omit <
   Listing,
   "createdAt"
> & {
    createdAt:string;
}

export type  safeReservations = Omit <
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"

> & {
    createdAt: string;
    startDate:string;
    endDate: string;
    listing: SafeListing
}

export type SafeUser = Omit <
User,
"createdAt" | "updated" | "emailVerified"
> & {
    createdAt:string;
    updated:string;
    emailVerified:string | null;
};


//Ces types transforment certains champs (généralement des champs de date) d’objets Date en chaînes.
// Cette transformation est souvent nécessaire pour la sérialisation JSON, 
//car les objets Date ne sont pas toujours bien gérés par JSON.