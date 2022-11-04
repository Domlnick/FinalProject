import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMediaQuery } from 'react-responsive';
import Pagination from "react-js-pagination";
import '../css/Paging.css';
import axios from 'axios';

const modelSizeValue = {
    marginLeft: "7vw",
    float: "right"
}

const modelSpecTable = {
    marginLeft: "3vw",
    // marginTop: "",
    minHeight: "5vh",
    color: "#F59324",
    fontSize: "2.2vw"
}

const Sample = ({ card, type }) => {
    const sampleArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    if(type === 'Desktop'){
        if (card == "원피스") {
            return (
                <>
                    <div>
                        {sampleArr.map((a, i) => {
                            if (i < 3) {
                                return (
                                    <img src={process.env.PUBLIC_URL + "/image_src/test_image120/women_onepiece_" + (i + 1) + ".jpg"}
                                        className="result-img-fr-desktop" />
                                );
                            } else if (i == sampleArr.length - 1 || i == sampleArr.length - 2 || i == sampleArr.length - 3) {
                                return (
                                    <img src={process.env.PUBLIC_URL + "/image_src/test_image120/women_onepiece_" + (i + 1) + ".jpg"}
                                        className="result-img-lr-desktop" />
                                );
                            } else {
                                return (
                                    <img src={process.env.PUBLIC_URL + "/image_src/test_image120/women_onepiece_" + (i + 1) + ".jpg"}
                                        className="result-img-desktop" />
                                );
                            }
                        })}
                    </div>
                </>
            );
        } else if (card == '하의') {
            return (
                <>
                    <div>
                        {sampleArr.map((a, i) => {
                            if (i < 3) {
                                return (
                                    <img src={process.env.PUBLIC_URL + "/image_src/upload_sample" + (i % 3) + ".jpg"}
                                    className="result-img-fr-desktop" />
                                );
                            } else if (i == sampleArr.length - 1) {
                                return (
                                    <img src={process.env.PUBLIC_URL + "/image_src/upload_sample" + (i % 3) + ".jpg"} className="result-img-lr-desktop" />
                                );
                            } else {
                                return (
                                    <img src={process.env.PUBLIC_URL + "/image_src/upload_sample" + (i % 3) + ".jpg"} className="result-img-desktop" />
                                );
                            }
                        })}
                    </div>
                </>
            );
        } else if (card == '상의') {
            return (
                <>
                    <div>
                        {sampleArr.map((a, i) => {
                            if (i < 3) {
                                return (
                                    <img src={process.env.PUBLIC_URL + "/image_src/result_sample" + (i % 3) + ".jpg"}
                                        className="result-img-fr-desktop" />
                                );
                            } else if (i == sampleArr.length - 1) {
                                return (
                                    <img src={process.env.PUBLIC_URL + "/image_src/result_sample" + (i % 3) + ".jpg"} className="result-img-lr-desktop" />
                                );
                            } else {
                                return (
                                    <img src={process.env.PUBLIC_URL + "/image_src/result_sample" + (i % 3) + ".jpg"} className="result-img-desktop" />
                                );
                            }
                        })}
                    </div>
                </>
            );
        } else if (card == '후드') {
            return (
                <>
                    <div>
                        {sampleArr.map((a, i) => {
                            if (i < 3) {
                                return (
                                    <img src={process.env.PUBLIC_URL + "/image_src/test_image120/men_hoodie_" + (i + 1) + ".jpg"}
                                        className="result-img-fr-desktop" key={i} />
                                );
                            } else if (i == sampleArr.length - 1 || i == sampleArr.length - 2 || i == sampleArr.length - 3) {
                                return (
                                    <img src={process.env.PUBLIC_URL + "/image_src/test_image120/men_hoodie_" + (i + 1) + ".jpg"}
                                        className="result-img-lr-desktop" />
                                );
                            } else {
                                return (
                                    <img src={process.env.PUBLIC_URL + "/image_src/test_image120/men_hoodie_" + (i + 1) + ".jpg"}
                                        className="result-img-desktop" />
                                );
                            }
                        })}
                    </div>
                </>
            );
        } else if (card == "청바지") {
            return (
                <>
                    <div>
                        {sampleArr.map((a, i) => {
                            if (i < 3) {
                                return (
                                    <img src={process.env.PUBLIC_URL + "/image_src/test_image120/men_jeans_" + (i + 1) + ".jpg"}
                                        className="result-img-fr-desktop" />
                                );
                            } else if (i == sampleArr.length - 1 || i == sampleArr.length - 2 || i == sampleArr.length - 3) {
                                return (
                                    <img src={process.env.PUBLIC_URL + "/image_src/test_image120/men_jeans_" + (i + 1) + ".jpg"}
                                        className="result-img-lr-desktop" />
                                );
                            } else {
                                return (
                                    <img src={process.env.PUBLIC_URL + "/image_src/test_image120/men_jeans_" + (i + 1) + ".jpg"}
                                        className="result-img-desktop" />
                                );
                            }
                        })}
                    </div>
                </>
            );
        }
    }else {
        if (card == "원피스") {
        return (
            <>
                <div>
                    {sampleArr.map((a, i) => {
                        if (i < 3) {
                            return (
                                <img src={process.env.PUBLIC_URL + "/image_src/test_image120/women_onepiece_" + (i + 1) + ".jpg"}
                                    className="result-img-fr-tablet" />
                            );
                        } else if (i == sampleArr.length - 1 || i == sampleArr.length - 2 || i == sampleArr.length - 3) {
                            return (
                                <img src={process.env.PUBLIC_URL + "/image_src/test_image120/women_onepiece_" + (i + 1) + ".jpg"}
                                    className="result-img-lr-tablet" />
                            );
                        } else {
                            return (
                                <img src={process.env.PUBLIC_URL + "/image_src/test_image120/women_onepiece_" + (i + 1) + ".jpg"}
                                    className="result-img-tablet" />
                            );
                        }
                    })}
                </div>
            </>
        );
        } else if (card == '하의') {
            return (
                <>
                    <div>
                        {sampleArr.map((a, i) => {
                            if (i < 3) {
                                return (
                                    <img src={process.env.PUBLIC_URL + "/image_src/upload_sample" + (i % 3) + ".jpg"}
                                        className="result-img-fr-tablet" />
                                );
                            } else if (i == sampleArr.length - 1) {
                                return (
                                    <img src={process.env.PUBLIC_URL + "/image_src/upload_sample" + (i % 3) + ".jpg"} className="result-img-lr-tablet" />
                                );
                            } else {
                                return (
                                    <img src={process.env.PUBLIC_URL + "/image_src/upload_sample" + (i % 3) + ".jpg"} className="result-img-tablet" />
                                );
                            }
                        })}
                    </div>
                </>
            );
        } else if (card == '상의') {
            return (
                <>
                    <div>
                        {sampleArr.map((a, i) => {
                            if (i < 3) {
                                return (
                                    <img src={process.env.PUBLIC_URL + "/image_src/result_sample" + (i % 3) + ".jpg"}
                                        className="result-img-fr-tablet" />
                                );
                            } else if (i == sampleArr.length - 1) {
                                return (
                                    <img src={process.env.PUBLIC_URL + "/image_src/result_sample" + (i % 3) + ".jpg"} className="result-img-lr-tablet" />
                                );
                            } else {
                                return (
                                    <img src={process.env.PUBLIC_URL + "/image_src/result_sample" + (i % 3) + ".jpg"} className="result-img-tablet" />
                                );
                            }
                        })}
                    </div>
                </>
            );
        } else if (card == '후드') {
            return (
                <>
                    <div>
                        {sampleArr.map((a, i) => {
                            if (i < 3) {
                                return (
                                    <img src={process.env.PUBLIC_URL + "/image_src/test_image120/men_hoodie_" + (i + 1) + ".jpg"}
                                        className="result-img-fr-tablet" key={i} />
                                );
                            } else if (i == sampleArr.length - 1 || i == sampleArr.length - 2 || i == sampleArr.length - 3) {
                                return (
                                    <img src={process.env.PUBLIC_URL + "/image_src/test_image120/men_hoodie_" + (i + 1) + ".jpg"}
                                        className="result-img-lr-tablet" />
                                );
                            } else {
                                return (
                                    <img src={process.env.PUBLIC_URL + "/image_src/test_image120/men_hoodie_" + (i + 1) + ".jpg"}
                                        className="result-img-tablet" />
                                );
                            }
                        })}
                    </div>
                </>
            );
        } else if (card == "청바지") {
            return (
                <>
                    <div>
                        {sampleArr.map((a, i) => {
                            if (i < 3) {
                                return (
                                    <img src={process.env.PUBLIC_URL + "/image_src/test_image120/men_jeans_" + (i + 1) + ".jpg"}
                                        className="result-img-fr-tablet" />
                                );
                            } else if (i == sampleArr.length - 1 || i == sampleArr.length - 2 || i == sampleArr.length - 3) {
                                return (
                                    <img src={process.env.PUBLIC_URL + "/image_src/test_image120/men_jeans_" + (i + 1) + ".jpg"}
                                        className="result-img-lr-tablet" />
                                );
                            } else {
                                return (
                                    <img src={process.env.PUBLIC_URL + "/image_src/test_image120/men_jeans_" + (i + 1) + ".jpg"}
                                        className="result-img-tablet" />
                                );
                            }
                        })}
                    </div>
                </>
            );
        }
    }
    
}
function Catbtn({ name, catActive, handleSetCat, catBtnActiveStyle, type}) {

    if(type === "Desktop"){
        return (
            <>
                <button
                    className={`cat_btn_Desktop ${catActive ? catBtnActiveStyle : null}`}
                    onClick={() => { handleSetCat(name) 
                }}>
                    {name}
                </button>
            </>
        );
    }else {
        return (
            <>
                <button
                    className={`cat_btn_tablet ${catActive ? catBtnActiveStyle : null}`}
                    onClick={() => { handleSetCat(name) 
                }}>
                    {name}
                </button>
            </>
        );
    }
    
}

function Result() {
    
    const catBtnAtciveStyleDesktop = {
        height: "4vh",
        margin: "2.3vh 1vw 0 1vw",
    
        background: "#B5D5E2",
        color: "white",
        cursor: "pointer",
    
        fontWeight: "bold",
    
        letterSpacing: "1px",
    
        boxShadow: "-1px 3px 3px 0 rgba(80, 80, 80, 0.698)",
    
        border: "none",
        borderRadius: "5px"
    }
    const catBtnAtciveStyleTablet = {
        width: "5.3vw",
        height: "4vh",
        margin: "2.3vh 1vw 0 1vw",
    
        background: "#B5D5E2",
        color: "white",
        cursor: "pointer",
    
        fontSize: "1.2vw",
        fontWeight: "bold",
    
        letterSpacing: "1px",
    
        boxShadow: "-1px 3px 3px 0 rgba(80, 80, 80, 0.698)",
    
        border: "none",
        borderRadius: "5px"
    }



    // 이후 코어쪽으로부터 카테고리 받아서 배열에 담기
    const categoryArr = ['상의', '하의', '가방', '후드', '원피스', '청바지', '치마'];

    // 이미지 재업로드
    const [reUploadImg, setReUploadImg] = useState();
    
    const onDrop = useCallback(acceptedFiles => {
        //이미지 드랍 -> 이미지 base64 변환 
        // -> base64 String 백엔드 비동기 전송 -> session에 담기 -> 페이지 이동

        //이미지 Base64 변환
        const file = acceptedFiles.find(f => f)
        let reader = new FileReader()

        reader.readAsDataURL(file);
        reader.onload = () => {
            setReUploadImg(reader.result);
        }
        
        // 이미지 Base64 String 비동기 전송
        axios.post('http://localhost:8080/upload', {
            file : reUploadImg
        })
        .then((res) => {
            
        })
        .catch((e) => {
            console.error(e);
        })


    }, []);

    useEffect(() => {
        if(reUploadImg != null){
            sessionStorage.setItem("uploadedImg", reUploadImg);
            window.location.reload(); // 테스트용

        }
    }, [reUploadImg]) 

    const { open } = useDropzone({
        onDrop,
        noClick: true,
        noKeyboard: true,
        multiple: false,
        accept  : 'image/png, image/jpeg, image/jpg',
    });

    const Desktop = ({ children }) => {
        const isDesktop = useMediaQuery({ minWidth: 1025 })
        return isDesktop ? children : null
    }
    const Tablet = ({ children }) => {
        const isTablet = useMediaQuery({ maxWidth: 1024 })
        return isTablet ? children : null
    }
    /* 카테고리 필터 기능 */
    const categories = [...new Set(categoryArr.map((item) => item))];

    const [activeCat, setActiveCat] = useState(categories);
    const [data, setData] = useState(categories);

    useEffect(() => {
        setActiveCat(categories[0]);
    }, [])

    // useState() 렌더링으로는 바로 적용이 안됨
    // useEffect()에서 렌더링 후 바로 업데이트 하기 위한 함수를 설정	
    useEffect(() => {
        setData(categories.filter((v) => v === activeCat));
    }, [activeCat]);

    /* 페이지네이션 미완성 */
    const [resultCnt, setResultCnt] = useState([]);
    const [currentpage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(currentpage);
    })

    return (
        <>
            <Desktop>
                <div className="result-row-desktop">
                    <div className='left-result-desktop'>
                        <div>
                            <img className='left-top-image-desktop' src= {`${sessionStorage.getItem("uploadedImg")}`} />
                            {/* <img className='left-top-image-desktop' src={process.env.PUBLIC_URL + "/image_src/upload_sample.jpg"} /> */}
                            {/* <img className='left-top-image-desktop' src={process.env.PUBLIC_URL + "/image_src/upload_sample2.jpg"}/> */}
                        </div>
                        <button className="left-image-changeBtn" type="button" onClick={open}>
                            <img src={process.env.PUBLIC_URL + "/image_src/uploadBtn.png"}
                                style={{
                                    width: "4vw",
                                }} />다시 업로드하기
                        </button>
                        <div className="left-bottom-text-desktop">
                            <br /><br /><br /><br /><br /><br />첨부 이미지 모델 스펙 출력 영역
                        </div>
                    </div>

                    <div className="right-result-desktop">
                        <div className='result-category-desktop'>
                            {categoryArr.map((idx, i) => {
                                if (idx == '치마' || idx == '가방') {
                                    return null;
                                } else {
                                    return (
                                        <>
                                            <Catbtn name={idx}
                                                type = "Desktop"
                                                catActive={activeCat === { idx } ? true : false}
                                                handleSetCat={setActiveCat}
                                                catBtnActiveStyle = {catBtnAtciveStyleDesktop}
                                                key={idx}
                                            />
                                        </>
                                    );
                                }
                            })}
                        </div>
                        <div className='result-list-desktop' style={{ overflow: "hidden" }}>
                            <div style={{
                                margin: "4vh 0 0 2vw",
                                width: "7vw",
                                height: "3vh",
                                fontSize: "1vw",
                                fontWeight: "bold",
                                textAlign: "center",
                                background: "none",
                                border: "none"
                            }}>
                                {activeCat == "All" ? null : data}
                            </div>
                            {typeof (activeCat) == "Object" ? null : <Sample card={"All"} />}
                            {data.map((g, i) => {
                                if (i == data.length) setResultCnt(i);
                                return (
                                    <div>
                                        <Sample card={g} key={i} type="Desktop" />
                                    </div>
                                );
                            })}
                            <Pagination
                                activePage={currentpage}
                                itemClass={"page-item"}
                                itemsCountPerPage={6}
                                totalItemsCount={resultCnt}
                                pageRangeDisplayed={5}
                                prevPageText={"<"}
                                nextPageText={">"}
                            // onChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </Desktop>
            <Tablet>
                <>
                    {/* <img className='left-top-image' src={process.env.PUBLIC_URL + "/image_src/upload_sample.jpg"} */}
                    {/* <div style={{float:'left'}}> */}
                    {/* <img src={process.env.PUBLIC_URL + "/image_src/sample.png"} */}
                    <img src={process.env.PUBLIC_URL + "/image_src/upload_sample0.jpg"}
                        style={{
                            margin: "5vh 0 0 0",
                            borderRadius: "3vw",
                            minWidth: "40vw",
                            maxWidth: "55vw",
                            minHeight: "480px",
                            maxHeight: "40vh",

                            position: "relative"
                        }} />
                    <button type="button" onClick={open} style={{
                        marginTop: "4.1vh",
                        marginLeft: "-8.5vw",
                        background: "none",
                        border: "none",
                        position: "absolute"
                    }}>
                        <img src={process.env.PUBLIC_URL + "/image_src/uploadBtn.png"}
                            style={{
                                width: "10vw",
                            }} />
                    </button>
                    <div style={{
                        margin: "3vh 0 0 31vw",
                        fontSize: "15px",
                        width: "37vw",
                        height: "auto",
                        minHeight: "100px",
                        overflow: "hidden",
                        background: "#E8EDED",
                        borderRadius: "3vw"
                    }}>
                        <br />
                        <p style={modelSpecTable}>
                            <table>
                                <tr>
                                    <span style={{ float: 'left' }}>Model Height</span>
                                    <span style={modelSizeValue}>178 cm</span>
                                </tr>
                                <tr>
                                    <span style={{ float: 'left' }}>Model Chest Size</span>
                                    <span style={modelSizeValue}>178 cm</span>
                                </tr>
                                <tr>
                                    <span style={{ float: 'left' }}>Model Waist Size</span>
                                    <span style={modelSizeValue}>178 cm</span>
                                </tr>
                            </table>
                        </p>
                    </div>

                    <div style={{
                        marginLeft: "7.5%",
                        marginRight: "7.5%",
                        width: "85%",
                        marginTop: "3vh",
                        background: "#E8EDED",
                        borderRadius: "50px"
                    }}>
                        <div className='result-category-tablet'>
                            {categoryArr.map((idx, i) => {
                                if (idx === '치마' || idx === '가방') {
                                    return null;
                                } else {
                                    return (
                                        <>
                                            <Catbtn name={idx}
                                                handleSetCat={setActiveCat}
                                                catBtnActiveStyle={catBtnAtciveStyleTablet}
                                                key={idx}
                                            />
                                        </>
                                    );
                                }
                            })}
                        </div>
                        <div className='result-list-tablet' style={{ overflow: "hidden" }}>
                            <div style={{
                                margin: "4vh 0 0 2vw",
                                width: "7vw",
                                height: "3vh",
                                fontSize: "1vw",
                                fontWeight: "bold",
                                textAlign: "center",
                                background: "none",
                                border: "none"
                            }}>
                                {activeCat === "All" ? null : data}
                            </div>
                            {typeof (activeCat) === "Object" ? null : <Sample card={"All"} />}
                            {data.map((g, i) => {
                                if (i === data.length) setResultCnt(i);
                                return (
                                    <div>
                                        <Sample card={g} key={i} />
                                    </div>
                                );
                            })}
                            <Pagination
                                activePage={currentpage}
                                itemClass={"page-item"}
                                itemsCountPerPage={6}
                                totalItemsCount={resultCnt}
                                pageRangeDisplayed={5}
                                prevPageText={"<"}
                                nextPageText={">"}
                            // onChange={handlePageChange}
                            />
                        </div>
                    </div>
                </>
            </Tablet>
        </>

    );
}

export default Result;