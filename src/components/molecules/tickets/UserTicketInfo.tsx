interface UserTicketInfoProps {
  name: string;
  email: string;
}

const UserTicketInfo = ({ name, email }: UserTicketInfoProps) => (
  <div className="mt-6">
    <h2 className="font-semibold text-lg">User Info</h2>
    <p>
      <strong>Name:</strong> {name}
    </p>
    <p>
      <strong>Email:</strong> {email}
    </p>
  </div>
);

export default UserTicketInfo;
