export function getLocalCartID() {
  const cartID = localStorage.getItem("cartID");
  return cartID;
}
