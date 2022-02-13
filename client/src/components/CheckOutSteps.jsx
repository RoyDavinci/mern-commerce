import React from "react";

const CheckOutSteps = ({ step1, step2, step3, step4 }) => {
	return (
		<div className='row checkout-steps'>
			<div className={step1 ? `active` : ""}>SignIn</div>
			<div className={step2 ? `active` : ""}>Shipping</div>
			<div className={step3 ? `active` : ""}>Payment</div>
			<div className={step4 ? `active` : ""}>Place Order</div>
		</div>
	);
};

export default CheckOutSteps;
