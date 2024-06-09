import prisma from "../libs/prismadb";

// Définir une interface pour les paramètres qui peuvent être utilisés pour filtrer les annonces.
export interface IListingsParams {
    userId?: string;
    guestCount?:number;
    roomCount?:number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?:string;
    category?:string;
}

// La fonction principale pour récupérer les annonces en fonction des paramètres de filtre fournis.
export default async function getListings(
    params :IListingsParams
) {
    try {
        const {
            userId,
            guestCount,
            roomCount,
            bathroomCount,
            startDate,
            endDate,
            locationValue,
            category
        } = params;
         
        // Initialiser l'objet de requête.
        let query:any = {};

        // Ajouter userId à la requête s'il est fourni.
        if (userId) {
            query.userId = userId;
        }
        
        if (category) {
            query.category = category;
        }
        
        // Assurer que la valeur est traitée comme un nombre.
    
        if (roomCount) {
            query.roomCount = {
                gte: +roomCount 
            }
        }

        if (guestCount) {
            query.guestCount = {
                gte: +guestCount
            }
        }

        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount
            }
        }

        if (locationValue) {
            query.locationValue = locationValue;
        }
         
         // Cela garantit que les annonces avec des réservations se chevauchant dans la plage de dates spécifiée sont exclues
        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR:[
                            {
                                endDate: {gte: startDate},
                                startDate:{lte: startDate},
                            },
                            {
                                startDate: {lte: endDate},
                                endDate: {gte: endDate}
                            }
                        ]
                    }
                }
            }
        }
         
        // Récupérer les annonces de la base de données correspondant aux conditions de la requête.
        // Trier les résultats par date de création par ordre décroissant.
        const listings = await prisma.listing.findMany({
            where : query,
            orderBy:{
                createdAt:'desc'
            }
        });

        const safeListings = listings.map((listing)=>({
        ...listing,
        createdAt: listing.createdAt.toISOString(),
        }));
        
        return safeListings;

    }catch(error:any){
        throw new Error(error);
    }
}