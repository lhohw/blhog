export const fetchCategoriesQuery = `SELECT DISTINCT category FROM posts`;

export const fetchLatestPostsQuery =`
  SELECT *
    FROM posts
    ORDER BY posts.updated_at DESC
    LIMIT 12
`;

export const fetchPostsByCategoryQuery = `
  SELECT *
    FROM posts
    WHERE category=$1
    ORDER BY posts.updated_at DESC
`;

export const fetchPostByCategoryAndSlugQuery = `
  SELECT * FROM posts
    WHERE category=$1 AND slug=$2
`;