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
  pending = 'pending', // DEFAULT status when first checkout
  awaitingFulfillment = 'awaiting_fulfillment', // wait for store clerks to prepare order
  awaitingPayment = 'awaiting_payment', // wait for customer to pay in order to process. Its depend on delivery type
  awaitingShipment = 'awaiting_shipment', // finish fulfillment, wait for delivery. Customer may or may not need to pay at this step
  // shipped = 'shipped', // order is delivered or customer pickup at store
  done = 'done', // order is delivered and paid
  cancelled = 'cancelled', // order is either cancelled by store or customer
}

export enum DeliveryTypeEnum {
  delivery = 'delivery',
  pickup = 'pickup',
}

export enum CartStatusEnum {
  new = 'new', // DEFAULT. not checkout yet, can add item
  checkout = 'checkout', // already checkouted, CAN'T alter cart items or cart
}

export enum PaymentMethodEnum {
  cash = 'cash',
  creditCard = 'credit_card',
}

export enum PaymentActionEnum {
  preAuth = 'preAuth',
  charge = 'charge',
  chargeManual = 'chargeManual',
}

export enum OrderActionEnum {
  editCart = 'editCart',
  cancel = 'cancel',
}
