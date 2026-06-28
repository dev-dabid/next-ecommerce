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
    try {
      const { id, email_addresses } = evt.data;

      await prisma.user.upsert({
        where: {
          id,
        },

        update: {},

        create: {
          id,
          email: email_addresses[0].email_address,
        },
      });

      return new Response("Profile successfully created!", {
        status: 200,
      });
    } catch (error) {
      return new Response("Profile creation unsuccessful");
    }
  }

  if (eventType === "user.updated") {
    try {
      return new Response(JSON.stringify(evt.data));
    } catch (error) {
      return evt.data;
    }
  }
}
