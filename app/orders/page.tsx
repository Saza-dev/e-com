import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import OrdersClient from "./OrdersClient";
import getOrdersByUserId from "@/actions/getOrdersByUserId";


const Orders = async () => {

    const currentUser = await getCurrentUser()

    if(!currentUser){
        return <NullData title="Oops! Access denied"/>
    }

    const orders = await getOrdersByUserId(currentUser.id)

    if(!orders){
        return <NullData title="No orders yet..."/>
    }

    return ( 
        <div className="pt-8">
            <Container>
                <OrdersClient orders={orders}/>
            </Container>
        </div>
     );
}
 
export default Orders;



