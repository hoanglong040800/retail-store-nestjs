export type ExceptionCode =
  | AuthExceptionCode
  | GenericExceptionCode
  | BranchExceptionCode
  | CategoryExceptionCode
  | ProductExceptionCode
  | CartExceptionCode
  | OrderExceptionCode
  | PaymentExceptionCode
  | UserExceptionCode;

type GenericExceptionCode =
  | 'INTERNAL_SERVER_ERROR'
  | 'INVALID_DATA'
  | 'PARAMS_NOT_FOUND'
  | 'PARAMS_NOT_MATCH_WITH_TOKEN'
  | 'INVALID_RESPONSE'
  | 'INVALID_TOKEN';

type AuthExceptionCode =
  | 'INCORRECT_EMAIL_OR_PASSWORD'
  | 'USER_EXISTS'
  | 'LOGIN_ATTEMPTS_EXCEEDED';

type UserExceptionCode = 'USER_NOT_FOUND';

type BranchExceptionCode = 'BRANCH_NOT_FOUND';

type CategoryExceptionCode = 'CATEGORY_NOT_FOUND';

type ProductExceptionCode = 'PRODUCT_NOT_FOUND';

type CartExceptionCode = 'CART_ITEM_NOT_FOUND' | 'USER_CART_NOT_FOUND';

type OrderExceptionCode = 'ORDER_NOT_FOUND';

type PaymentExceptionCode =
  | 'CANT_CREATE_CHECKOUT_SESSION_STRIPE'
  | 'CANT_CREATE_PAYMENT_INTENT_STRIPE'
  | 'CANT_CHECKOUT_WITH_EMPTY_CART'
  | 'CANT_PRE_AUTH';
