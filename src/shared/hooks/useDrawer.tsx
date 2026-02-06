import { useCallback, useEffect, useState } from 'react';
import { useDimensions } from './useDimensions';
import { useLocation } from 'react-router';
import { mobileBP } from '../config/config';

export const useDrawer = (widthBreakpoint = mobileBP['800px']) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { w } = useDimensions();
  const location = useLocation();

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  useEffect(() => {
    if (!w || w === 0) return;
    const mobile = w <= widthBreakpoint;
    setIsMobile(mobile);

    if (!mobile) setIsOpen(false);
  }, [w, widthBreakpoint]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return { isMobile, isOpen, open, close, toggle };
};
