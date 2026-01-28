export interface Restaurant {
  id: number;
  nombre: string;
  categoria: string;
  direccion: string;
  logo?: string;
  email: string; 
  password: string;
  username: string;
  restaurantName: string;
}

export interface LoginData { // <-- El 'export' es obligatorio
  email: string;
  password: string;
}

export interface RegistroData {
  restaurantName: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  password: string;
  password2?: string;
}
