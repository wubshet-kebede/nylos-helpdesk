import Modal from "../common/Modal";
import TicketForm from "./TicketForm";

interface EditTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: {
    id: string;
    title: string;
    description?: string | null;
    priority: "Low" | "Medium" | "High" | "Urgent";
  };
}

export default function EditTicketModal({
  isOpen,
  onClose,
  ticket,
}: EditTicketModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Ticket Details"
      description="Update the title, detailed context, or urgency rating for this ticket."
      size="xl"
    >
      <TicketForm
        initialData={{
          ...ticket,
          description: ticket.description ?? "",
        }}
        onSuccess={onClose}
      />
    </Modal>
  );
}
