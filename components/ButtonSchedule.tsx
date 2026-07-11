import useMouseDownOutside from '@/lib/hooks/UseMouseDownOutside';
import React, { useRef, useState } from 'react'
import FloatingWrapper from './FloatingWrapper';
import EventForm from '@/features/create-event/EventForm';


interface ButtomSchedulerProps {
    children: React.ReactNode;
    style: string
}
export default function ButtonSchedule(
    { children, style} : ButtomSchedulerProps
) {
    const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
    const formRef = useRef<HTMLDivElement>(null);
  
    useMouseDownOutside(
      formRef as React.RefObject<HTMLDivElement>, 
      isOpenForm, 
      () => setIsOpenForm(false)
    );
  
    return (
      <>
        <FloatingWrapper isOpen={isOpenForm} onClose={() => setIsOpenForm(false)}>
          <EventForm ref={formRef as React.RefObject<HTMLDivElement>} onCancel={() => setIsOpenForm(false)} />
        </FloatingWrapper>
          
        <button 
            onClick={() => setIsOpenForm(true)} 
            className={style}>
                {children}
        </button>
      </>
        
    );
}
