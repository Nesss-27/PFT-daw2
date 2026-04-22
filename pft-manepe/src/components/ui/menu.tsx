'use client';

import { useRef, useState, useCallback, ReactNode } from 'react';

interface MenuProps {
  titulo: string;
  children: ReactNode;
  xmen: number;
  ymen: number
}
function Menu({ titulo, children,xmen,ymen}: MenuProps ) {
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x: xmen, y: ymen });

  // useCallback garantiza que sea siempre la misma función en memoria
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    setPos({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  }, []); // [] = no depende de nada, nunca se recrea

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    offset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [pos, handleMouseMove, handleMouseUp]);

  return (
    <div
      className="bg-black w-40 cursor-grab text-left p-1 select-none"
      style={{ position: 'absolute', left: pos.x, top: pos.y }}
      onMouseDown={handleMouseDown}
    >
      <h2>{titulo}</h2>
      {children}
    </div>
  );
}

export default Menu;