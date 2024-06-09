'use client';
// Importation de diverses icônes depuis la bibliothèque react-icons.
import Container from "../container";
import {TbBeach, TbMountain, TbPool, TbHome, TbBed} from 'react-icons/tb';
import {GiCactus, GiForestCamp, GiIsland} from 'react-icons/gi';
import {MdOutlineVilla, MdNaturePeople, MdSchool, MdApartment} from 'react-icons/md';
import { IoDiamond } from "react-icons/io5";
import { FaSnowflake ,FaHospital } from "react-icons/fa6";
import CategoryBox from "../categoryBox";
// Importation des hooks pour la navigation et la gestion des paramètres d'URL depuis next/navigation.
import { usePathname, useSearchParams } from "next/navigation";


// Définir un tableau d'objets catégorie avec des étiquettes, des icônes et des descriptions.
export const categories = [

    {label:'Beach', icon: TbBeach, description:'this property is close to the beach'},
    {label:'bedrooms', icon: TbBed, description:'this property is for bedrooms '},
    {label:'modern', icon: MdOutlineVilla, description:'this property is modern'},
    {label:'countryside', icon: TbMountain, description:'this property is in the countryside'},
    {label:'pools', icon: TbPool, description:'this property has a pool'},
    {label:'Islands', icon: GiIsland, description:'this property is on an island'},
    {label:'Farms', icon: MdNaturePeople, description:'this property is close to nature'},
    {label:'Tiny house', icon: TbHome, description:'this property is for individual houses'},
    {label:'Student Lounge', icon: MdSchool, description:'this property is a student lounge'},
    {label:'Camping', icon: GiForestCamp, description:'this property has camping activities'},
    {label:'snow', icon: FaSnowflake, description:'this property has houses in snowy places'},
    {label:'Apartement', icon: MdApartment, description:'this property is an apartement'},
    {label:'desert', icon: GiCactus, description:'this property is in the desert'},
    {label:'Near hospitals', icon: FaHospital, description:'this property is for houses near the hospitals'},
    {label:'lux', icon: IoDiamond, description:'this property is a luxurious'},
    
    
    
]


const Categories = () => {
    const params = useSearchParams(); // Obtenir les paramètres d'URL.
    const categoty = params?.get('category');// Obtenir le paramètre 'category' de l'URL.
    const pathname = usePathname();// Obtenir le chemin actuel.


    const isMainPage = pathname === '/'; // Vérifier si le chemin actuel est la page d'accueil

    if (!isMainPage) {
        return null ;// Si ce n'est pas la page principale, ne rien rendre.
    }

    return ( 
        <Container>
            <div 
               className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
               {categories.map((item) => (
                <CategoryBox 
                key={item.label}
                label={item.label}
                selected={categoty === item.label}
                icon={item.icon} />


               ))}
            </div>
        </Container>
     );
}
 
export default Categories; 