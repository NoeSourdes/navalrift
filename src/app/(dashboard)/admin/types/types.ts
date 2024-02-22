interface User {
  email: string;
  name: string;
  id: string;
  image: string;
}

export interface Session {
  user: User;
}
