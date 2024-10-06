export enum AdminDivisionType {
  ward = 'ward',
  district = 'district',
  province = 'province',
}

export enum ProductUnitEnum {
  kg = 'kg',
  litre = 'litre',
  package = 'package',
  bottle = 'bottle',
  box = 'box',
  packet = 'packet',
}

export enum OrderStatusEnum {
  pending = 'pending',
  awaitingFulfillment = 'awaiting_fulfillment',
  awaitingPayment = 'awaiting_payment',
  awaitingShipment = 'awaiting_shipment',
  shipped = 'shipped',
  done = 'done',
}

export enum DeliveryTypeEnum {
  delivery = 'delivery',
  pickup = 'pickup',
}
