import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  country: z.string().min(1, "Country is required"),
  city: z.string().optional(),
  product: z.string().min(1, "Please select a product"),
  requiredCapacity: z.string().optional(),
  materialOfConstruction: z.string().optional(),
  quantity: z.string().optional(),
  application: z.string().optional(),
  technicalRequirement: z.string().optional(),
  deliveryTimeline: z.string().optional(),
  message: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Please enter a valid phone number").optional().or(z.literal("")),
  company: z.string().optional(),
  subject: z.string().min(2, "Subject must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
