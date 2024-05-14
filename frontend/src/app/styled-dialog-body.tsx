import { Dialog } from '@headlessui/react';


export function StyledDialogBody({title, children}: {title: string, children: React.ReactNode}) {
  return (
    <>
      <div className="fixed inset-0 backdrop-brightness-50 backdrop-blur" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <Dialog.Panel className="mx-auto max-w-lg rounded-md outline outline-2 outline-white bg-dark-neutral text-white p-2">
          <Dialog.Title className="text-center text-lg font-bold">{title}</Dialog.Title>
          {children}
        </Dialog.Panel>
      </div>
    </>
  );
}
