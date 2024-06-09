'use client';

import {create} from 'zustand';

interface loginModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const UseLoginModal =create<loginModalStore>((set) => ({
    isOpen:false,
    onOpen: () => set ({isOpen:true}),
    onClose:() => set ({isOpen:false}),
}));


export default UseLoginModal;