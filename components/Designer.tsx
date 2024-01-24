'use client';
import React from 'react';
import DesignerSidebar from './DesignerSidebar';
import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

const Designer = () => {
  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: {
      isDesignerDropArea: true,
    },
  });

  return (
    <div className='flex w-full h-full'>
      <div className='p-4 w-full '>
        <div
          ref={droppable.setNodeRef}
          className={cn(
            'bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col items-center justify-start flex-1 overflow-y-auto',
            droppable.isOver && 'ring-2 ring-primary/20'
          )}
        >
          {!droppable.isOver && (
            <p className='text-3xl text-center text-muted-foreground h-full m-auto flex flex-grow items-center forn-bold'>
              Drag & Drop here
            </p>
          )}
          {droppable.isOver && (
            <div className='p-4 w-full'>
              <div className='rounded-md h-[120px] bg-primary/20'></div>
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
};

export default Designer;
