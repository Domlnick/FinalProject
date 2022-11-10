import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { isLogined } from '../Routes/User/Login';
import Cookies from 'universal-cookie';

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
    const cookies = new Cookies();
    
    //Dropzone
    const [imgBase64, setImgBase64] = useState();

    const onDrop = useCallback(async acceptedFiles => {
        //이미지 드랍 -> 이미지 base64 변환 
        // -> base64 String 백엔드 비동기 전송 -> session에 담기 -> 페이지 이동

        //이미지 Base64 변환
        const file = acceptedFiles.find(f => f)
        let reader = new FileReader()

        reader.readAsDataURL(file);
        reader.onload = () => {
            setImgBase64(reader.result);
            
            if(!isLogined()) {  //로그인 유저가 아닐경우 = jwt token이 없을 경우
                //기능 이용시 이용횟수 + 1
                console.log(1)
                // 비로그인 유저 IP 조회
                axios.get("https://api.ipify.org/?format=json")
                .then((res) => {
                    console.log(2)
                    // db 해당 IP 조회
                    axios.post('http://ec2-43-200-216-202.ap-northeast-2.compute.amazonaws.com:8080/issignedin', {
                        visitUserIp : res.data.ip,
                        usedCount : 1,
                    }).then((res) => {
                        console.log(3)
                        if(res.data.result === 2){
                            alert("비로그인으로 이용할 경우 사용 횟수 3회로 제한됩니다. \n");
                        }else if (res.data.result === 999){
                            alert("오늘 사용가능한 횟수를 모두 소진하셨습니다.");
                            setImgBase64(null)
                        }
                    }).catch((e) => {
                        console.error(e)
                    })
                })
            }}           
    }, []);
    
    useEffect(() => {
        console.log("사진 업로드")
        if(imgBase64 === null){

        }else if(imgBase64 != null){
            sessionStorage.setItem("uploadedImg", imgBase64);
            // 이미지 Base64 String 비동기 전송
            axios.post('http://ec2-43-200-216-202.ap-northeast-2.compute.amazonaws.com:80/upload', {
                file : imgBase64
            })
            .then((res) => {
                // res.data.result - url(이미지), 하이퍼링크url, 유사도점수
                // console.log(res.data.result);
                let data =  res.data.top
                // console.log(data);
                console.log(typeof(data));
                console.log(data)
                
                console.log(data.test)
                
                // JSON.parse(res.data.top)
                // console.log(res.data.top.test)
                // console.log(JSON.parse(res.data.top).length)
                // console.log(res.data.top.size)
                
                // cookies.set("pred_img", res.data.top  result_img_pat_top);
                // cookies.set("pred_img_url", res.data.result_img_link_top);
                // cookies.set("pred_img_score", res.data.result_img_score_top);

                console.log(cookies.get("pred_img"))
                console.log(cookies.get("pred_img_url"))
                console.log(cookies.get("pred_img_score"))


                imageToAI();
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