import { CartItem } from "../interfaces/cart-item.interface";
import { renderCartList } from "./cart-list";

// 1. Definir la variable del cart CartItem[]
export const cartArray: CartItem[] = JSON.parse(
  localStorage.getItem("cart") || "[]"
);

// 2. Crear un método para agregar un item al cart

export const addToCart = ({
  title,
  id,
  price,
}: {
  title: string;
  id: number;
  price: number;
}) => {
  const itemInCart = cartArray.find((cartItem) => cartItem.id === id);
  if (itemInCart) {
    itemInCart.quantity += 1;
  } else {
    cartArray.push({ title, id, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cartArray));
  renderCartList();
};

// 3. Crear un método para eliminar un item del cart

export const removeFromCart = (id: number) => {
  const itemIndex = cartArray.findIndex((cartItem) => cartItem.id === id);

  if (cartArray[itemIndex].quantity > 1) {
    cartArray[itemIndex].quantity -= 1;
  } else {
    cartArray.splice(itemIndex, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cartArray));
  renderCartList();
};

// 4. Crear un método para obtener el total del cart
export const getTotal = () =>
  cartArray.reduce((acc, item) => acc + item.price * item.quantity, 0);
