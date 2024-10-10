import { InputProps } from "../interfaces/InputProps";

export default function Input({ labelName, value, onChange, type = 'text', isError, errorMessage }: InputProps) {
    return (
        <div className="flex flex-col mb-4">
            <label htmlFor={labelName.toLowerCase()}>{labelName.toLocaleUpperCase()}</label>
            <input
                type={type}
                name={labelName.toLowerCase()}
                id={labelName.toLowerCase()}
                value={value}
                onChange={onChange}
                required
                className={`text-black m-2 p-1 rounded ${isError ? 'border border-red-500' : ''}`} 
            />
            {isError && (
                <span className="text-red-500 text-sm">{errorMessage}</span> 
            )}
        </div>
    );
}