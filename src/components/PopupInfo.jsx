import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPopupDetail, approvePopup } from '../api/popups';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/styles/PopupInfo.css';

function PopupInfo() {
    const { id } = useParams();
    const [popup, setPopup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        const fetchPopupDetail = async () => {
            try {
                const data = await getPopupDetail(id);
                setPopup(data);
                setLoading(false);
            } catch (error) {
                setError('팝업 정보를 불러오는 데 실패했습니다 :(');
                setLoading(false);
            }
        };

        fetchPopupDetail();
    }, [id]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    const getApprovalStatusText = (status) => {
        switch (status) {
            case 'REVIEWING':
                return '검토 중';
            case 'APPROVED':
                return '승인';
            case 'REJECTED':
                return '반려';
            default:
                return status;
        }
    };

    const getPopupStatusText = (status) => {
        switch (status) {
            case 'SCHEDULED':
                return '진행 예정';
            case 'IN_PROGRESS':
                return '진행 중';
            case 'COMPLETED':
                return '종료';
            case 'CANCELED':
                return '취소';
            default:
                return status;
        }
    };

    const handleApprove = async () => {
        try {
            await approvePopup(id, true);
            alert('팝업이 승인되었습니다.');
            setPopup({ ...popup, approvalStatus: 'APPROVED' });
        } catch (error) {
            console.error('Error approving popup:', error);
            alert('승인 요청 중 오류가 발생했습니다.');
        }
    };

    const handleReject = async () => {
        try {
            await approvePopup(id, false);
            alert('팝업이 반려되었습니다.');
            setPopup({ ...popup, approvalStatus: 'REJECTED' });
        } catch (error) {
            console.error('Error rejecting popup:', error);
            alert('반려 요청 중 오류가 발생했습니다.');
        }
    };

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <img src={popup.thumbnailUrl} className="card-img-top" alt={popup.name} />
                <div className="card-body">
                    <h3 className="card-title">{popup.name}</h3>
                    <h5 className="card-text">{popup.description}</h5>

                    <hr />

                    <p className="card-text"><strong>주소:</strong> {popup.address}</p>
                    <p className="card-text"><strong>담당자:</strong> {popup.managerName}</p>
                    <p className="card-text"><strong>전화번호:</strong> {popup.phoneNumber}</p>
                    <p className="card-text"><strong>승인 여부:</strong> {getApprovalStatusText(popup.approvalStatus)}</p>
                    <p className="card-text"><strong>팝업 상태:</strong> {getPopupStatusText(popup.popupStatus)}</p>
                    <p className="card-text"><strong>시작 날짜:</strong> {new Date(popup.startDate).toLocaleString()}</p>
                    <p className="card-text"><strong>종료 날짜:</strong> {new Date(popup.endDate).toLocaleString()}</p>
                    <p className="card-text"><strong>좋아요 ♥︎ </strong> {popup.likeCount} 개</p>

                    <div className="popup-images">
                        {popup.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Popup ${index + 1}`}
                                className="popup-image"
                                onClick={() => handleImageClick(image)}
                                style={{ cursor: 'pointer' }}
                            />
                        ))}
                    </div>
                    {popup.approvalStatus === 'REVIEWING' && (
                        <div className="d-flex justify-content-end mt-3">
                            <button className="btn" style={{ backgroundColor: '#007bff', color: 'white' }} onClick={handleApprove}>승인</button>
                            <button className="btn" style={{ backgroundColor: '#dc3545', color: 'white', marginLeft: '10px' }} onClick={handleReject}>반려</button>
                        </div>
                    )}
                </div>
            </div>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Body>
                    <img src={selectedImage} alt="Selected" className="img-fluid" />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default PopupInfo;