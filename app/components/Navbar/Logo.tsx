'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return ( 
    <Image
      onClick={() => router.push('/')} // Lorsque vous cliquez sur l’image, accédez à la page d’accueil ('/').
      className="hidden md:block cursor-pointer" 
      src="/images/logo.png" 
      height="100" 
      width="100" 
      alt="Logo" 
      priority={true}
      style={{ width: "auto", height: "auto" }}
    />
   );
}
 
export default Logo;