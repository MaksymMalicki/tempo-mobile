export interface ClientRequestInterface{
  id: string;
  tableNumber: number;
  requestStart: Date;
  status: "pending" | "accepted";
  type: "waiter-call" | "order" | "pay-with-card" | "pay-with-cash";
}
