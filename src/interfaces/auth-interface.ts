export interface AuthSlice {
  loading: boolean;
  status: AUTH_STATUS;
  session: Session | null;
  userData: UserData | null;
}

export interface Session {
  access_token: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  user: User;
}

export interface User {
  app_metadata: AppMetaData;
  aud: string;
  confirmed_at: string;
  created_at: string;
  email: string;
  email_confirmed_at: string;
  id: string;
  identities: any[];
  is_anonymous: boolean;
  last_sign_in_at: string;
  phone: string;
  role: string;
  updated_at: string;
  user_metadata: {};
}

interface AppMetaData {
  provider: string;
  providers: string[];
}

export enum AUTH_STATUS {
  'checking' = 'checking',
  'not-authenticated' = 'not-authenticated',
  'authenticated' = 'authenticated',
}
export interface UserData {
  auth_uuid: string;
  created_at: string;
  first_name: string;
  id: number;
  last_name: string;
  location: string;
  updated_at: string;
  uuid: string;
}
