'use client';

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import useRegisterModal from "@/app/hooks/UseRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import MenuItem from "./Menuitem";
import Avatar from "../Avatar";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";


interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {

    const router = useRouter();//Gère la navigation dans l’application.
    const RentModal = useRentModal();
    const RegisterModal = useRegisterModal();
    const loginModal = useLoginModal();

    const [isOpen, setIsOpen] = useState(false);//Gère si le menu est ouvert ou fermé.
    
    //Une fonction de rappel qui bascule l’état isOpen.
    const toggleOpen = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    //Une fonction de rappel qui vérifie si un utilisateur est connecté Sinon, il ouvre la fenêtre loginModal, sinon il ouvre rentModal.
    const onRent = useCallback( () => {
        if (!currentUser) {
            return loginModal.onOpen();        
    }
    RentModal.onOpen();
    },[currentUser,loginModal,RentModal]);
    
    return ( 
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div 
                    onClick={onRent}
                    className="
                        hidden
                        md:block
                        text-sm 
                        font-semibold 
                        py-3 
                        px-4 
                        rounded-full 
                        hover:bg-neutral-100 
                        transition 
                        cursor-pointer
                    "
                >
                    Quikstay your home
                </div>
                <div 
                    onClick={toggleOpen}
                    className="
                        p-4
                        md:py-1
                        md:px-2
                        border-[1px] 
                        border-neutral-200 
                        flex 
                        flex-row 
                        items-center 
                        gap-3 
                        rounded-full 
                        cursor-pointer 
                        hover:shadow-md 
                        transition
                    "
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div 
                    className="
                        absolute 
                        rounded-xl 
                        shadow-md
                        w-[40vw]
                        md:w-3/4 
                        bg-white 
                        overflow-hidden 
                        right-0 
                        top-12 
                        text-sm
                    "
                >
                    <div className="flex flex-col cursor-pointer">
                        {/* S’il y a un currentUser, afficher les éléments de menu suivants */}
                        {currentUser ? (
                            <>
                                <MenuItem label="My reservations" onClick={() => router.push("/reservations")} />
                                <MenuItem label="My favorites" onClick={() => router.push('/favorites')} />
                                <MenuItem label="My accommodations" onClick={() => router.push("/accomodations")} />
                                <MenuItem label="My properties" onClick={() => router.push("/properties")} />
                                <MenuItem label="Quikstay your home" onClick={RentModal.onOpen} />
                                <hr />
                                <MenuItem label="Logout" onClick={() => signOut()} />
                            </>
                        ) : (
                            <> {/* S’il n’y a pas currentUser, afficher les éléments de menu suivants */}
                                <MenuItem label="Login" onClick={loginModal.onOpen} />
                                <MenuItem label="Sign up" onClick={RegisterModal.onOpen} />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default UserMenu;