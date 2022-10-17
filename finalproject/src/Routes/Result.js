import React from 'react';
import { useDropzone } from 'react-dropzone';

function Result() {
    const { open } = useDropzone({
        // Disable click and keydown behavior
        noClick: true,
        noKeyboard: true
    });

    return (
        <>
            <div className="result-row">
                <div className='left-result'>
                    <div className='left-top-image'>
                        {/* 업로드 버튼 코드 수정 시작*/}
                        <button type="button" onClick={open}
                            style={{
                                marginLeft: "19.8%",
                                marginTop: "-0.828%",
                                background: "none",
                                border: "none",
                                position: "absolute"
                            }}>
                            <img src={process.env.PUBLIC_URL + "/image_src/uploadBtn.png"}
                                style={{
                                    width: "50%"
                                }} />
                        </button>
                        {/* 업로드 버튼 코드 수정 끝*/}

                        <img src={process.env.PUBLIC_URL + "/image_src/sample.png"}
                            style={{
                                marginTop: "10%",
                                marginBottom: "15%",
                                width: "75%",
                                height: "80%",
                                borderRadius: "40px",
                            }} />
                    </div>

                    <div className="left-bottom-text">
                        <br /><br /><br /><br />첨부 이미지 모델 스펙 출력 영역
                    </div>
                </div>

                <div className="right-result" style={{

                }}>
                    <br /><br /><br /><br /><br /><br /><br /><br /><br />
                    <br /><br /><br /><br /><br /><br /><br /><br /><br />
                    <br /><br /><br /><br /><br /><br /><br /><br /><br />
                    결과 이미지 출력 영역
                    <br /><br /><br /><br /><br /><br /><br /><br /><br />
                </div>
            </div>


        </>

    );
}

export default Result;