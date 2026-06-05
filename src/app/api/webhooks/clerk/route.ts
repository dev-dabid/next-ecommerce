import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    return new Response("Error: Missing WEBHOOK_SECRET from Clerk", {
      status: 500,
    });
  }

  const headerList = await headers();

  const svix_id = headerList.get("svix-id");
  const svix_timestamp = headerList.get("svix-timestamp");
  const svix_signature = headerList.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing svix headers", { status: 400 });
  }

  const body = await req.text();
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-signature": svix_signature,
      "svix-timestamp": svix_timestamp,
    }) as WebhookEvent;
  } catch (error) {
    console.error("Svix headers failed: ", error);
    return new Response("Error: Verification failed", { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const { two_factor_enabled } = evt.data;
    return new Response(
      JSON.stringify({
        two_factor_enabled,
      }),
    );
  }
}

// import { Webhook } from "svix";
// import { headers } from "next/headers";
// import { WebhookEvent } from "@clerk/nextjs/server";
// import prisma from "@/lib/prisma";

// export async function POST(req: Request) {
//   const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

//   if (!WEBHOOK_SECRET) {
//     return new Response("Error: Missing WEBHOOK_SECRET from Clerk", {
//       status: 500,
//     });
//   }

//   const headerList = await headers();

//   const svix_id = headerList.get("svix-id");
//   const svix_timestamp = headerList.get("svix-timestamp");
//   const svix_signature = headerList.get("svix-signature");

//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response("Error: Missing svix headers", { status: 400 });
//   }

//   const body = await req.text();

//   const wh = new Webhook(WEBHOOK_SECRET);
//   let evt: WebhookEvent;

//   try {
//     evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature,
//     }) as WebhookEvent;
//   } catch (err) {
//     console.error("Error: Fake signature, or it could be hacking!", err);
//     return new Response("Error: Verification failed", { status: 400 });
//   }

//   const eventType = evt.type;

//   if (eventType === "user.created") {
//     const { id, email_addresses, first_name, last_name } = evt.data;

//     const email = email_addresses?.[0]?.email_address;

//     if (!id || !email) {
//       return new Response("Error: Missing user data fields", { status: 400 });
//     }

//     await prisma.user.upsert({
//       where: { id: id },
//       update: {
//         email: email,
//         firstName: first_name || "",
//         lastName: last_name || "",
//       },
//       create: {
//         id: id,
//         email: email,
//         firstName: first_name || "",
//         lastName: last_name || "",
//         password: "",
//       },
//     });

//     console.log(`🚀 Tagumpay! Ang user na ${id} ay pumasok na sa Supabase!`);
//   }

//   return new Response("Webhook processed successfully", { status: 200 });
// }
