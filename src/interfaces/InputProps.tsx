export interface InputProps {
    labelName: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    isError?: boolean; 
    errorMessage?: string; 
}