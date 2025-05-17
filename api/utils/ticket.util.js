export const generateTicketId = () => {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `JB-${random}`;
};
