import React, {useCallback, useEffect, useMemo, useState} from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const dragActiveStyle ={
    color:"white",
    fontSize:"2em",
    padding:"7.67em 0",
    letterSpacing:"0",
    position:"absolute",
    textAlign:"center",
    width:"79.8%",
    background:"black",
    opacity:"0.7",
    borderRadius:"1.93em",
    zIndex:"9999",
    overflow:'hidden'
}

const baseStyle = {
    marginTop : '5%',
    marginLeft : '10%',
    width: '80%',
    height:  '34em',
    textAlign: 'center',
    border: '3px gray dashed',
    overflow: 'hidden',
    background: '#E8EDED',
    borderRadius: '4.5em'
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
    }, []);
    
    useEffect(() => {
        if(imgBase64 != null){
            sessionStorage.setItem("uploadedImg", imgBase64);
            
            // 이미지 Base64 String 비동기 전송
            axios.post('http://localhost:80/test', {
                file : imgBase64
            })
            .then((res) => {
                cntForNoLogined++;
                console.log(res.data.result_img_path)
                console.log(res.data.result_img_link)
                console.log(res.data.result_img_score)
                if(cntForNoLogined != 4){
                    imageToAI();
                }else if(cntForNoLogined === 4) {
                    alert("비회원일 경우, 하루 3회 이용 제한됩니다.");
                }
            })
            .catch((e) => {
                console.error(e);
            })
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
                <div style={{
                    marginTop: "1.5em",
                    fontSize: "2rem"
                }}>
                    <img src={process.env.PUBLIC_URL + "/image_src/icon_clothes_mainpage.png"}
                        style = {{width:"3rem", height:"5.3rem"}}/>
                    &nbsp;&nbsp;비슷한 옷을 찾아 드릴게요!
                </div>
                
                <p style={{
                    marginTop: "3%",
                    fontSize : "1.1rem"
                }}>버튼으로 업로드
                    {/* 단 한번의 동작으로 찾고 싶은 옷을 검색할 수 있습니다. */}
                </p>
                <button type="button" onClick={open} 
                    style ={{
                        marginTop: "-0.8%",
                        background: "none",
                        border: "none"
                }}>
                <img src={process.env.PUBLIC_URL + "/image_src/images.png"}
                                style={{
                                    width: "11rem",
                                    background:"none",
                                    borderRadius: "1.25rem",
                                    boxShadow : "-1px 3px 3px 0 rgba(80, 80, 80, 0.698)",
                                }} />
                </button>
                <p style={{marginTop:"1.3em"}}>또는 여기에 이미지를 드롭해주세요.</p>       
            </div>
        </div>
        
        </> :
        <div>
        <div {...getRootProps({className: 'dropzone', style})}>
            <input {...getInputProps()} />
            
            <div style={{display : "none"}}>여기에 파일을 놔주세요.</div>
            
            <div style={{
                    marginTop: "1.5em",
                    fontSize: "2rem"
                    }}>
            <img src={process.env.PUBLIC_URL + "/image_src/icon_clothes_mainpage.png"}
                style = {{width:"3rem", height:"5.3rem"}}/>
            &nbsp;&nbsp;비슷한 옷을 찾아 드릴게요!
            </div>
            <p style={{
                marginTop: "3%",
                fontSize : "1.1rem"
            }}>버튼으로 업로드
                {/* 단 한번의 동작으로 찾고 싶은 옷을 검색할 수 있습니다. */}
            </p>
            <button type="button" onClick={open} 
                style ={{
                    marginTop: "-0.8%",
                    background: "none",
                    border: "none"
            }}>
            <img src={process.env.PUBLIC_URL + "/image_src/images.png"}
                            style={{
                                width: "11rem",
                                background:"none",
                                borderRadius: "1.25rem",
                                boxShadow : "-1px 3px 3px 0 rgba(80, 80, 80, 0.698)",
                            }} />
            </button>
            <p style={{marginTop:"1.3em"}}>또는 여기에 이미지를 드롭해주세요.</p> 
        </div>
        <div>
            
        </div>
    </div>
        }
        </>
    );
}

export default DragAndDrop ;