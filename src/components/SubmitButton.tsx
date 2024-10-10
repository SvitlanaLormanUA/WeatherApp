import { SubmitButtonInterface } from "../interfaces/SubmitButtonProps";

export default function SubmitButton({ onClick, children, className }: SubmitButtonInterface) {
    return (
        <>
           <button 
                 onClick={onClick}
                 className="
                    mt-4 
                    bg-blue-500 
                    text-white 
                    py-2 
                    px-4 
                    rounded-lg 
                    hover:bg-blue-700 
                    hover:text-gray-200
                ">
                {children}
            </button>
    </>
    )

}