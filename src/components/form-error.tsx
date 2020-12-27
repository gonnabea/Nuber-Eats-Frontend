
interface IFormErrorProps {
    errorMessage: string;
}

export const FormError: React.FC<IFormErrorProps> = ({errorMessage}) => <span className="font-medium text-red-500"><span>{errorMessage}</span></span>