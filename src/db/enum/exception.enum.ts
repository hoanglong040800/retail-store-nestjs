export type ExceptionCode =
  | 'BRANCH_NOT_FOUND'
  | 'CATEGORY_NOT_FOUND'
  | 'CART_ITEM_NOT_FOUND'
  | 'CANT_CREATE_CHECKOUT_SESSION_STRIPE'
  | 'CANT_CREATE_PAYMENT_INTENT_STRIPE'
  | 'CANT_CHECKOUT_WITH_EMPTY_CART'
  | 'INTERNAL_SERVER_ERROR'
  | 'INVALID_DATA'
  | 'INVALID_TOKEN'
  | 'INCORRECT_PASSWORD'
  | 'PRODUCT_NOT_FOUND'
  | 'PARAMS_NOT_FOUND'
  | 'USER_EXISTS'
  | 'USER_NOT_FOUND'
  | 'USER_CART_NOT_FOUND';
