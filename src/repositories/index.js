import { ProductDAO, CartDAO, UserDAO, MessageDAO, TicketDAO } from "../dao/factory.js";
import ProductRepository from "./product.repository.js";
import CartRepository from "./cart.repository.js";
import UserRepository from "./user.repository.js";
import MessageRepository from "./message.repository.js";
import TicketRepository from "./ticket.repository.js";

export const ProductService = new ProductRepository(new ProductDAO());
export const CartService = new CartRepository(new CartDAO());
export const UserService = new UserRepository(new UserDAO());
export const MessageService = new MessageRepository(new MessageDAO());
export const TicketService = new TicketRepository(new TicketDAO());