import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMediaQuery } from 'react-responsive';
import Paging from '../Components/Pagination.js';
import '../css/Paging.css';
import axios from 'axios';

const modelSizeValue = {
    marginLeft: "7em",
    float: "right"
}

const modelSpecTable = {
    margin: "1em auto",
    color: "#F59324",
    fontSize: "0.9em"
}
const catBtnAtciveStyleDesktop = {
    height: "4em",
    margin: "2.3vh 1vw 0 1vw",

    // background: "#B5D5E2",
    background: "#FFFFFF",
    color: "white",
    cursor: "pointer",

    fontWeight: "bold",

    letterSpacing: "1px",

    boxShadow: "-1px 3px 3px 0 rgba(80, 80, 80, 0.698)",

    border: "none",
    borderRadius: "1.8em"
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
    borderRadius: "1.8em"
}

const Sample = ({ card, type, sampleArr}) => {
    if(type === 'Desktop'){
        if (card == "원피스") {
            return (
                <>
                    <div>
                        {sampleArr.map((a, i) => {
                            return (
                                <img src={process.env.PUBLIC_URL + "/image_src/test_image120/women_onepiece_" + (i + 1) + ".jpg" } key={i}
                                    className="result-img-desktop" />
                            );

                        })}
                    </div>
                </>
            );
        } else if (card == '하의') {
            return (
                <>
                    <div>
                        {sampleArr.map((a, i) => {
                            return (
                                <img src={process.env.PUBLIC_URL + "/image_src/upload_sample" + (i % 3) + ".jpg"} className="result-img-desktop" key={i}/>
                            );
                        })}
                    </div>
                </>
            );
        } else if (card == '상의') {
            return (
                <>
                    <div>
                        {sampleArr.map((a, i) => {
                            return (
                                <img src={process.env.PUBLIC_URL + "/image_src/result_sample" + (i % 3) + ".jpg"} className="result-img-desktop" key={i}/>
                            );
                        })}
                    </div>
                </>
            );
        } else if (card == '후드') {
            return (
                <>
                    <div>
                        {sampleArr.map((a, i) => {
                            return (
                                <img src={process.env.PUBLIC_URL + "/image_src/test_image120/men_hoodie_" + (i + 1) + ".jpg"} key={i}
                                    className="result-img-desktop" />
                                );
                        })}
                    </div>
                </>
            );
        } else if (card == "청바지") {
            return (
                <>
                    <div>
                        {sampleArr.map((a, i) => {
                            return (
                                <img src={process.env.PUBLIC_URL + "/image_src/test_image120/men_jeans_" + (i + 1) + ".jpg"} key={i}
                                    className="result-img-desktop" />
                            );
                        })}
                    </div>
                </>
            );
        }
    }else if(type === 'Tablet'){
        if (card == "원피스") {
        return (
            <>
                <div>
                    {sampleArr.map((a, i) => {
                        return (
                            <img src={process.env.PUBLIC_URL + "/image_src/test_image120/women_onepiece_" + (i + 1) + ".jpg"} key={i}
                                className="result-img-tablet" />
                        );
                    })}
                </div>
            </>
        );
        } else if (card == '하의') {
            return (
                <>
                    <div>
                        {sampleArr.map((a, i) => {
                            return (
                                <img src={process.env.PUBLIC_URL + "/image_src/upload_sample" + (i % 3) + ".jpg"} className="result-img-tablet" key={i}/>
                            );
                        })}
                    </div>
                </>
            );
        } else if (card == '상의') {
            return (
                <>
                    <div>
                        {sampleArr.map((a, i) => {
                            return (
                                <img src={process.env.PUBLIC_URL + "/image_src/result_sample" + (i % 3) + ".jpg"} className="result-img-tablet" key={i}/>
                            );
                        })}
                    </div>
                </>
            );
        } else if (card == '후드') {
            return (
                <>
                    <div>
                        {sampleArr.map((a, i) => {
                            return (
                                <img src={process.env.PUBLIC_URL + "/image_src/test_image120/men_hoodie_" + (i + 1) + ".jpg"} key={i}
                                    className="result-img-tablet" />
                            );
                        })}
                    </div>
                </>
            );
        } else if (card == "청바지") {
            return (
                <>
                    <div>
                        {sampleArr.map((a, i) => {
                            return (
                                <img src={process.env.PUBLIC_URL + "/image_src/test_image120/men_jeans_" + (i + 1) + ".jpg"} key={i}
                                    className="result-img-tablet" />
                            );
                        })}
                    </div>
                </>
            );
        }
    }else if(type === 'Mobile'){
        if (card == "원피스") {
        return (
            <>
                <div>
                    {sampleArr.map((a, i) => {
                        return (
                            <img src={process.env.PUBLIC_URL + "/image_src/test_image120/women_onepiece_" + (i + 1) + ".jpg"} key={i}
                                className="result-img-mobile" />
                        );                       
                    })}
                </div>
            </>
        );
        } else if (card == '하의') {
            return (
                <>
                    <div>
                        {sampleArr.map((a, i) => {
                            return (
                                <img src={process.env.PUBLIC_URL + "/image_src/upload_sample" + (i % 3) + ".jpg"} className="result-img-mobile" key={i} />
                            );
                        })}
                    </div>
                </>
            );
        } else if (card == '상의') {
            return (
                <>
                    <div>
                        {sampleArr.map((a, i) => {
                            return (
                                <img src={process.env.PUBLIC_URL + "/image_src/result_sample" + (i % 3) + ".jpg"} className="result-img-mobile" key={i}/>
                            );
                        })}
                    </div>
                </>
            );
        } else if (card == '후드') {
            return (
                <>
                    <div>
                        {sampleArr.map((a, i) => {
                            return (
                                <img src={process.env.PUBLIC_URL + "/image_src/test_image120/men_hoodie_" + (i + 1) + ".jpg"} key={i}
                                    className="result-img-mobile" />
                            );
                        })}
                    </div>
                </>
            );
        } else if (card == "청바지") {
            return (
                <>
                    <div>
                        {sampleArr.map((a, i) => {
                            return (
                                <img src={process.env.PUBLIC_URL + "/image_src/test_image120/men_jeans_" + (i + 1) + ".jpg"} key={i}
                                    className="result-img-mobile" />
                                );
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
    }else if(type === "Tablet"){
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
    }else {
        return (
            <>
                <button
                    className={`cat_btn_mobile ${catActive ? catBtnActiveStyle : null}`}
                    onClick={() => { handleSetCat(name) 
                }}>
                    {name}
                </button>
            </>
        );
    }
    
}

function Result() {

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
        console.log("data길이:" + data.length)
        setData(categories.filter((v) => v === activeCat));
    }, [activeCat]);

    const sampleArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    /* 페이지네이션 미완성 */
    const [items, setItems] = useState(sampleArr);
    const [count, setCount] = React.useState(0); //아이템 총 개수
    const [currentPage, setCurrentPage] = React.useState(1); //현재페이지
    const [postPerPage] = React.useState(5); //페이지당 아이템 개수

    const [indexOfLastPost, setIndexOfLastPost] = React.useState(0);
    const [indexOfFirstPost, setIndexOfFirstPost] = React.useState(0);
    const [currentPosts, setCurrentPosts] = React.useState(0);
    
    useEffect(() => {
        setCount(items.length);
        setIndexOfLastPost(currentPage * postPerPage);
        setIndexOfFirstPost(indexOfLastPost - postPerPage);
        setCurrentPosts(items.slice(indexOfFirstPost, indexOfLastPost));
        console.log(items.length);
    }, [currentPage, indexOfFirstPost, indexOfLastPost, items, postPerPage]);

    const setPage = (e) => {
        setCurrentPage(e);
    }

    return (
        <>
            <Desktop>
                <div className="result-row-desktop">
                    <div className='left-result-desktop'>
                        <div>
                            <img className='left-top-image-desktop' src= {`${sessionStorage.getItem("uploadedImg")}`} />
                        </div>
                        <button className="left-image-changeBtn" type="button" onClick={open}>
                            <img src={process.env.PUBLIC_URL + "/image_src/uploadBtn.png"}
                                style={{
                                    width: "4.2em",
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
                                margin: "2.2em 0 0 1em",
                                // width: "7em",
                                height: "2em",
                                fontSize: "1.6em",
                                fontWeight: "bold",
                                textAlign: "center",
                                background: "none",
                                border: "none"
                            }}>
                                {activeCat == "All" ? null : data}
                            </div>
                            {typeof (activeCat) == "Object" ? null : <Sample card={"All"} />}
                            {data.map((g, i) => {
                                // if (i == data.length) setResultCnt(i);
                                return (
                                    <div>
                                        <Sample card={g} key={i} type="Desktop" sampleArr={items}/>
                                    </div>
                                );
                            })}
                            <Paging />
                        </div>
                    </div>
                </div>
            </Desktop>
            <Tablet>
                <>
                    <img className='left-top-image-tablet' src= {`${sessionStorage.getItem("uploadedImg")}`} />
                    <button type="button" onClick={open} style={{
                        marginTop: "3.4em",
                        marginLeft: "-4em",
                        background: "none",
                        border: "none",
                        position: "absolute"
                    }}>
                        <img src={process.env.PUBLIC_URL + "/image_src/uploadBtn.png"}
                            style={{
                                width: "5.7em",
                            }} />
                    </button>
                    <div style={{
                        margin:"3em auto",
                        display:"flex",
                        justifyContent:"center",
                        fontSize: "1.3em",
                        width: "50%",
                        height: "auto",
                        overflow: "hidden",
                        background: "#E8EDED",
                        borderRadius: "1.3em"
                    }}>
                        <p style={modelSpecTable}>
                            <span style={{
                                background : "#9DA0A0",
                                color: "white",
                                borderRadius:"1.3em"

                            }}>업로드 이미지 모델 분석 결과</span>
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
                        marginTop: "3em",
                        background: "#E8EDED",
                        borderRadius: "1.8em"
                    }}>
                        <div className='result-category-tablet'>
                            {categoryArr.map((idx, i) => {
                                if (idx === '치마' || idx === '가방') {
                                    return null;
                                } else {
                                    return (
                                        <>
                                            <Catbtn name={idx}
                                                type="Tablet"
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
                                margin: "1.3em 0 0 1em",
                                height: "2em",
                                fontSize: "1.6em",
                                fontWeight: "bold",
                                textAlign: "center",
                                background: "none",
                                border: "none"
                            }}>
                                {activeCat === "All" ? null : data}
                            </div>
                            {typeof (activeCat) === "Object" ? null : <Sample card={"All"} />}
                            {data.map((g, i) => {
                                // if (i === data.length) setResultCnt(i);
                                return (
                                    <div>
                                        <Sample card={g} key={i} type="Tablet" sampleArr={items} />
                                    </div>
                                );
                            })}
                            <Paging />

                        </div>
                    </div>
                </>
            </Tablet>
            <Mobile>
            <>
                    <img className='left-top-image-tablet' src= {`${sessionStorage.getItem("uploadedImg")}`} />
                    <button type="button" onClick={open} style={{
                        marginTop: "3.4em",
                        marginLeft: "-4em",
                        background: "none",
                        border: "none",
                        position: "absolute"
                    }}>
                        <img src={process.env.PUBLIC_URL + "/image_src/uploadBtn.png"}
                            style={{
                                width: "5.7em",
                            }} />
                    </button>
                    <div style={{
                        margin:"3em auto",
                        display:"flex",
                        justifyContent:"center",
                        fontSize: "0.9em",
                        width: "53%",
                        height: "auto",
                        overflow: "hidden",
                        background: "#E8EDED",
                        borderRadius: "1.3em"
                    }}>
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
                        marginTop: "3em",
                        background: "#E8EDED",
                        borderRadius: "1.8em"
                    }}>
                        <div className='result-category-mobile'>
                            {categoryArr.map((idx, i) => {
                                if (idx === '치마' || idx === '가방') {
                                    return null;
                                } else {
                                    return (
                                        <>
                                            <Catbtn 
                                                name={idx}
                                                type="Mobile"
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
                                margin: "1.3em 0 0 1em",
                                height: "2em",
                                fontSize: "1.6em",
                                fontWeight: "bold",
                                textAlign: "center",
                                background: "none",
                                border: "none"
                            }}>
                                {activeCat === "All" ? null : data}
                            </div>
                            {typeof (activeCat) === "Object" ? null : <Sample card={"All"} />}
                            {data.map((g, i) => {
                                if (i === data.length) {
                                    // setResultCnt(i);
                                }
                                    <Sample card={g} key={i} type="Mobile" sampleArr={items}/>
                            })}
                            {
                                currentPosts && items.length > 0 ?
                                (data.map((idx, i) => (
                                    <div>
                                        <Sample card ={idx} key = {i} type = "Mobile" />
                                    </div>
                                    ))
                                ) :
                                <div>게시물이 없습니다.</div>
                            }
                            <Paging page={currentPage} count={count} setPage = {setPage} />

                        </div>
                    </div>
                </>
            </Mobile>
        </>

    );
}



export default Result;