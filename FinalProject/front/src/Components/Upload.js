import React, {useCallback, useEffect, useMemo, useState} from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const dragActiveStyle ={
    color:"white",
    fontSize:"30px",
    padding:"240px 0",
    letterSpacing:"0",
    position:"absolute",
    textAlign:"center",
    width:"79.6%",
    background:"black",
    height: "555px",
    opacity:"0.7",
    borderRadius:"80px",
    zIndex:"9999"
}

const baseStyle = {
    marginTop : '5%',
    marginLeft : '10%',
    width: '80%',
    height:  '560px',
    textAlign: 'center',
    border: '3px gray dashed',
    overflow: 'hidden',
    background: '#E8EDED',
    borderRadius: '80px'
}


function DragAndDrop() {
    //페이지 이동용
    const navigate = useNavigate();
    const imageToAI = () => {
        navigate("/result");
    }

    let cntForNoLogined = 0;

    //Dropzone
    const [imgBase64, setImgBase64] = useState();

    const onDrop = useCallback(acceptedFiles => {
        //이미지 드랍 -> 이미지 base64 변환 
        // -> base64 String 백엔드 비동기 전송 -> session에 담기 -> 페이지 이동

        //이미지 Base64 변환
        const file = acceptedFiles.find(f => f)
        let reader = new FileReader()

        reader.readAsDataURL(file);
        reader.onload = () => {
            setImgBase64(reader.result);
        }
        
        // 이미지 Base64 String 비동기 전송
        axios.post('http://localhost:8080/upload', {
            file : imgBase64
        })
        .then((res) => {
            cntForNoLogined++;
            if(cntForNoLogined != 4){
                imageToAI();
            }else if(cntForNoLogined === 4) {
                alert("비회원일 경우, 하루 3회 이용 제한됩니다.");
            }
        })
        .catch((e) => {
            console.error(e);
        })


    }, []);

    useEffect(() => {
        if(imgBase64 != null){
            sessionStorage.setItem("uploadedImg", imgBase64);
        }
    }, [imgBase64]) 

    const {
        getRootProps, 
        getInputProps, 
        open, 
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop,
        multiple: false,
        accept  : 'image/png, image/jpeg, image/jpg',
        noClick: true,
        noKeyboard: true
        }, []);

    const style = useMemo(() => ({
        ...baseStyle,
        // ...(isDragActive ? activeStyle : baseStyle),
        // ...(isDragAccept ? acceptStyle : baseStyle),
        // ...(isDragReject ? rejectStyle : baseStyle)
    }), [
        isDragActive, isDragAccept, isDragReject
    ]);

    return(
        <>
        {isDragAccept ? 
        <>
        <div>
            <div {...getRootProps({className: 'dropzone', style})} >
                <input {...getInputProps()} />
                
                <div style={dragActiveStyle}>여기에 파일을 놔주세요.</div>
                
                <p style={{
                    marginTop: "3%",
                    fontSize : "20px"
                }}>버튼으로 업로드
                    {/* 단 한번의 동작으로 찾고 싶은 옷을 검색할 수 있습니다. */}
                </p>
                <button type="button" onClick={open} 
                    style ={{
                        marginTop: "-1.5%",
                        background: "none",
                        border: "none"
                }}>
                <img src={process.env.PUBLIC_URL + "/image_src/images.png"}
                                style={{
                                    width: "180px",
                                    background:"none",
                                    borderRadius: "1.3vw",
                                    boxShadow : "-1px 3px 3px 0 rgba(80, 80, 80, 0.698)",
                                }} />
                </button>
                <p style={{marginTop:"25px"}}>또는 여기에 이미지를 드롭해주세요.</p>       
            </div>
        </div>
        
        </> :
        <div>
        <div {...getRootProps({className: 'dropzone', style})}>
            <input {...getInputProps()} />
            
            <div style={{display : "none"}}>여기에 파일을 놔주세요.</div>
            
            <div style={{
                    marginTop: "60px",
                    fontSize: "30px"
                    }}>
            <img src={process.env.PUBLIC_URL + "/image_src/icon_clothes_mainpage.png"}
                style = {{width:"40px", height:"6vh"}}/>
            &nbsp;&nbsp;비슷한 옷을 찾아 드릴게요!
            </div>
            <p style={{
                marginTop: "3%",
                fontSize : "20px"
            }}>버튼으로 업로드
                {/* 단 한번의 동작으로 찾고 싶은 옷을 검색할 수 있습니다. */}
            </p>
            <button type="button" onClick={open} 
                style ={{
                    marginTop: "-1.5%",
                    background: "none",
                    border: "none"
            }}>
            <img src={process.env.PUBLIC_URL + "/image_src/images.png"}
                            style={{
                                width: "180px",
                                background:"none",
                                borderRadius: "1.3vw",
                                boxShadow : "-1px 3px 3px 0 rgba(80, 80, 80, 0.698)",
                            }} />
            </button>
            <p style={{marginTop:"25px"}}>또는 여기에 이미지를 드롭해주세요.</p> 
        </div>
        <div>
            
        </div>
    </div>
        }
        </>
    );
}

export default DragAndDrop ;