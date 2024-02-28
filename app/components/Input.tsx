
interface InputProps {
    label: string;
    type: string;
    placeholder?: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id: string;
    required: boolean;
}

export default function Input({ label, onChange, placeholder, type, value, id, required }: InputProps) {
    return (
        <>
            <label htmlFor={id}>{label}{required && '*'}</label>
            <input
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