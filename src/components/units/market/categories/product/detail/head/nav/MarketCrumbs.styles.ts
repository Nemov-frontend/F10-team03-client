import styled from "@emotion/styled";
import { flexRow } from "../../../../../../../../commons/styles/globalStyles";

export const DetailHeadCrumbs = styled.nav`
  width: 100%;
`;

export const CrumbsWrapper = styled.ol`
  width: 100%;
  ${flexRow}
  align-items: center;
  gap: 1rem;
  /* margin-left: 0.625rem; */
  margin-bottom: 0;
  position: relative;
`;

export const Crumb01 = styled.li`
  ${flexRow}
  width: 2.5rem;
  aspect-ratio: 1/1;
  background-image: url("/icons/all-icon-after-hover.png");
  background-size: cover;
  cursor: pointer;
`;

export const CrumbLink01 = styled.a`
  position: absolute;
  padding-right: 0.875rem;
  margin-right: 0.375rem;
  font-size: 1rem;
  height: 0.5rem;
  color: #555;
  left: 2.5rem;
  top: 0.64rem;
`;

export const Crumb02 = styled.li`
  width: 3rem;
  box-sizing: content-box;
  cursor: pointer;
`;

export const CrumbLink02 = styled.a`
  display: inline-block;
  font-size: 0.938rem;
  position: relative;
  padding-right: 0.875rem;
  margin-right: 0.375rem;
`;