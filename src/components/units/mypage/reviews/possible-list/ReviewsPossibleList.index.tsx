import { useRecoilState } from "recoil";
import { isEditState, isOpenState } from "../../../../../commons/stores";
import CommonModal01 from "../../../../commons/modals/CommonModal01";
import ReviewsWrite from "../write-modal/ReviewsWrite.index";
import * as S from "./ReviewsPossibleList.styles";

export default function ReviewsPossibleList() {
  const [isOpen, setIsOpen] = useRecoilState(isOpenState);
  const [, setIsEdit] = useRecoilState(isEditState);

  const onClickReviewsWrite = () => {
    setIsOpen((prev) => !prev);
    setIsEdit(false);
  };

  const modalOnCancel = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <CommonModal01 isOpen={isOpen} onCancel={modalOnCancel} width={800}>
        <ReviewsWrite />
      </CommonModal01>

      <S.ReviewWrapper>
        <S.ReviewUl>
          <S.ReviewLi>
            <S.ReviewImg src="" />
            <S.ReviewCenterWrapper>
              <S.ReviewItemName>[브랜드명] 상품명</S.ReviewItemName>
              <S.ReviewDate>구매 날짜</S.ReviewDate>
            </S.ReviewCenterWrapper>
            <S.ReviewWriteBtn onClick={onClickReviewsWrite}>
              후기 작성
            </S.ReviewWriteBtn>
          </S.ReviewLi>
        </S.ReviewUl>
      </S.ReviewWrapper>
    </>
  );
}