
import { CartContext } from "../contexts/CartContext";
import { useContext, useState } from "react";
import CartItem from "../components/CartItem";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import { IoCardOutline } from "react-icons/io5";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { formatNumber } from "../utils/formatNumber";
import useOrders from "../hooks/order/useOrders";
import { useAuth } from "../contexts/AuthContext"


const Order = () => {
    const { user } = useAuth();

    const { cart, total } = useContext(CartContext);
    const [automatically, setAutomatically] = useState(true);
    const [shipMethod, setShipMethod] = useState({ name: "Flash Delivery", price: 100000, shippingAddress: 'ap 9 luong tam long my ' });
    const { addOrder } = useOrders(user ? user.id : null);
    console.log(user)
    const handleShipChange = (method) => {
        setShipMethod(method);
    };
    const handlePlaceOrder = () => {
        const orderData = {
            cart: cart.map(item => ({
                id: item.id,
                quantity: item.amount,
                storeId: item.storeId,
            })),
            paypal:'Outstanding',
            userId: user.id,
            total: total + shipMethod.price,
            shipping: shipMethod,
            status: 'Processing',
            billing: {
                name: 'John Doe',
                address: '123 Main St, City, Country',
                // Add more billing information as needed
            },

            notes: 'Handle with care', // Example of order notes
            tax: 0, // Example of tax amount
            promoCode: 'SUMMER25',
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }),

        };

        addOrder(orderData)


        // console.log(orderData);
    };
    // const {name ,email,cardHolder,cardNumber,expiryDate,cvc,billingAddress}=users[0];

    return (
        <div className="py-20 container mx-auto">
            <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 pt-10">
                <div className="px-4 pt-8">
                    <p className="text-xl font-medium">Order Summary</p>
                    <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
                    <div className="mt-8 space-y-3 rounded-lg border bg-slate-100 px-2 py-4 sm:px-6">
                        {cart.map((item) => {
                            return <CartItem item={item} key={item.id} />;
                        })}
                        <div className="font-semibold">
                            <span className="mr-2">Subtotal:</span> ${" "}
                            {formatNumber(total)}
                        </div>

                    </div>

                    <form className="mt-5 grid gap-6">
                        <div className=" container mx-auto">
                            <div className="px-4">
                                <p className="text-xl font-medium">Shipping Methods</p>
                                <form className="mt-5 grid gap-6">
                                    <div className="relative" >
                                        <label for="Address" className="mt-4 mb-2 block text-sm font-medium">Email</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="shipAddress"
                                                name="ShipAddress"
                                                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                                placeholder="shipAddress"
                                                value={user?.billingAddress.streetAddress}
                                            />
                                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                                <MdOutlineMapsHomeWork className="text-gray-500" />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="relative" onClick={() => handleShipChange({ name: "Turtle Delivery", price: 80000 })}>
                                        <input className="peer hidden" id="radio_1" type="radio" name="radio" checked={shipMethod.name === "Turtle Delivery"} readOnly />
                                        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                                        <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_1">
                                            <img className="w-14 object-contain" src="https://i.pinimg.com/236x/66/7f/02/667f02a892f7c33986ec5484a49eb1bc.jpg" alt="" />
                                            <div className="ml-5">
                                                <span className="mt-2 font-semibold">Turtle Delivery</span>
                                                <p className="text-sm ">Ship : 80.000 vnd</p>
                                                <p className="text-slate-500 text-sm leading-6">Delivery: 10-12 Days</p>
                                            </div>
                                        </label>
                                    </div>
                                    <div className="relative" onClick={() => handleShipChange({ name: "Flash Delivery", price: 100000 })}>
                                        <input className="peer hidden" id="radio_2" type="radio" name="radio" checked={shipMethod.name === "Flash Delivery"} readOnly />
                                        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                                        <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_2">
                                            <img className="w-14 object-contain" src="https://mytrackcdn.com/images/couriers/flash.jpg.webp" alt="" />
                                            <div className="ml-5">
                                                <span className="mt-2 font-semibold">Flash Delivery</span>
                                                <p className="text-sm ">Ship : 100.000 vnd</p>
                                                <p className="text-slate-500 text-sm leading-6">Delivery: 5-7 Days</p>
                                            </div>
                                        </label>
                                    </div>
                                </form>
                            </div>
                            <div className="mt-6 flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">Selected Shipping Method</p>
                                <p className="font-semibold text-gray-900">{shipMethod.name}: {shipMethod.price.toLocaleString('en')} vnd</p>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="mt-10 bg-gray-50 rounded-xl px-4 pt-8 lg:mt-0">
                    <p className="text-xl font-medium">Payment Details</p>
                    <p className="text-gray-400">Complete your order by providing your payment details.</p>
                    <div className="container mx-auto w-full mt-2">
                        <div>
                            <label className="inline-flex items-center me-5 cursor-pointer">
                                <input
                                    type="checkbox"
                                    value=""
                                    className="sr-only peer"
                                    checked={automatically}
                                    onChange={() => setAutomatically(!automatically)}
                                />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-red-300 dark:peer-focus:ring-red-400 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 ]"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">automatically</span>
                            </label>
                        </div>

                    </div>
                    {
                        automatically ?
                            <div className="">
                                <label for="email" className="mt-4 mb-2 block text-sm font-medium">Email</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="your.email@gmail.com"
                                        value={user?.email}
                                    />
                                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                        <MdOutlineAlternateEmail className="text-gray-500" />
                                    </div>
                                </div>
                                <label for="card-holder" className="mt-4 mb-2 block text-sm font-medium">Card Holder</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="cardHolder"
                                        name="cardHolder"
                                        className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your full name here"
                                        value={user?.cardHolder}
                                    />
                                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                        <FaRegAddressCard className="text-gray-500" />
                                    </div>
                                </div>
                                <label for="card-no" className="mt-4 mb-2 block text-sm font-medium">Card Details</label>
                                <div className="flex">
                                    <div className="relative w-7/12 flex-shrink-0">
                                        <input
                                            type="text"
                                            id="cardNumber"
                                            name="cardNumber"
                                            className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="xxxx-xxxx-xxxx-xxxx"
                                            value={user?.cardNumber}
                                        />
                                        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                            <IoCardOutline className="text-gray-500" />
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        id="expiry"
                                        name="expiry"
                                        className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="MM/YY"
                                        value={user?.expiryDate}
                                    />
                                    <input
                                        type="text"
                                        id="cvc"
                                        name="cvc"
                                        className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="CVC"
                                        value={user?.cvc}
                                    />
                                </div>
                                <label for="billing-address" className="mt-4 mb-2 block text-sm font-medium">Billing Address</label>
                                <div className="flex flex-col sm:flex-row">
                                    <div className="relative flex-shrink-0 sm:w-7/12">
                                        <input
                                            type="text"
                                            id="billingAddress"
                                            name="billingAddress"
                                            className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Street Address"
                                            value={user?.billingAddress.streetAddress}
                                        />
                                        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                            <img className="h-4 w-4 object-contain" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuNKQTiFQNnREfLoqvbzBufxUIwzHhHoAZSA&s" alt="" />
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        id="billingState"
                                        name="billingState"
                                        className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="State"
                                        value={user?.billingAddress.state}
                                    />
                                    <input
                                        type="text"
                                        id="billingZip"
                                        name="billingZip"
                                        className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="ZIP Code"
                                        value={user?.billingAddress.zip}
                                    />
                                </div>

                                <div className="mt-6 border-t border-b py-2">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-900">Subtotal</p>
                                        <p className="font-semibold text-gray-900">{formatNumber(total)}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-900">Shipping</p>
                                        <p className="font-semibold text-gray-900">{formatNumber(shipMethod.price)}</p>
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">Total</p>
                                    <p className="text-2xl font-semibold text-gray-900">{formatNumber(total + shipMethod.price)}</p>
                                </div>
                            </div> : <div className=" block text-sm font-medium">
                                <div class="bg-white py-10 flex justify-center items-center">
                                    <div class="space-y-16">
                                        <div class="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">

                                            <img class="relative object-cover w-full h-full rounded-xl" src="https://i.imgur.com/kGkSg1v.png" />

                                            <div class="w-full px-8 absolute top-8">
                                                <div class="flex justify-between">
                                                    <div class="">
                                                        <p class="font-light">
                                                            Bank
                                                        </p>
                                                        <p class="font-bold  tracking-widest">
                                                            ShinHan
                                                        </p>
                                                    </div>
                                                    <img class="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png" />
                                                </div>
                                                <div class="pt-1">
                                                    <p class="font-light">
                                                        ShinHan
                                                    </p>
                                                    <p class="font-medium text-xl tracking-more-wider">
                                                        110  519  692861
                                                    </p>
                                                </div>
                                                <div class="pt-6 pr-6">
                                                    <div class="flex ">
                                                        <div class="">
                                                            <p class=" font-semibold text-sm">
                                                                To pay attention : <span className="text-xs">
                                                                    The transfer order will be confirmed in five minutes
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }


                    <><button onClick={handlePlaceOrder} className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place Order

                    </button>
                    </>

                </div>
            </div>
        </div>

    )
}

export default Order;
