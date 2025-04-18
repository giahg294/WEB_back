import e, { Request, Response } from "express";
import { eventRepository } from "./repositories/EventRepositorie";
import { adhesionRepository } from "./repositories/AdhesionRepository";
import { paymentRepository } from "./repositories/PaymentRepositorie";
import { totalmem } from "os";
import { abonementRepository } from "./repositories/AbonnementRepository";
import Event, { IEvent } from "../model/Event";
import { IUser } from "../model/User";

export class StatController {
  getAdhesionMembers = async (req: Request, res: Response): Promise<void> => {
    console.log("getAdhesionMembers called");
    try {
      const adhesionByMembers = await adhesionRepository.getAllAdhesionWithParticipants();
      let listMembers: {adhesionName: string, userNom: string, userPrenom: string, userEmail: string}[] = [];

      adhesionByMembers.forEach((adhesion) => {
        adhesion.participants.forEach((user: any) => {
          listMembers.push({
            adhesionName: adhesion.nom,
            userNom: user.nom ?? null,
            userPrenom: user.prenom ?? null,
            userEmail: user.email ?? null,
          });
        });
      });
      
      res.json(listMembers);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };
  getAdhesion = async (req: Request, res: Response): Promise<void> => {
    try {
      const adhesion = await adhesionRepository.getAllAdhesions();
      const data = adhesion.map((adhesion) => ({
        nom: adhesion.nom,
        url: adhesion.url,
      }));
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };
  getEventName = async (req: Request, res: Response): Promise<void> => {
    try {
      const events = await eventRepository.getAllEvents();
      const data = events.map((event) => ({
        nom: event.nom,
        slug: event.slug,
        url: event.url,
        date: event.date,
        participantsMax: event.nbrMax,
        participants: event.participants.length,
        complete: (event.nbrMax ?? 1000) <= event.participants.length,
      }));
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };
  updateEvent = async (req: Request, res: Response): Promise<void> => {
    const {eventSlug, max} = req.body;
   
    try {
      const updatedEvent = await Event.findOneAndUpdate({slug: eventSlug}, {nbrMax: max});

      if (!updatedEvent){
        console.log('No event found with slug:', eventSlug);
        res.status(404).json({ message: 'Event not found' });
      }
      res.status(200).json(updatedEvent);
    } 
    catch (error) {
      console.error('Update error:', error);
      res.status(500).json({ message: 'Server error' });
    }

  };
  getPayment = async (req: Request, res: Response): Promise<void> => {
    try {
      const payments = await paymentRepository.getAllPayments();
      const data = payments.map((payment) => ({
        nom: "nom" in payment.userid ? payment.userid.nom : null,
        prenom: "prenom" in payment.userid ? payment.userid.prenom : null,
        email: "email" in payment.userid ? payment.userid.email : null,
        type: payment.type,
        amount: payment.amount / 100,
        createdAt: payment.createdAt,
      }));
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };
  getParticipantsDetailsByEvent = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const eventGrouped = await eventRepository.getEventsGroupedByDate();

      res.json(eventGrouped);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };
  getParticipantsByEvent = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await eventRepository.getEventsGroupedByDate();
      const event = data.map((event) => ({
        date: event.date,
        totalmembers: event.totalParticipants,
      }));
      res.json(event);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };
  getTimeBasedAdhesionPayment = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const payments = await paymentRepository.getAllPayments();
  
      const membershipPayments = payments.filter(
        (payment) => payment.type === "Membership"
      );
      const groupedPayments = membershipPayments.reduce((acc: Record<string, { month: string; cumulativeCount: number; monthlyCount: number }>, payment) => {
        const paymentDate = new Date(payment.createdAt);
        
        const monthKey = `${paymentDate.getFullYear()}-${String(paymentDate.getMonth() + 1).padStart(2, '0')}`;
        
        if (!acc[monthKey]) {
          acc[monthKey] = {
            month: monthKey,
            cumulativeCount: 0,
            monthlyCount: 0
          };
        }
        
        acc[monthKey].monthlyCount++;
        
        return acc;
      }, {});
  
      let cumulativeTotal = 0;
      const timeSeriesData = Object.keys(groupedPayments)
        .sort()
        .map(monthKey => {
          cumulativeTotal += groupedPayments[monthKey].monthlyCount;
          return {
            month: monthKey,
            monthlyCount: groupedPayments[monthKey].monthlyCount,
            cumulativeCount: cumulativeTotal
          };
        });
  
      res.json({
        totalMembershipPayments: membershipPayments.length,
        growthData: timeSeriesData.map(item => ({
          x: item.month,
          y: item.cumulativeCount
        }))
      });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };
  getTimeBasedMoneyTotal = async (req: Request, res: Response): Promise<void> => {
    try {
      const payments = await paymentRepository.getAllPayments();
      const groupedMembershipPayments = payments.reduce(
        (acc: Record<string, { month: string; cumulativeAmount: number; monthlyAmount: number }>, payment) => {
          const paymentDate = new Date(payment.createdAt);
          const monthKey = `${paymentDate.getFullYear()}-${String(paymentDate.getMonth() + 1).padStart(2, '0')}`;
          if (!acc[monthKey]) {
            acc[monthKey] = {
              month: monthKey,
              cumulativeAmount: 0,
              monthlyAmount: 0
            };
          }
          acc[monthKey].monthlyAmount += payment.amount;
          return acc;
        }, {});
  
      let cumulativeTotal = 0;
      const timeSeriesData = Object.keys(groupedMembershipPayments)
        .sort()
        .map(monthKey => {
          cumulativeTotal += groupedMembershipPayments[monthKey].monthlyAmount;
          return {
            month: monthKey,
            monthlyAmount: groupedMembershipPayments[monthKey].monthlyAmount,
            cumulativeAmount: cumulativeTotal
          };
        });
  
      res.json({
        growthData: timeSeriesData.map(item => ({
          x: item.month,
          y: item.cumulativeAmount / 100
        }))
      });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };
  getTimeBasedMoneyAdhesion = async (req: Request, res: Response): Promise<void> => {
    try {
      const payments = await paymentRepository.getAllPayments();
      const membershipPayments = payments.filter(
        (payment) => payment.type === "Membership"
      );
      const groupedMembershipPayments = membershipPayments.reduce(
        (acc: Record<string, { month: string; cumulativeAmount: number; monthlyAmount: number }>, payment) => {
          const paymentDate = new Date(payment.createdAt);
          const monthKey = `${paymentDate.getFullYear()}-${String(paymentDate.getMonth() + 1).padStart(2, '0')}`;
          if (!acc[monthKey]) {
            acc[monthKey] = {
              month: monthKey,
              cumulativeAmount: 0,
              monthlyAmount: 0
            };
          }
          acc[monthKey].monthlyAmount += payment.amount;
          return acc;
        }, {});
  
      let cumulativeTotal = 0;
      const timeSeriesData = Object.keys(groupedMembershipPayments)
        .sort()
        .map(monthKey => {
          cumulativeTotal += groupedMembershipPayments[monthKey].monthlyAmount;
          return {
            month: monthKey,
            monthlyAmount: groupedMembershipPayments[monthKey].monthlyAmount,
            cumulativeAmount: cumulativeTotal
          };
        });
  
      res.json({
        growthData: timeSeriesData.map(item => ({
          x: item.month,
          y: item.cumulativeAmount / 100
        }))
      });
    }catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };
  getTimebasedMoneyEvent = async (req: Request, res: Response): Promise<void> => {  
    try {
      const payments = await paymentRepository.getAllPayments();
      const eventPayments = payments.filter(
        (payment) => payment.type === "Event"
      );
      const groupedEventPayments = eventPayments.reduce(
        (acc: Record<string, { month: string; cumulativeAmount: number; monthlyAmount: number }>, payment) => {
          const paymentDate = new Date(payment.createdAt);
          const monthKey = `${paymentDate.getFullYear()}-${String(paymentDate.getMonth() + 1).padStart(2, '0')}`;
          if (!acc[monthKey]) {
            acc[monthKey] = {
              month: monthKey,
              cumulativeAmount: 0,
              monthlyAmount: 0
            };
          }
          acc[monthKey].monthlyAmount += payment.amount;
          return acc;
        }, {});
  
      let cumulativeTotal = 0;
      const timeSeriesData = Object.keys(groupedEventPayments)
        .sort()
        .map(monthKey => {
          cumulativeTotal += groupedEventPayments[monthKey].monthlyAmount;
          return {
            month: monthKey,
            monthlyAmount: groupedEventPayments[monthKey].monthlyAmount,
            cumulativeAmount: cumulativeTotal
          };
        });
  
      res.json({
        growthData: timeSeriesData.map(item => ({
          x: item.month,
          y: item.cumulativeAmount / 100
        }))
      });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
  getAbonementDetails = async (req: Request, res: Response): Promise<void> => {
    try {
      const abonements = await abonementRepository.getAllAbonementsMembers();
      const data: { nom: string; abonementUrl: string; participants: any[] }[] = abonements.map((abonement) => ({
        nom: abonement.nom,
        abonementUrl: abonement.url,
        participants: abonement.participants
      }));
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}

export const statController = new StatController();
