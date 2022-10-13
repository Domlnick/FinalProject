// 1. 이미지 업로드 div 영역 코드 
// 1.1 영역 전체 파일 드래그 가능하게
// 1.2 가운데 이미지 업로드 버튼 생성(UI 설계 필요)
// 1.3 버튼 위 소개텍스트 영역 및 출력
// 2. 광고 배너 div 영역 코드
// 2.1 이미지 교체(time지정) - 링크 설정
import React from "react";

function UploadArea() {

    const fileInput = React.useRef();

    const handleButtonClick = e => {
        fileInput.current.click();
    };

    return (
        <>
            {/* 
                1. 업로드 영역 폴더 / 파인더 드래그로 이미지 업로드 기능 구현 필요
            */}
            <div className="upload_div">
                <div style={{
                    position: "relative",
                    top: "27%",
                    fontSize: "33px"
                }}>
                    <img src={process.env.PUBLIC_URL + "/image_src/icon_clothes_mainpage.png"} />
                    &nbsp;&nbsp;비슷한 옷을 찾아 드릴게요!
                </div>

                <div style={{
                    position: "relative",
                    fontSize: "20px",
                    top: "30%"
                }}>단 한번의 동작으로 찾고싶은 옷을 검색할 수 있습니다.
                </div>

                <div className="upload-button" style={{ position: "relative", top: "35%" }}>
                    <label for="upload-file" style={{
                        position: "relative",
                        backgroundColor: "#AAAAAA",
                        borderRadius: "50px",
                        color: "white",
                        cursor: "pointer"
                    }} >
                        <img src={process.env.PUBLIC_URL + "/image_src/images1.png"}
                            style={{
                                width: "auto"
                            }}></img>
                        <input type="file" id="upload-file" multiple="multiple"
                            style={{ display: "none" }} />
                    </label>
                </div>
            </div>
        </>
    );
}

function Ad_banner() {

    return (
        /* 
            1. 이미지 별 링크 걸기 구현 필요
            2. 링크 이동 시 새 탭으로 열기로 구현 필요
            3. N초 마다 이미지 스왑 구현 필요
        */
        <div className="ad_banner" style={{}}>
            <img src={process.env.PUBLIC_URL + "/image_src/playdata_ad_banner.png"}
                width="50%" height="150px" />
        </div>
    );
}



export { UploadArea, Ad_banner };

