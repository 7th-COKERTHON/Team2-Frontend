export interface UserResponse {
  status: string;
  timestamp: string;
  data: UserData;
}

export interface UserData {
  userId: number;
  name: string;
  email: string;
  provider: string;
  nickname: string;
  level: number;
  levelProgress: number;
}
