export interface Category {
  id: number;
  name: string;
  restaurantId: number;
}

export interface NewCategory {
  name: string;
  restaurantId: number;
}

export interface UpdateCategoryRequestDto {
  name: string;
}
