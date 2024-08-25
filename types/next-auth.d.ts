// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import type { DefaultSession, DefaultUser } from 'next-auth';
import type { JWT, DefaultJWT } from 'next-auth/jwt';
import type { UserRole } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      image: string;
      role: UserRole;
    };
  }

  interface User extends DefaultUser {
    role: UserRole;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role: UserRole;
  }
}
