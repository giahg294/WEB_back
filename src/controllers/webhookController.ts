import { Request, Response } from "express";

export const webhookHandler = (req: Request, res: Response) => {
  const { data, eventType } = req.body;
  console.log(eventType);

  try {
    if (eventType === "Form") {
      if (data.formType === "Membership") {
        console.log("Membership form received");
      } else if (data.formType === "Event") {
        console.log("Donation form received");
      } else {
        console.log("Unknown Event type");
      }
    } else if (eventType === "Payment") {
    } else {
      console.log("Unknown event type");
    }
    res.status(200).send("Webhook received");
  } catch (error) {
    console.error(error);
    res.status(500).send("Webhook error");
  }
};
