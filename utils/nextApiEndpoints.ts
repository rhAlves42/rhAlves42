const NEXT_API_ENDPOINTS = {
  CASE: "case",
  GET_CASE_BY_SLUG: (slug: string) => `case/${slug}`,
  GET_CARDS: "cards"
};

export default NEXT_API_ENDPOINTS;
