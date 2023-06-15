import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import Title from "../../../../components/Title";
import { useLoaderData } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    const selectedClassData = useLoaderData();
    const price = selectedClassData.price;
    console.log(selectedClassData)
    return (
        <div>
            <Title heading={"Pay Now"} subHeading={"Pay for enrolling to class"}/>
            <Elements stripe={stripePromise}>
                <CheckoutForm selectedClassData={selectedClassData} price={price}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;