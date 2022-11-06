
// 각 step별 진행상황 서버 및 백엔드로부터 받은 후 진행상황 화면출력
// 모든 과정 완료(100%) 됐을 경우 Link to "/result"

import { Header } from "../Components/Header";
import { useMediaQuery } from "react-responsive";

function Searching() {

    const Desktop = ({ children }) => {
        const isDesktop = useMediaQuery({ minWidth: 1024 })
        return isDesktop ? children : null
    };
    const Tablet = ({ children }) => {
        const isMobile = useMediaQuery({ minWidth: 706, maxWidth: 1023 })
        return isMobile ? children : null
    };
    const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: 705 })
        return isMobile ? children : null
    };
    return (
        <>
        <Desktop>
            <Header />
            <div className="searching">
                <div className="searching-gif">
                    <img src={process.env.PUBLIC_URL + "/image_src/run.gif"} />
                </div>
                <div className="searching-text" style={{marginTop: "3%", fontSize : "23px"}}>비슷한 제품을 열심히 찾고 있어요.</div>
                <div className="searching-gaugebar-desktop"></div>
                <div className="searching-gaugebar-text">33%</div>
            </div>
        </Desktop>
        <Tablet>
            <div className="searching">
                <div className="searching-gif">
                    <img src={process.env.PUBLIC_URL + "/image_src/run.gif"} />
                </div>
                <div className="searching-text">비슷한 제품을 열심히 찾고 있어요.</div>
                <div className="searching-gaugebar-tablet">33%</div>
                <div className="searching-gaugebar-text">33%</div>
            </div>
        </Tablet>
        <Mobile>
            <div className="searching">
                <div className="searching-gif">
                    <img src={process.env.PUBLIC_URL + "/image_src/run.gif"} />
                </div>
                <div className="searching-text">비슷한 제품을 열심히 찾고 있어요.</div>
                <div className="searching-gaugebar-mobile">33%</div>
                <div className="searching-gaugebar-text">33%</div>
            </div>
        </Mobile>
        </>
    );
}

export default Searching;