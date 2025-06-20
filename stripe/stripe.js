// import Stripe from 'stripe'
// import dotenv from 'dotenv';

// dotenv.config();

// const stripe = Stripe(process.env.STRIPE_KEY);

// export const AddStripe =  async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price_data: {
//             currency: 'usd',
//             product_data: {
//               name: 'Product Name',
//             },
//             unit_amount: 6000, 
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: `${process.env.ORIGIN_URI}/dealer/success`,
//       cancel_url: `${process.env.ORIGIN_URI}/dealer/cancel`,
//     });

//     res.json({ id: session.id });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

