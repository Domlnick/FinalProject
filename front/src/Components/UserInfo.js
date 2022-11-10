import style from './UserInfo.css';

function UserInfo({ setUserInfo, id, title, content, writer }) {

    // 모달 끄기
    const closeUserInfo = () => {
        setUserInfo(false);
    };

    return (
        <div className={style.container}>
            <button className={style.close} onClick={closeUserInfo}>
                X
            </button>
            <p>모달창입니다.</p>
        </div>
    );
}

export default UserInfo;