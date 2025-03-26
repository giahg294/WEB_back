import { Request, Response } from "express";
import { handleAdhesionCreation } from "./services/handleAdhesionCreation";
import { handleEventCreation } from "./services/handleEventCreation";
import { handleAdhesionPayment } from "./services/handleAdhesionPayment";
import { handleEventPayment } from "./services/handleEventPayment";

export const webhookHandler = (req: Request, res: Response) => {
  const { data, eventType } = req.body;
  console.log(eventType);

  try {
    if (eventType === "Form") {
      if (data.formType === "Membership") {
        console.log("Membership form received");
        handleAdhesionCreation({ nom: data.formSlug, url: data.url });
      } else if (data.formType === "Event") {
        console.log("Event form received");
        handleEventCreation({ nom: data.formSlug, url: data.url });
      } else {
        console.log("Unknown Event type");
      }
    } else if (eventType === "Payment") {
      const { order } = data;
      if (data.order.formType === "Membership") {
        console.log("Membership payment received");
        handleAdhesionPayment({
          type: order.formType,
          membershipName: order.formSlug,
          amount: data.items[0].amount,
          nom: data.payer.firstName,
          prenom: data.payer.lastName,
          email: data.payer.email,
        });
      } else if (data.order.formType === "Event") {
        console.log("Event payment received");
        handleEventPayment({
            formType: order.formType,
            formSlug: order.formSlug,
            nom: data.payer.firstName,
            prenom: data.payer.lastName,
            email: data.payer.email,
            amount: data.items.map((item: any) => item.amount),
        });
      } else {
        console.log("Unknown Event type");
      }
    } else {
      console.log("Unknown event type");
    }
    res.status(200).send("Webhook received");
  } catch (error) {
    console.error(error);
    res.status(500).send("Webhook error");
  }
};
