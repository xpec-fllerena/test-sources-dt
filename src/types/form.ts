import { z } from 'zod';
import { DELIVERY_TYPES } from '../constants/deliveryTypes';

export const searchFormSchema = z.object({
  search: z.string().optional(),
});

export const storeFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  enabled: z.boolean(),
  deliveryTypes: z.array(z.object({
    id: z.string(),
    name: z.string(),
    enabled: z.boolean(),
  })),
});

export type SearchFormData = z.infer<typeof searchFormSchema>;
export type StoreFormData = z.infer<typeof storeFormSchema>;