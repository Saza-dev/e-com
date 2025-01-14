"use Client"

import { CartContextProvider } from "@/hooks/useCart";

interface CartProviderPRops{
    children: React.ReactNode
}

const CartProvider: React.FC<CartProviderPRops>= ({children}) => {
    return (
        <CartContextProvider>
            {children}
        </CartContextProvider>
    )
}

export default CartProvider;