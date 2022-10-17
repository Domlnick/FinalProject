
// 각 step별 진행상황 서버 및 백엔드로부터 받은 후 진행상황 화면출력
// 모든 과정 완료(100%) 됐을 경우 Link to "/result"

import { Header } from "../Components/Header";

function Searching() {
    return (
        <>
            <Header />
            <div className="searching">
                <div className="searching-gif">
                    <img src={process.env.PUBLIC_URL + "/image_src/run.gif"} />
                </div>
                <div className="searching-text">비슷한 제품을 열심히 찾고 있어요.</div>
                <div className="searching-gaugebar">33%</div>
                <div className="searching-gaugebar-text">33%</div>
            </div>
        </>
    );
}

export default Searching;