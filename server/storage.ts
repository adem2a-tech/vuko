import { db } from "./db";
import { leads, type InsertLead, type LeadResponse } from "@shared/schema";

export interface IStorage {
  createLead(lead: InsertLead): Promise<LeadResponse>;
  getLeads(): Promise<LeadResponse[]>;
}

export class DatabaseStorage implements IStorage {
  async createLead(lead: InsertLead): Promise<LeadResponse> {
    const [newLead] = await db.insert(leads).values(lead).returning();
    return newLead;
  }

  async getLeads(): Promise<LeadResponse[]> {
    return await db.select().from(leads);
  }
}

export const storage = new DatabaseStorage();
