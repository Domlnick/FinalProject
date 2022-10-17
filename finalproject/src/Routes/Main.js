// 1. 이미지 업로드 div 영역 코드 
// 1.1 영역 전체 파일 드래그 가능하게
// 1.2 가운데 이미지 업로드 버튼 생성(UI 설계 필요)
// 1.3 버튼 위 소개텍스트 영역 및 출력
// 2. 광고 배너 div 영역 코드
// 2.1 이미지 교체(time지정) - 링크 설정
import React, { createRef } from "react";
import Dropzone, { useDropzone } from 'react-dropzone';

function UploadArea() {
    {/* 업로드 버튼 코드 수정 시작*/ }
    const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
        // Disable click and keydown behavior
        noClick: true,
        noKeyboard: true
    });

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));
    {/* 업로드 버튼 코드 수정 끝*/ }

    return (
        <>
            <div className="container">
                {/* 업로드 버튼 코드 수정 시작*/}
                <div {...getRootProps({ className: 'dropzone' })} style={{ position: "inherit" }}>
                    <div className="upload_div">
                        <input {...getInputProps()} />
                        <div style={{
                            position: "relative",
                            top: "8%",
                            fontSize: "33px"
                        }}>
                            <img src={process.env.PUBLIC_URL + "/image_src/icon_clothes_mainpage.png"} />
                            &nbsp;&nbsp;비슷한 옷을 찾아 드릴게요!
                        </div>
                        <p style={{
                            position: "relative",
                            top: "10%",
                            fontSize: "20px",
                        }}>단 한번의 동작으로 찾고싶은 옷을 검색할 수 있습니다.
                        </p>
                        <button type="button" onClick={open}
                            style={{
                                position: "relative",
                                top: "14%",
                                borderRadius: "30px",
                                backgroundColor: "#FAFAFA",
                                border: "none"
                            }}>
                            <img src={process.env.PUBLIC_URL + "/image_src/images1.png"}
                                style={{
                                    width: "70%",
                                }} />
                        </button>
                        <div style={{
                            position: "relative",
                            top: "16%"
                        }}>
                            <p>또는 여기에 이미지를 드롭해주세요</p>
                        </div>
                    </div>
                    {/* 업로드 버튼 코드 수정 끝*/}
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
        <div className="ad_banner" style={{ position: "fixed", bottom: "0", width: "100%" }}>
            <img src={process.env.PUBLIC_URL + "/image_src/playdata_ad_banner.png"}
                width="50%" height="100px" />
        </div>
    );
}



export { UploadArea, Ad_banner };

