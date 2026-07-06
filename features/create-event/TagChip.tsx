import { X } from 'lucide-react';
import React from 'react';

interface TagChipProps {
    name: string
    type: string
    onClickRemove: (
        event: React.MouseEvent<HTMLButtonElement>, 
        name: string
    ) => void
}


const TagChip = ({name, type, onClickRemove}: TagChipProps) => {
    return (
        <>
            <span>{name} ({type ? type: "undefined"})</span>
            <button 
                type="button" // 👈 Crucial: Prevents hitting enter/click from submitting the form
                onClick={(event) => onClickRemove(event, name)}
                className="flex items-center justify-center hover:opacity-70 transition-opacity focus:outline-none cursor-pointer"
                >
                <X size={14} className="shrink-0" />
            </button>
        </>
    );
};

export default TagChip;