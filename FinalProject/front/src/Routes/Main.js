// 1. 이미지 업로드 div 영역 코드 
// 1.2 가운데 이미지 업로드 버튼 생성(UI 설계 필요)
import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import DragAndDrop from "../Components/Upload";

function UploadArea(props) {

    const Desktop = ({ children }) => {
        const isDesktop = useMediaQuery({ minWidth: 1025 })
        return isDesktop ? children : null
    }
    const Tablet = ({ children }) => {
        const isTablet = useMediaQuery({ minWidth:820, maxWidth: 1024 })
        return isTablet ? children : null
    }
    const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: 819 })
        return isMobile ? children : null
    }
    var guidelineTitle = [
        "사진을 통해 제품 찾기", "사진 모델 정보 검색", "이런 것들을 찾아드려요"
    ];
    var guidelineContent = [
        `위의 박스에 사용자의 이미지 파일을 드래그 앤 드롭 또는 버튼을 눌러 업로드하세요.
        이미지 파일을 업로드 해주시면, 저희 인공지능 기술로 이미지 안에서 
        감지된 옷을 통해 유사한 옷들을 검색하여 찾아드려요!`,
        `전신이 나오는 이미지 파일을 업로드 하신다면, 저희 인공지능 기술로
        이미지 분석하여 모델의 대략적인 키, 가슴 둘레 사이즈, 허리 둘레 사이즈 등을
        알려드릴 수 있어요! 이미지에서 신체 일부가 잘려있다면 검색 되지 않아요.`,
        `이미지 파일에서 감지된 옷들을 카테고리 별로 검색해 드려요!
        저희는 상의 계열, 하의 계열, 가방 카테고리를 검색해 드릴 수 있어요.
        검색된 결과가 화면에 출력되면 버튼을 눌러 카테고리 별로 구경하실 수 있어요!`
    ];
    
    return (
        <>
        <Desktop>
            <div>
                <DragAndDrop />
                <div className="parent" 
                    style={{
                        width:"80%", 
                        display:"flex", 
                        margin:"8vh 10% 0 10%",
                        position:"relative"

                }}>
                    {guidelineTitle.map((a,i) => {
                        return(
                        <div className="child" style={{background: "none", flex:"1", minHeight: "400px"}} key = {i}>
                            <img src={process.env.PUBLIC_URL + "/image_src/guideline_image"+(i+1)+".png"} style = {{width:"4.5vw", height:"9vh"}}/>
                            <h4 style={{marginTop:"1vh"}}>{guidelineTitle[i]}</h4>
                            <p style={{fontSize:"1vw", marginTop:"1vh", width:"75%", marginLeft:"12.5%"}}>
                                {guidelineContent[i]}
                            </p>
                        </div>
                        );
                    })}
                </div>
            </div>
        </Desktop>
        <Tablet>
            <DragAndDrop />
            <div className="parent" 
                style={{
                    width:"80%", 
                    display:"flex", 
                    margin:"8vh 10% 0 10%",
                    position:"relative"
                }}>
                {guidelineTitle.map((a,i) => {
                    if(i < 2){
                    return(
                        <div className="child" style={{background: "none", flex:"1", minHeight: "400px"}} key = {i}>
                            <img src={process.env.PUBLIC_URL + "/image_src/guideline_image"+(i+1)+".png"} style = {{width:"12vw", height:"9vh"}}/>
                            <h4 style={{marginTop:"1vh"}}>{guidelineTitle[i]}</h4>
                            <p style={{fontSize:"1vw", marginTop:"1vh", width:"75%", marginLeft:"12.5%"}}>
                                {guidelineContent[i]}
                            </p>
                        </div>
                    );}
                })}
                </div>
                <div className="parent" 
                style={{
                    width:"40%", 
                    display:"flex", 
                    margin:"-10vh 30% 0 30%",
                    position:"relative"
                }}>
                {guidelineTitle.map((a,i) => {
                    if(i >= 2 && i < 4){
                    return(
                        <div className="child" style={{background: "none", flex:"1", minHeight: "400px"}} key = {i}>
                            <img src={process.env.PUBLIC_URL + "/image_src/guideline_image"+(i+1)+".png"} style = {{width:"4.5vw", height:"9vh"}}/>
                            <h4 style={{marginTop:"1vh"}}>{guidelineTitle[i]}</h4>
                            <p style={{fontSize:"1vw", marginTop:"1vh", width:"75%", marginLeft:"12.5%"}}>
                                {guidelineContent[i]}
                            </p>
                        </div>
                    );}
                })}
            </div>
        </Tablet>
        <Mobile>
            <DragAndDrop />
                <div className = "parent"
                        style={{
                            width:"80%", 
                            margin:"5vh 10% 0 10%",
                        }}>
                        <div className = "child" style={{background: "none", minHeight: "400px"}} >
                            <img src={process.env.PUBLIC_URL + "/image_src/guideline_image1.png"} style = {{width:"12vw", height:"9vh"}}/>
                            <h4 style={{marginTop:"1vh"}}>{guidelineTitle[0]}</h4>
                            <p style={{fontSize:"2vw", marginTop:"1vh", width:"75%", marginLeft:"12.5%"}}>
                                {guidelineContent[0]}
                            </p>
                        </div>
                </div>
                {guidelineTitle.map((a,i) => {
                    if(i >0){
                    return(
                        <div className = "parent"
                            style={{
                                width:"80%", 
                                margin:"-8vh 10% 0 10%",
                            }} key= {i}>
                            <div className = "child" style={{background: "none", minHeight: "400px"}} >
                                <img src={process.env.PUBLIC_URL + "/image_src/guideline_image"+(i+1)+".png"} style = {{width:"12vw", height:"9vh"}}/>
                                <h4 style={{marginTop:"1vh"}}>{guidelineTitle[i]}</h4>
                                <p style={{fontSize:"2vw", marginTop:"1vh", width:"75%", marginLeft:"12.5%"}}>
                                    {guidelineContent[i]}
                                </p>
                            </div>
                        </div>
                        );}
                    })}            
        </Mobile>
        </>
    );
}




function Banner() {

    const bannerImgArray = ['playdata_ad_banner2.png', 'playdata_ad_banner1.png']
    const [count, setCount] = useState(0)
    
    const changeState = useRef();
    const boolean = useRef(false);

    function callback() {
        setCount(count + 1);
    }

    useEffect(() => {
        changeState.current = callback;
    })

    useEffect(() => {
        const timer = setInterval(() => {
            if (count < bannerImgArray.length -1) {
                boolean.current = false;
                setCount(prev => prev + 1);
            } else {
                boolean.current = true;
                setCount(0);
            }
        }, boolean.current === 0 ? 0: 4000);
        
        return () => {
            clearInterval(timer);
        }
    }, [count]);

    

    const BannerEffect = {
        display: "flex",
        flexDirection:"row",
        alignItems: "center",
    }

    const BannerElement = {
        width: "48vw",
        height: "100px",
        cursor: "pointer",
        alignItems: "center",
    }

    return (
        <>
            <div style ={{
                marginTop:"-6vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <div className="ad_banner">
                    <div className="banner_list" count = {count} boolean = {boolean.current}  
                        style={BannerEffect}>
                            <img src={process.env.PUBLIC_URL + "/image_src/" + bannerImgArray[count] }
                                style = {BannerElement} 
                                onClick = { () => 
                                {window.open( boolean ? "https://github.com/Domlnick/FinalProject": "https://playdata.io/bootcamp-all", "_blank"
                                ); console.log(boolean)}}/>
                    </div>
                </div>
            </div>
        </>
    );
}


export {UploadArea, Banner};