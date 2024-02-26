import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

interface GroupModalProps {
  group: Group;
  fetchGroups: () => void;
  handleRenameGroup: (name: string, id: string) => void;
  handleDeleteGroup: (id: string) => void;
  idGroup: string;
  isActionGood: boolean;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  renameGroupe: boolean;
  setNameGroup: (name: string) => void;
  loading: boolean;
  nameGroup: string;
}

export const GroupModal = ({
  handleDeleteGroup,
  handleRenameGroup,
  idGroup,
  isActionGood,
  isOpen,
  onOpenChange,
  renameGroupe,
  setNameGroup,
  loading,
  nameGroup,
}: GroupModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {renameGroupe ? "Renommer le groupe" : "Supprimer le groupe"}
              <p className="text-sm text-gray-500">
                {renameGroupe
                  ? "Entrez le nouveau nom du groupe"
                  : "Etes-vous sûr de vouloir supprimer le groupe ?"}
              </p>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-3">
                {renameGroupe ? (
                  <Input
                    placeholder="Entrez le nouveau nom du groupe"
                    onChange={(e) => setNameGroup(e.target.value)}
                  />
                ) : (
                  ""
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Annuler
              </Button>
              <Button
                isLoading={loading}
                onPress={
                  isActionGood
                    ? onClose
                    : renameGroupe
                    ? () => handleRenameGroup(nameGroup, idGroup)
                    : () => handleDeleteGroup(idGroup)
                }
                color="primary"
              >
                {renameGroupe ? "Renommer" : "Supprimer"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
