'use client';

import React,{useState,useEffect} from "react";

interface ClientOnlyProps {
    children: React.ReactNode;
  }
  
  const ClientOnly: React.FC<ClientOnlyProps> = ({ 
    children
  }) => {
    const [hasMounted, setHasMounted] = useState(false);
  
    useEffect(() => {
        setHasMounted(true);
    }, []);
  
    if (!hasMounted) return null;
  
    return (
      <>
        {children}
      </>
    );
  };
  
  export default ClientOnly;

  //sert à garantir que certaines parties de plateforme ne sont rendues que côté client, et non pendant le rendu côté serveur