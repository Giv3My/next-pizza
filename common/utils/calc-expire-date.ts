export const calcExpireDate = (expiresIn: number) => {
  const now = new Date().getTime();

  return new Date(now + expiresIn);
};
