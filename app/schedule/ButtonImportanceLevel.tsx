import React from 'react';

interface ButtonImportanceLevelProps {
    opt: Record<string, string>;
    importance: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const ButtonImportanceLevel = ({opt, importance, onChange}: ButtonImportanceLevelProps) => {
    const isChecked = importance === opt.value;
                                        
    // Dynamic style strings tailored to your custom colors
    const activeClass = `bg-[${opt.color}]/10 border-[${opt.color}] text-[${opt.color}]`;
    const inactiveClass = `border-[#424754]/50 text-[${opt.color}] hover:bg-[${opt.color}]/5`;

    return (
        <label 
        key={opt.value}
        className={`flex-1 flex items-center justify-center rounded border text-xs font-bold py-2 transition-colors uppercase cursor-pointer select-none ${
            isChecked ? activeClass : inactiveClass
        }`}
        >
            {/* Visually hidden radio input for accessibility */}
            <input
                type="radio"
                name="importanceLevel"
                value={opt.value}
                checked={isChecked}
                onChange={onChange}
                className="sr-only" // Tailwind class to hide visually but keep accessible
            />
            {opt.label}
        </label>
    );
};

export default ButtonImportanceLevel;