export interface User {
  id: number;
  password: string,
  firstName: string,
  lastName: string,
  address: string,
  phoneNumber: string,
  restaurantName: string
  name: string,
      }
export type NewUser = Omit<User, 'restaurantName' >;  