import { SubmitButtonInterface } from "../interfaces/SubmitButtonProps";
import { Link } from "react-router-dom";

export default function SubmitButton({ onClick, children, className, link = "/", isFormValid }: SubmitButtonInterface) {
    return (
        <>
           
            {isFormValid ? (
                <Link to={link}>
                    <button
                        onClick={onClick}
                        className={`
                            mt-4 
                            bg-blue-500 
                            text-white 
                            py-2 
                            px-4 
                            rounded-lg 
                            hover:bg-blue-700 
                            hover:text-gray-200
                            ${className}
                        `}
                    >
                        {children}
                    </button>
                </Link>
            ) : (
                <button
                    onClick={onClick}
                    className={`
                        mt-4 
                        bg-blue-500 
                        text-white 
                        py-2 
                        px-4 
                        rounded-lg 
                        hover:bg-blue-700 
                        hover:text-gray-200
                        ${className}
                    `}
                >
                    {children}
                </button>
            )}
        </>
    );
}
