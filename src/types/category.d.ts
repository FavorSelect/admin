export interface SubCategories {
  id: number;
  categoryDescription: string;
  categoryImage: string;
  categoryName: string;
  parentCategoryId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  categoryImage: string;
  categoryName: string;
  categoryDescription: string;
  parentCategoryId: null;
  subcategories: SubCategories[];
  createdAt: string;
  updatedAt: string;
}

export interface CategoryResponse {
  categories: Category[];
}
