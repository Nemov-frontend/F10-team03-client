import { GlobalWrapper } from "../../../../commons/styles/globalStyles";
import * as S from "./MarketMain.styles";
import * as ID from "../categories/list/item-display/ItemDisplay";
import * as IDS from "../categories/list/item-display/ItemDisplay.styles";
import { CustomArrowProps } from "react-slick";
import { UseQueryFetchLoginUser } from "../../../commons/hooks/useQueries/user/UseQueryFetchLoginUser";
import { UseQueryFetchProductsOfBestSelling } from "../../../commons/hooks/useQueries/product/UseQueryFetchProductsOfBestSelling";
import { UseQueryFetchProductsOfRecommend } from "../../../commons/hooks/useQueries/product/UseQueryFetchProductsOfRecommend";
import { FETCH_PRODUCT } from "../../../commons/hooks/useQueries/product/UseQueryFetchProduct";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { Modal } from "antd";
import CommonModal01 from "../../../commons/modals/CommonModal01";
import CartModal from "../categories/list/CartModalPage";
import { useState } from "react";
import { IProduct } from "../../../../commons/types/generated/types";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../../commons/stores";

const NextArrow = ({ currentSlide, slideCount, ...props }: CustomArrowProps) => (
  <div {...props}>
    <IDS.NextArrowIcon />
  </div>
);

const PrevArrow = ({ currentSlide, slideCount, ...props }: CustomArrowProps) => (
  <div {...props}>
    <IDS.PrevArrowIcon />
  </div>
);

export default function MarketMain() {
  const { data: bestItemData } = UseQueryFetchProductsOfBestSelling();
  const { data: recItemData } = UseQueryFetchProductsOfRecommend();
  // const { data: categoryData } = UseQueryFetchCategories();
  const { data: loginUserData } = UseQueryFetchLoginUser();
  const [accessToken] = useRecoilState(accessTokenState);

  const settings = {
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "ease-in-out",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const router = useRouter();
  const client = useApolloClient();

  // 모달 기능
  const [isOpen, setIsOpen] = useState(false);
  const [, setCartModalItemVal] = useState<IProduct>();
  const [curProductData, setCurProductData] = useState<IProduct>();
  const [quantity, setQuantity] = useState(parseInt("1"));

  // 추천 상품 아이템 장바구니 모달 열기
  const onClickToggleCartModal01 = (id: string) => (e: React.MouseEvent) => {
    e?.stopPropagation();

    if (!accessToken) {
      Modal.error({ content: "로그인이 필요한 서비스입니다." });
    } else {
      setIsOpen((prev) => !prev);
      const cartModalItem = recItemData?.fetchProductsOfRecommend.filter((cur) => {
        if (cur.id === id) {
          return setCurProductData(cur);
        } else {
          return undefined;
        }
      });

      if (cartModalItem === undefined) return;
      setCartModalItemVal(cartModalItem[0]);
    }
  };

  // 베스트 상품 아이템 장바구니 모달 열기
  const onClickToggleCartModal02 = (id: string) => (e: React.MouseEvent) => {
    e?.stopPropagation();

    if (!accessToken) {
      Modal.error({ content: "로그인이 필요한 서비스입니다." });
    } else {
      setIsOpen((prev) => !prev);
      const cartModalItem = bestItemData?.fetchProductsOfBestSelling.filter((cur) => {
        if (cur.id === id) {
          return setCurProductData(cur);
        } else {
          return undefined;
        }
      });

      if (cartModalItem === undefined) return;
      setCartModalItemVal(cartModalItem[0]);
    }
  };

  const modalOnCancel = () => {
    setIsOpen((prev) => !prev);
  };

  const onClickMoveToProductDetail = (productId: string) => async (event: React.MouseEvent) => {
    event?.preventDefault();
    const result = await client.query({
      query: FETCH_PRODUCT,
      variables: { productId },
    });
    console.log(result.data.fetchProduct.isOutOfStock);
    if (result.data.fetchProduct.isOutOfStock !== true) {
      void router.push(`/market/product/${productId}`);
    } else {
      Modal.error({ content: "매진된 상품입니다." });
    }
  };

  return (
    <>
      <CommonModal01 isOpen={isOpen} onCancel={modalOnCancel} width={500}>
        <CartModal
          curProductData={curProductData}
          onCancel={modalOnCancel}
          setIsOpen={setIsOpen}
          setQuantity={setQuantity}
          quantity={quantity}
        ></CartModal>
      </CommonModal01>

      <GlobalWrapper>
        <S.MarketMainContainer>
          <S.MainItemsWrapper>
            <S.PageLine />
            <S.RecommendItemSection01>
              <S.MarketMainHeader01>
                <div>
                  {loginUserData && (
                    <S.HeaderSpan>
                      {!loginUserData ? `` : `${loginUserData.fetchLoginUser.name}님,`}
                    </S.HeaderSpan>
                  )}
                  <div style={{ display: "flex" }}>
                    이런 상품은 어떠신가요?
                    <S.HeaderDiv01>추천상품</S.HeaderDiv01>
                  </div>
                </div>

                <S.ToCategories
                  onClick={() => {
                    void router.push("/market/categories");
                  }}
                >
                  더보기
                  <S.StyledRightArrow />
                </S.ToCategories>
              </S.MarketMainHeader01>
              <IDS.ItemsWrapper03>
                {recItemData?.fetchProductsOfRecommend.map((rec) => (
                  <ID.ItemDisPlay02
                    key={rec.id}
                    recData={rec}
                    onClickMoveToProductDetail={onClickMoveToProductDetail}
                    onClickToggleCartModal01={onClickToggleCartModal01}
                  />
                ))}
              </IDS.ItemsWrapper03>
            </S.RecommendItemSection01>
            <S.MainMarketSection01>
              <S.MarketMainHeader02>
                <div style={{ display: "flex" }}>
                  네모비 회원이 선택한 상품
                  <S.HeaderDiv02>베스트</S.HeaderDiv02>
                </div>
                <S.ToCategories
                  onClick={() => {
                    void router.push("/market/categories");
                  }}
                >
                  더보기
                  <S.StyledRightArrow />
                </S.ToCategories>
              </S.MarketMainHeader02>
              <S.ItemsWrapper02>
                <IDS.StyledSlider02 {...settings}>
                  {bestItemData?.fetchProductsOfBestSelling.map((best) => (
                    <ID.ItemDisPlay01
                      key={best.id}
                      bestData={best}
                      onClickMoveToProductDetail={onClickMoveToProductDetail}
                      onClickToggleCartModal02={onClickToggleCartModal02}
                    ></ID.ItemDisPlay01>
                  ))}
                </IDS.StyledSlider02>
              </S.ItemsWrapper02>
            </S.MainMarketSection01>
          </S.MainItemsWrapper>
        </S.MarketMainContainer>
      </GlobalWrapper>
    </>
  );
}
