import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addLikedProduct, removeLikedProduct } from '../../../../store/slices/likedProductsSlice';
import { addProduct, deleteProduct } from '../../../../store/slices/cartSlice';
import { BASE_URL } from '../../../../config';
import Price from '../../../../UI/price/Price';
import BtnCart, { ButtonTypes } from '../../../../UI/btnCard/BtnCart';

import s from './ProductsItem.module.css';
import heart from '../../../../media/icons/heart.svg';
import blackHeart from '../../../../media/icons/blackHeart.svg';
import greenHeart from '../../../../media/icons/greenHeart.svg';
import shoppingBag1 from '../../../../media/icons/shoppingBag1.svg';
import blackBag from '../../../../media/icons/blackBag.svg';
import greenBag from '../../../../media/icons/greenBag.svg';

export default function ProductItem({ el }) {
  const dispatch = useDispatch();
  const [isHeartClicked, setIsHeartClicked] = useState(() => {
    const heartState = localStorage.getItem(`isHeartClicked_${el.id}`);
    return heartState ? JSON.parse(heartState) : false;
  });

  const [isBagClicked, setIsBagClicked] = useState(() => {
    const bagState = localStorage.getItem(`isBagClicked_${el.id}`);
    return bagState ? JSON.parse(bagState) : false;
  });

  const cartProducts = useSelector((state) => state.cart.products);
  const isProductInCart = cartProducts.some((product) => product.id === el.id);
  const likedProducts = useSelector((state) => state.likedProducts.likedProducts);
  const isLiked = likedProducts.some((likedProduct) => likedProduct.id === el.id);

  const handleToggleLiked = () => {
    const newState = !isHeartClicked;
    setIsHeartClicked(newState);
    if (!isLiked) {
      dispatch(addLikedProduct(el));
    } else {
      dispatch(removeLikedProduct(el));
    }
    localStorage.setItem(`isHeartClicked_${el.id}`, JSON.stringify(newState));
  };

  const handleToggleCart = () => {
    const newState = !isBagClicked;
    setIsBagClicked(newState);
    if (!isProductInCart) {
      dispatch(addProduct({ ...el, quantity: 1 }));
    } else {
      dispatch(deleteProduct(el.id));
    }
    localStorage.setItem(`isBagClicked_${el.id}`, JSON.stringify(newState));
  };

  const handleBtnCartClick = () => {
    setIsBagClicked(true); // Устанавливаем состояние isBagClicked в true при нажатии на кнопку BtnCart
    dispatch(addProduct({ ...el, quantity: 1 }));
    localStorage.setItem(`isBagClicked_${el.id}`, JSON.stringify(true));
  };

  return (
    <div className={s.products_wrapper}>
      <div className={s.image_container}>
        <Link to={`/products/${el.id}`} className={s.products_link}>
          <img src={`${BASE_URL}${el.image}`} alt={el.title} className={s.products_img} />
        </Link>
        <div className={s.icons_wrapper}>
          <button className={s.icon_button} onClick={handleToggleLiked}>
            <img src={isHeartClicked ? greenHeart : heart} alt="Add to favorites" />
          </button>
          <button className={s.icon_button} onClick={handleToggleCart}>
            <img src={isBagClicked ? greenBag : shoppingBag1} alt="Add to cart" />
          </button>
        </div>
      </div>
      <div className={s.add_btn} onClick={handleBtnCartClick}>
        <BtnCart type={ButtonTypes.ADD_TO_CART} onClick={handleBtnCartClick} />
      </div>
      <div className={s.products_information}>
        <Link to={`/products/${el.id}`} className={s.products_link}>
          <h3 className={s.products_title}>{el.title}</h3>
        </Link>
        <Price
          el={el}
          realPriceClass={s.real_price}
          oldPriceClass={s.old_price}
          saleValueClass={s.sale_value}
        />
      </div>
    </div>
  );
}

