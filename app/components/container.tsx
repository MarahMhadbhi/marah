'use client';

interface ContainerProps {
  children: React.ReactNode
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  return ( 
    <div
      className="
        max-w-[2520px]
        mx-auto
        xl:px-20 
        md:px-10
        sm:px-2
        px-4
      "
    >
      {children}
    </div>
   );
}
 
export default Container;
// Le composant Conteneur sert d’enveloppe de mise en page qui centre son contenu et ajuste son remplissage en fonction de la taille de 
