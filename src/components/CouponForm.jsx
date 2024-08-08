// src/components/CouponForm.jsx
import React, { useState } from 'react';
import { createCoupon } from '../api/coupons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/CouponForm.css';

const CouponForm = () => {
  const [name, setName] = useState('');
  const [discountAmount, setDiscountAmount] = useState('');
  const [totalCount, setTotalCount] = useState('');
  const [expiredAt, setExpiredAt] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const couponData = {
      name,
      discountAmount: parseInt(discountAmount, 10),
      totalCount: parseInt(totalCount, 10),
      expiredAt
    };

    try {
      await createCoupon(couponData);
      alert('쿠폰이 성공적으로 생성되었습니다.');
      // 폼 초기화
      setName('');
      setDiscountAmount('');
      setTotalCount('');
      setExpiredAt('');
      setError(null);
    } catch (error) {
      console.error('쿠폰 생성 중 오류 발생:', error);
      setError('쿠폰 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>쿠폰 생성</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">쿠폰명</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="discountAmount" className="form-label">할인 금액</label>
          <p className="custom-info-text">할인 금액은 최소 1,000원 이상, 최대 100,000원 이하이어야 합니다.</p>
          <input
            type="number"
            className="form-control"
            id="discountAmount"
            value={discountAmount}
            onChange={(e) => setDiscountAmount(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="totalCount" className="form-label">발행 개수</label>
          <p className="custom-info-text">발행 개수는 최소 1개 이상이어야 합니다.</p>
          <input
            type="number"
            className="form-control"
            id="totalCount"
            value={totalCount}
            onChange={(e) => setTotalCount(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="expiredAt" className="form-label">만료일</label>
          <input
            type="date"
            className="form-control"
            id="expiredAt"
            value={expiredAt}
            onChange={(e) => setExpiredAt(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">쿠폰 생성</button>
      </form>
    </div>
  );
};

export default CouponForm;