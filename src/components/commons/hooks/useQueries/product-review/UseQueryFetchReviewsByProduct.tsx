import { gql, useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchReviewsByProductArgs,
} from "../../../../../commons/types/generated/types";

export const FETCH_REVIEWS_BY_PRODUCT = gql`
  query fetchReviewsByProduct($productId: ID!, $page: Int!) {
    fetchReviewsByProduct(productId: $productId, page: $page) {
      id
      title
      contents
      user {
        name
      }
      createdAt
    }
  }
`;

export const UseQueryFetchReviewsByProduct = (variables: IQueryFetchReviewsByProductArgs) => {
  const query = useQuery<Pick<IQuery, "fetchReviewsByProduct">, IQueryFetchReviewsByProductArgs>(
    FETCH_REVIEWS_BY_PRODUCT,
    { variables }
  );

  return query;
};