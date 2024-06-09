'use client';

import axios from "axios";//importer axios pour effectuer des requêtes HTTP

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import Input from "../Inputs/Input";
import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";
import useRegisterModal from "@/app/hooks/UseRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Button from "../Button";
import toast from "react-hot-toast";//Importer une bibliothèque de notifications toast
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal= () => {
  const loginModal = useLoginModal();// Accéder au hook  loginModal
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);//État de suivi de l’état de chargement de la soumission du formulaire

  //Gestion des formulaires
  const { 
    register, 
    handleSubmit,
    formState: {errors,},

  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
  });

  //Gestionnaire de soumission de formulaires
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);//Définir l’état de chargement sur true

    // Effectuer une requête POST pour inscrire un point de terminaison
    axios
    .post('/api/register', data)
    .then(() => {
      toast.success('Success!')//notification
      registerModal.onClose();//fermer
      loginModal.onOpen();
     })

    .catch((error) => {
      toast.error('Something went wrong');// notification d'erreur
    })

    .finally(() => {
      setIsLoading(false);//Réinitialiser l’état de chargement
    });
  };

  //Basculer entre registerModal et LoginModal
  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);


    const bodyContent = (
    <div className="flex flex-col gap-4">

      <Heading
        title="Welcome"
        subtitle="Create an account !"
      />

      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />

      <Button 
        outline 
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')} 
      />
      
      
      <div 
        className="
          text-neutral-500 
          text-center 
          mt-2
          font-light
        "
      >
        <div className=" justify-center flex flex-row items-center gap-2">
          <div>
          Already have an account?
          </div>

          <div
          onClick={toggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline ">
                
             Log in
            </div>
          </div>
        
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;
//Ce code crée une modale pour l’inscription de l’utilisateur avec des entrées de formulaire pour l’e-mail, le nom et le mot de passe.
// Lors de l’envoi, il envoie une requête POST à un point de terminaison d’inscription,
// affiche des notifications toast en cas de réussite ou d’échec.
//bascule entre les modalités d’inscription et de connexion. 
//La modale offre également une option pour se connecter avec Google.