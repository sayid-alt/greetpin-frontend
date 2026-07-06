import React from 'react';

interface ButtonImportanceLevelProps {
    // Highly recommended to type this strictly instead of Record<string, string>
    opt: { value: string; label: string; color: string };
    importance: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const ButtonImportanceLevel = ({ opt, importance, onChange }: ButtonImportanceLevelProps) => {
    const isChecked = importance === opt.value;

    // We use standard Tailwind for structure, but handle the custom colors via inline styles
    return (
        <label 
            className={`flex-1 flex items-center justify-center rounded border text-xs font-bold py-2 transition-colors uppercase cursor-pointer select-none`}
            style={{
                // Active state uses the custom color for border, text, and an alpha-adjusted background
                // Inactive state uses a default dark border, but still styles the text color
                borderColor: isChecked ? opt.color : '#42475480', // #424754/50 in hex format
                color: opt.color,
                backgroundColor: isChecked ? `${opt.color}1a` : 'transparent', // 1a adds ~10% opacity in hex
            }}
        >
            <input
                type="radio"
                name="importanceLevel"
                value={opt.value}
                checked={isChecked}
                onChange={onChange}
                className="sr-only" 
            />
            {opt.label}
        </label>
    );
};

export default ButtonImportanceLevel;