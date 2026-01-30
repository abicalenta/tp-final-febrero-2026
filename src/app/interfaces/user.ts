export interface User 
    {
        restaurantName: string,
        password: string,
        firstName: string,
        lastName: string,
        address: string,
        phoneNumber: string,
        id: number
        name: string,
        email: string,
      }
export type NewUser = Omit<User, 'restaurantName' >;  