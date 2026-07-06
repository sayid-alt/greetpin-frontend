import React from 'react';

interface TagsProps {
    tagName: string;
}

const Tags = ({tagName} : TagsProps) => {
    return (
        <>
            <span 
                className="px-2 py-1 bg-[#4d8eff]/10 text-[#adc6ff] border border-[#adc6ff]/30 rounded text-xs font-medium"
                >
                  {tagName}
            </span>
        </>
    );
};

export default Tags;