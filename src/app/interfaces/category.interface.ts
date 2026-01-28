export interface Category {
  id: number;
  name: string;
  restaurantId: number;
}

export interface NewCategory {
  name: string;
  restaurantId: string;
}

export interface UpdateCategoryRequestDto {
  name: string;
}

export interface LoginData { 
  email: string;
  password: string;
}

export interface restaurantId { 
  email: string;
  password: string;
}

export interface userId {

}
