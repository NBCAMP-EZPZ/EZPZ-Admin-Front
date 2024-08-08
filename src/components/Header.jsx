import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';
import {FaUser, FaTicketAlt} from 'react-icons/fa'; // FontAwesome 아이콘 추가
import { Dropdown, DropdownButton } from 'react-bootstrap'; // React Bootstrap 추가
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/styles/Header.css';

function Header({ isLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // 로그아웃 API 호출
      localStorage.removeItem('accessToken'); // localStorage에서 사용자 정보 제거
      navigate('/popup'); // 로그인 페이지로 리디렉션
      window.location.reload(); // 페이지 새로고침
    } catch (error) {
      console.error('로그아웃 실패:', error); // 에러 로그 출력
      // 필요에 따라 사용자에게 에러 메시지 표시
    }
  };

  return (
    <header className="header d-flex justify-content-between align-items-center p-3">
      <h1 className="header-title">
        <Link to="/popup" className="header-link">EZPZ</Link>
        <span className="host-label">Admin</span> {/* 노란색 Host 라벨 */}
      </h1>
      <nav className="nav-links">
        {isLoggedIn ? (
          <>
            <Link to="/coupons" className="btn btn-outline-primary m-2">
              <FaTicketAlt /> 쿠폰 생성
            </Link>
            <DropdownButton className="m-2" title={<><FaUser /> 마이 페이지</>} alignRight>
              <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
            </DropdownButton>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline-primary m-2">로그인</Link>
            <Link to="/signup" className="btn btn-secondary m-2">회원가입</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;