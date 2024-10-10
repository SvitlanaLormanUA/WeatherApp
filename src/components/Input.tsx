import  '../styles/output.css';
import { InputProps } from '../interfaces/InputPropsInterface';
export default function Input({ labelName }: InputProps) {
    return (
        <>
        <div className="flex flex-col">
        <label htmlFor={labelName.toLowerCase()} >{labelName.toLocaleUpperCase()}</label>
        <input type="text" name={labelName.toLowerCase()} id={labelName.toLowerCase()} required />
        </div>
        </>
    );
}