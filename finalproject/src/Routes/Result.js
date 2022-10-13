import React from 'react';

function Result() {
    const fileInput = React.useRef();

    const handleButtonClick = e => {
        fileInput.current.click();
    };

    return(
        <>
            <div className="result-row">
                <div className='left-result'>
                    <div className='left-top-image'>
                    <label for = "upload-file" style={{
                        float : "right",
                        backgroundColor:"#FF6600",
                        width : "25px",
                        borderRadius: "100px",
                        color: "white",
                        cursor: "pointer"
                    }}>?<input type="file" id="upload-file" multiple="multiple" 
                            style={{ display : "none" }}/>
                    </label>
                    <br/>
                    <img src = {process.env.PUBLIC_URL + "/image_src/sample.png"}
                        style = {{
                            marginTop : "10%",
                            marginBottom : "15%",
                            width : "75%",
                            height : "80%",
                            borderRadius : "40px",
                        }}/>
                    </div>

                    <div className="left-bottom-text">
                        <br/><br/><br/><br/>첨부 이미지 모델 스펙 출력 영역
                    </div>
                </div>

                <div className="right-result" style={{

                }}>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    결과 이미지 출력 영역
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                </div>
            </div>
            
            
        </>
        
    );
}

export default Result;