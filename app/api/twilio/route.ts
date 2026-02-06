import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

// Initialize Sanity Client (server-side only with write token)
const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN, // Requires Write Token
    useCdn: false,
});

export async function POST(req: NextRequest) {
    try {
        // Parse the form data from Twilio
        const formData = await req.formData();
        const body: any = {};
        formData.forEach((value, key) => (body[key] = value));

        const incomingBody = body.Body; // The SMS text
        const sender = body.From; // The sender's phone number

        console.log('Received SMS from:', sender, 'Message:', incomingBody);

        // Basic Security: Check if sender is the allowed number
        // Ensure ALLOWED_PHONE_NUMBER starts with +90... (or relevant country code) in .env.local
        const allowedNumber = process.env.ALLOWED_PHONE_NUMBER;

        if (allowedNumber && sender !== allowedNumber) {
            console.warn(`Unauthorized SMS attempt from ${sender}`);
            return new NextResponse('<Response></Response>', {
                status: 403,
                headers: { 'Content-Type': 'text/xml' },
            });
        }

        // Save to Sanity
        await client.create({
            _type: 'secretMessage',
            text: incomingBody,
            sender: sender,
            timestamp: new Date().toISOString(),
            isVisible: true,
        });

        console.log('Secret message saved to Sanity');

        // Respond to Twilio (Twilio expects TwiML XML)
        // We send an empty response to acknowledge receipt without sending an SMS back (saving money).
        const xmlResponse = `
      <Response>
      </Response>
    `;

        return new NextResponse(xmlResponse, {
            status: 200,
            headers: {
                'Content-Type': 'text/xml',
            },
        });

    } catch (error) {
        console.error('Error processing Twilio webhook:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
