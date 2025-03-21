import { useCartStore } from "../stores/useCartStore";
import EmptyCart from "../pages/EmptyCart";
import { motion } from "framer-motion";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard";

function CartPage() {
  const { cart } = useCartStore();

  return (
    <div className="py-8 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <motion.div
              className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {cart.length === 0 ? (
                <EmptyCart />
              ): (
                <div className="space-y-6">
                    {cart.map((item) => (
                      <CartItem key={item._id} item={item} />
                    ))}
                </div>
              )}
            </motion.div>

            {cart.length > 0 && (
              <motion.div
                className="mx-auto lg:w-full mt-6 lg:mt-0 max-w-4xl flex-1 space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <OrderSummary />
                <GiftCouponCard />
              </motion.div>
            )}
          </div>
        </div>
    </div>
  )
}

export default CartPage;