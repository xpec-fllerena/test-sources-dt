export interface DeliveryType {
  id: string;
  name: string;
  enabled: boolean;
}

export interface Store {
  id: string;
  name: string;
  enabled: boolean;
  deliveryTypes: DeliveryType[];
}