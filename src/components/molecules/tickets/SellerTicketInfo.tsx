interface SellerTicketInfoProps {
  name: string;
  email: string;
}

const SellerTicketInfo = ({ name, email }: SellerTicketInfoProps) => (
  <div className="mt-6">
    <h2 className="font-semibold text-lg">Seller Info</h2>
    <p>
      <strong>Name:</strong> {name}
    </p>
    <p>
      <strong>Email:</strong> {email}
    </p>
  </div>
);

export default SellerTicketInfo;
