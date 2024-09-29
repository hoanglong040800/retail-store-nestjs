export const ProductsRlt = {
  category: 'category',
  categoryParentCategory: 'category.parentCategory',
};

export const CategoriesRlt = {
  childCategories: 'childCategories',
  products: 'products',
  childCategoriesProducts: 'childCategories.products',
};

export const AdminDivisionRlt = {
  parentDivision: 'parentDivision',
  twoLvParentDivision: 'parentDivision.parentDivision',
  childDivisions: 'childDivisions',
  twoLvChilDivisions: 'childDivisions.childDivisions',
};

export const BranchesRlt = {
  ward: 'ward',
  wardDistrict: `ward.${AdminDivisionRlt.parentDivision}`,
  wardDistrictProvince: `ward.${AdminDivisionRlt.twoLvParentDivision}`,

  district: 'district',
  districtProvince: `district.${AdminDivisionRlt.parentDivision}`,

  province: 'province',
};
