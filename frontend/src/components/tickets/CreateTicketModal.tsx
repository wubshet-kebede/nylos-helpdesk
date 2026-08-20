import Modal from "../common/Modal";
import TicketForm from "./TicketForm";

interface CreateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateTicketModal({
  isOpen,
  onClose,
}: CreateTicketModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create new ticket"
      description="Create an issue and assign it to the appropriate team member."
      size="xl"
    >
      <TicketForm onSuccess={onClose} />
    </Modal>
  );
}
