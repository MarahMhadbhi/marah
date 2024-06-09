'use client';
import {create} from 'zustand';//pour créer un registerModalStore

interface RegisterModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const UseRegisterModal =create<RegisterModalStore>((set) => ({
    isOpen:false,
    onOpen: () => set ({isOpen:true}),
    onClose:() => set ({isOpen:false}),
}));

export default UseRegisterModal;
//ce code crée un magasin Zustand pour gérer l’état de RegisterModal




