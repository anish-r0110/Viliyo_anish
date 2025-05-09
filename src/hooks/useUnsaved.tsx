
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Dialog, Flex } from '@radix-ui/themes';


interface UnsavedChangesDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}


interface UseUnsavedChangesOptions {
  onConfirm?: () => void; // Callback for confirmation
  onCancel?: () => void; // Callback for Cancel
}

const UnsavedChangesDialog: React.FC<UnsavedChangesDialogProps> = ({ isOpen, onConfirm, onCancel }) => (
    <Dialog.Root open={isOpen} >
      <Dialog.Content style={{ maxWidth: 450 }}>
    <Dialog.Title>Confirmation</Dialog.Title>
    <Dialog.Description size="2" mb="4">
    You have not submitted the responses and exiting the assignment. Do you wish to?
    </Dialog.Description>
    <Flex gap="3" mt="4" justify="end">
      <Dialog.Close>
        <Button onClick={onCancel} variant="soft" color="gray">
          Save Responses
        </Button>
      </Dialog.Close>
      <Dialog.Close>
        <Button onClick={onConfirm}>Submit</Button>
      </Dialog.Close>
    </Flex>
      </Dialog.Content>
    </Dialog.Root>
);

const useUnsavedChanges = (unsavedChanges: boolean ,  options?: UseUnsavedChangesOptions ) => {
  const router = useRouter();
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        const message = 'You have unsaved changes. Are you sure you want to leave?';
        event.returnValue = message;
        return message;
      }
    };

    const handleRouteChange = (url: string) => {
      if (unsavedChanges) {
        setDialogOpen(true);
        router.events.emit('routeChangeError'); // Cancel navigation
        throw 'routeChange aborted.';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    router.events.on('routeChangeStart', handleRouteChange);

    // Cleanup the event listeners when the component is unmounted
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router, unsavedChanges]);

  const handleConfirm = () => {
    setDialogOpen(false);
    router.events.emit('routeChangeError', undefined); 
    if (options?.onConfirm) {
      options.onConfirm(); // Call the onConfirm callback if provided
    }
  };

  const handleCancel = () => {
    setDialogOpen(false);
    if (options?.onConfirm) {
      options.onConfirm(); // Call the onConfirm callback if provided
    }
  };

  return {
    isDialogOpen,
    DialogComponent: (
      <UnsavedChangesDialog isOpen={isDialogOpen} onConfirm={handleConfirm} onCancel={handleCancel} />
    ),
  };
};

export default useUnsavedChanges;
