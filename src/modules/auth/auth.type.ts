export type SignedTokenUser = {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
};

export type SignedTokenData = {
  user: SignedTokenUser;
};
