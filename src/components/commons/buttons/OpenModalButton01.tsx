import styled from "@emotion/styled";
import { mobile } from "../../../commons/styles/breakPoints";
import { colorBase01 } from "../../../commons/styles/colorBases";

interface IOpenModalButton01Props {
  title: string;
  onClick: () => void;
}

const StyledButton01 = styled.button`
  display: flex;
  justify-content: center;
  padding: 2vh 5vw;
  font-weight: 700;
  font-size: 14px;
  border: none;
  border-radius: 8px;

  ${colorBase01}

  @media ${mobile} {
    font-size: 10px;
  }
`;

export default function OpenModalButton01(props: IOpenModalButton01Props) {
  return <StyledButton01 onClick={props.onClick}>{props.title}</StyledButton01>;
}
