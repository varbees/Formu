import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import React, { useState } from 'react';
import { SidebarBtnElementDragOverlay } from './SidebarBtnElement';
import FormElements, { ElementsType } from './FormElements';

const DragOverlayWrapper = () => {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: evt => {
      setDraggedItem(evt.active);
    },
    onDragCancel: evt => {
      setDraggedItem(null);
    },
    onDragEnd: evt => {
      setDraggedItem(null);
    },
  });
  let node = <div>No Drag Overlay</div>;
  if (!draggedItem) return null;
  const isSidebarBtnElement = draggedItem.data?.current?.isDesignerBtnElement;
  if (isSidebarBtnElement) {
    const type = draggedItem.data?.current?.type as ElementsType;
    node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />;
  }
  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
