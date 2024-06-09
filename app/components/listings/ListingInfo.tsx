'use client';

import useStates from "@/app/hooks/useStates";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import('../Map'),{
    ssr:false
});

interface ListingInfoProps {
    user:SafeUser;
    description:string;
    guestCount:number;
    roomCount:number;
    bathroomCount:number;
    category:{
        icon:IconType;
        label:string;
        description:string;
    } | undefined
    locationValue:string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    description,
    guestCount,
    roomCount,
    bathroomCount,
    category,
    locationValue
}) => {
    const {getByValue} = useStates();

    const coordinates = getByValue(locationValue)?.latlng;

    const isValidCoordinates = (coords: number[] | undefined): coords is [number, number] => {
        return Array.isArray(coords) && coords.length === 2;
    };

    return(
        <div className="col-span-4 flex-col gap-8">
           <div className="flex flex-col gap-4">
                <div 
                  className="
                  text-lg
                  font-semibold
                  flex 
                  flex-row 
                  items-center
                  gap-4"
                >
                   <div>Hosted by {user?.name}</div>
                    <Avatar src={user?.image}/>

                </div>
                <div 
                    className="
                    flex 
                    flex-row 
                    items-center 
                    gap-4 
                    font-light 
                    text-neutral-500"
                >
                   <div>
                      {guestCount} guests
                   </div>
                   <div>
                      {roomCount} rooms
                   </div>
                   <div>
                      {bathroomCount} bathrooms
                   </div>
                </div>
            </div>
            <hr  className="my-4"/>

            { category && (
                <ListingCategory
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}

            <hr className="my-4" />

            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>

            <hr className="my-4"/>

            
            
              {
                isValidCoordinates(coordinates) && <Map center={coordinates}  /> 
              } 
            
            
              
           

        </div>
    );
}
export default ListingInfo;