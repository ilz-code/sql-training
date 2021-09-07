export const selectCount = (table: string): string => {
  return (`select count (*) as c from ${table}`);
};

export const selectRowById = (id: number, table: string): string => {
  return (`select * from ${table} where id = ${id}`);
};

export const selectCategoryByTitle = (title: string): string => {
  return (`select id from categories where title = '${title}'`);
};

export const selectAppCategoriesByAppId = (appId: number): string => {
  return(`select category_id, apps.title as app_title, categories.title as category_title
  from apps_categories 
    join apps on apps.id = apps_categories.app_id
    join categories on categories.id = apps_categories.category_id
  where app_id = ${appId}`);
};

export const selectUnigueRowCount = (tableName: string, columnName: string): string => {
  return (`select count (distinct ${columnName}) as c from ${tableName}`);
};

export const selectReviewByAppIdAuthor = (appId: number, author: string): string => {
  throw new Error(`todo`);
};

export const selectColumnFromTable = (columnName: string, tableName: string): string => {
  throw new Error(`todo`);
};

