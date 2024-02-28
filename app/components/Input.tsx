import InputMask from 'react-input-mask';

interface InputProps {
    label: string;
    type: string;
    placeholder?: string;
    value: string | undefined;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id: string;
    required: boolean;
    mask?: string;
}

export default function Input({ label, onChange, placeholder, type, value = '', id, required, mask = '' }: InputProps) {
    return (
        <>
            <label htmlFor={id}>{label}{required && '*'}</label>
            <InputMask
                mask={mask}
                type={type}
                name={id}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        </>
    );
}