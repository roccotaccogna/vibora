import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

function ProductCard({ product }) {
    const { user } = useUserStore();
    const { addToCart } = useCartStore();

    const handleAddToCart = () => {
        if(!user) {
            toast.error("Please login to add products to cart", { id: "login"});
            return 
        } else {
            // add to cart
            addToCart(product);
        }
    };

  return (
    <div 
        className="flex w-full relative flex-col overflow-hidden 
                   rounded-lg border border-gray-700 shadow-lg"
    >
        <div className="relative mt-3 mx-3 flex h-60 overflow-hidden rounded-xl">
            <img 
                src={product.image} 
                alt="product image" 
                className="object-cover w-full" 
            />
        </div>

        <div className="mt-4 px-5 pb-5">
            <h5 className="text-xl text-center font-semibold-tracking-tight text-white">
                {product.name}
            </h5>
            <div className="mt-2 mb-5 flex items-center justify-center">
                <p>
                    <span className="text-3xl font-bold text-blue-400">
                        {product.price} €
                    </span>
                </p>
            </div>

            <div className="flex justify-center items-center">
                <button
                    className="flex items-center justify-center rounded-lg bg-blue-600
                            px-5 py-2.5 text-center text-sm font-medium text-white
                            hover:bg-blue-700 focus:outline-none focus:ring-4 
                            focus:ring-blue-300 cursor-pointer"
                    onClick={handleAddToCart}
                >
                    <ShoppingCart size={22} className="mr-2" />
                    Add to cart
                </button>
            </div>
        </div>
    </div>
  )
}

export default ProductCard;