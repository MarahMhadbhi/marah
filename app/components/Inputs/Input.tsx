'use client';

import { 
  FieldErrors, 
  FieldValues, 
  UseFormRegister 
} from "react-hook-form";



interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors //pour la validation des champs
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text", 
  disabled, 
  formatPrice,
  register,
  required,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        // Affiche le symbole de devise si formatPrice est true
        <span
           
          className="
            text-neutral-700
            absolute
            top-5
            right-1/2
          
          "
        >
          TND
        </span>
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        // si l'input est désactive change... 
        //change le bordure en cas d"erreur 
        className={`
          peer
          w-full
          p-4
          pt-6 
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70 
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
      />
      <label 
        className={`
          absolute 
          text-md
          duration-150 
          transform 
          -translate-y-3 
          top-5 
          z-10 
          origin-[0] 
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}
      >
        {label}
      </label>
    </div>
   );
}
 
export default Input;