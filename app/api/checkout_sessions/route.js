// route.js
import Stripe from 'stripe';
import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const {amount, userId, userName, accomodationId, accomodationName} = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'kes',
            product_data: {
              name: 'Accommodation Payment',
            },
            unit_amount: amount * 100, // Stripe accepts amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
    });

    //add payment data to firestore
    await addDoc(collection(db, "payments"),{
      paymentId: session.id,
      userId: userId, 
      userName:userName,
      accomodationId:accomodationId,
      accomodationName:accomodationName,
      amount:amount, 
      createdAt: serverTimestamp()
    })

    return new Response(JSON.stringify({ sessionId: session.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    return new Response(JSON.stringify({ error: 'Failed to create checkout session' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
