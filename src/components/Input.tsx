import { InputProps } from '../interfaces/InputPropsInterface';
export default function Input({ labelName }: InputProps) {
    return (
        <>
        <div>
        <label htmlFor={labelName.toLowerCase()} >{labelName.toLocaleUpperCase()}</label>
        <input type="text" name={labelName.toLowerCase()} id={labelName.toLowerCase()} required />
        
        </div>
        </>
    );
}