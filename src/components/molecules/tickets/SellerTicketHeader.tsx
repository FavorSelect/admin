import { Button } from "@/components/atoms/Button";
import { MoveLeft } from "lucide-react";
import Image from "next/image";

interface SellerTicketHeaderProps {
  ticketNumber: string;
  subject: string;
  description: string;
  image?: string;
  status: string;
  createdAt: string;
  adminReply?: string;
  onBack: () => void;
}

const SellerTicketHeader = ({
  ticketNumber,
  subject,
  description,
  image,
  status,
  createdAt,
  adminReply,
  onBack,
}: SellerTicketHeaderProps) => (
  <div className="space-y-4">
    <Button onClick={onBack}>
      <MoveLeft size={20} />
    </Button>
    <h1 className="text-xl font-bold">Ticket #{ticketNumber}</h1>
    <div>
      <strong>Subject:</strong> {subject}
    </div>
    <div>
      <strong>Description:</strong> {description}
    </div>
    {image && (
      <div>
        <strong>Image:</strong>
        <Image
          src={image}
          alt="Ticket Attachment"
          width={300}
          height={200}
          className="mt-2 max-w-xs"
        />
      </div>
    )}
    <div>
      <strong>Status:</strong> {status}
    </div>
    <div>
      <strong>Created At:</strong> {new Date(createdAt).toLocaleString()}
    </div>
    <div>
      <strong>Admin Reply:</strong> {adminReply || "No reply yet"}
    </div>
  </div>
);

export default SellerTicketHeader;
