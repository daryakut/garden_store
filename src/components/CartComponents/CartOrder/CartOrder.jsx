import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../../../store/slices/cartSlice'

import s from './CartOrder.module.css'
import ModalWindow from '../../homeComponents/ModalWindow/ModalWindow'
import CheckoutForm from '../../homeComponents/checkoutForm/CheckoutForm'

import { BASE_URL } from '../../../config'

export default function CartOrder({ basketCart }) {
  const dispatch = useDispatch()
  // const [sendingOrder, setSendingOrder] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleDiscountSubmit = () => {
    setShowModal(true)
  }

  const handleOrderSubmit = async () => {
    // setSendingOrder(true)
    setShowModal(true)

    // Данные для отправки
    const orderData = {
      items: basketCart,
      total: finalTotalSum,
    }

    try {
      const response = await fetch(`${BASE_URL}order/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      // Отображение модального окна и его автоматическое закрытие через 5 секунд
      setTimeout(() => {
        // очистка корзины
        dispatch(clearCart())
        setShowModal(false) // закрытие модального окна
      }, 3000)
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error)
    }
  }

  const totalSum = useSelector((state) => state.cart.totalSum)
  const discountApplied = useSelector((state) => state.cart.discountApplied)
  const finalTotalSum = discountApplied ? totalSum * 0.95 : totalSum

  return (
    <div className={s.container}>
      <h3 className={s.h3_order}>Order Details</h3>
      <div className={s.total_items}>
        <p className={s.total_items_sum}>{basketCart.length} items</p>
      </div>
      <div className={s.total_price}>
        <p className={s.total_p}>Total</p>
        <div>
          <p className={s.total_sum}>$ {finalTotalSum.toFixed(2)}</p>
        </div>
      </div>
      <CheckoutForm
        handleOrderSubmit={handleOrderSubmit}
        handleDiscountSubmit={handleDiscountSubmit}
        classInput={s.input}
        classBtn={s.discount_btn}
        txtBtn="Checkout"
        cartModalWindow={ModalWindow}
      />
      {showModal && (
        <ModalWindow onClose={() => setShowModal(false)}>
          <p className={s.congrats}>Your order has been successfully placed on the website.</p>
          <p className={s.congrats}>A manager will contact you shortly to confirm your order.</p>
        </ModalWindow>
      )}
    </div>
  )
}
