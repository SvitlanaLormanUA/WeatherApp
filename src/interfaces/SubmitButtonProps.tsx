export interface SubmitButtonInterface {
    onClick?: () => void; 
    children: React.ReactNode; 
    className?: string; 
    link?: string;
    isFormValid: boolean;
}