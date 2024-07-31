import { CartContext } from "../contexts/CartContext";
import CartItem from "../components/CartItem";
import { useContext } from "react";
import { formatNumber } from "../utils/formatNumber";
import { Link } from "react-router-dom";

function CartItems() {
    const { cart, total } = useContext(CartContext);
    console.log(cart);

    return (
        <div className="pt-20 mb-80 container mx-auto max-h-screen h-screen">
            <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
            {cart.length > 0 ? (
                <div className="mx-auto max-w-5xl mb-40 px-4 md:px-6 lg:px-8 flex flex-col md:flex-row md:space-x-6">
                    <div className="rounded-lg bg-slate-100 p-5 md:w-2/3">
                        {cart.map((item) => {
                            return <CartItem item={item} key={item.id} />;
                        })}
                    </div>
                    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                        <div className="mb-2 flex justify-between">
                            <p className="text-gray-700">Subtotal</p>
                            <p className="text-gray-700">{formatNumber(total)}</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between">
                            <p className="text-lg font-bold">Total</p>
                            <div>
                                <p className="mb-1 text-lg font-bold">{formatNumber(total)}</p>
                            </div>
                        </div>
                        <div className="w-full flex justify-center items-center text-center">
                            <Link
                                to={"/order"}
                                className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
                            >
                                Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container mx-auto flex justify-center items-center h-full">
                    <img src="https://nguyensinh.vn/assets/images/cart/empty-cart.png" alt="Empty cart" />
                </div>
            )}
        </div>
    );
}

export default CartItems;
