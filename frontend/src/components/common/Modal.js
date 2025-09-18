import React from 'react';
import { Dialog } from '@headlessui/react';

export default function Modal({ isOpen, setIsOpen, title, children }) {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-40 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Panel className="mx-auto w-full max-w-lg bg-white rounded-2xl p-6 shadow-lg">
          <Dialog.Title className="text-lg font-semibold mb-3">{title}</Dialog.Title>
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

