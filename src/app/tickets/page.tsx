import TicketsLayout from "./(tickets)/layout";
import SellerTickets from "./(tickets)/seller-tickets/page";

export default function Tickets() {
  return (
    <TicketsLayout>
      <SellerTickets />
    </TicketsLayout>
  );
}
