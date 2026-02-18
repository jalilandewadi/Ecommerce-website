import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalButton = ({amount,onSuccess,onError}) => {
    return <PayPalScriptProvider options={{"client-id": "Aff0mMZVqfWUuiGoRgyujHPoYCgnwtD41oXAtLGYA2ESW092jrt-YHNrphu23ixjFp47ikSwZV29-r9E"}}>
        <PayPalButtons style={{layout: "vertical"}}
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [{amount: {value: amount}}]
                })
            }}
            onApprove={(data, actions) => {
                return actions.order.capture().then(onSuccess)
            }}
            onError={onError}/>
    </PayPalScriptProvider>
}

export default PayPalButton;