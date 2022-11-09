import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMediaQuery } from 'react-responsive';
import '../css/Paging.css';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';
import { isLogined } from './User/Login';

const modelSizeValue = {
    marginLeft: "4em",
    float: "right"
}

const modelSpecTable = {
    margin: "1em auto",
    color: "#F59324",
    fontSize: "0.9em",
}

const imagesList = (card)  => {
    const post = new Array();
    
    if (card === "원피스") {
        for(let i =0; i < 100; i++){
            let data = new Object();
            
            data.number = i;
            data.src = `/image_src/test_image120/women_onepiece_${(i+1)%30+1}.jpg`;
            data.className = "result-img-"

            post.push(data);
        }

        return post;
    } else if (card === '하의') {
        for(let i =0; i < 100; i++){
            let data = new Object();

            data.number = i;
            data.src = `/image_src/upload_sample${i%3}.jpg`;
            data.className = "result-img-"
            
            post.push(data);
        }

        return post;
    } else if (card === '상의') {
        for(let i =0; i < 100; i++){
            let data = new Object();

            data.number = i;
            data.src = `/image_src/result_sample${i%3}.jpg`;
            data.className = `result-img-`;
            
            post.push(data);
        }

        return post;
    } else if (card === '후드') {
        for(let i =0; i < 100; i++){
            let data = new Object();

            data.number = i;
            data.src = `/image_src/test_image120/men_hoodie_${(i+1)%30+1}.jpg`;
            data.className = "result-img-"
            
            post.push(data);
        }

        return post;
    } else if (card === "청바지") {
        for(let i =0; i < 100; i++){
            let data = new Object();

            data.number = i;
            data.src = `/image_src/test_image120/men_jeans_${(i+1)%30+1}.jpg`;
            data.className = `result-img-`
            
            post.push(data);
        }

        return post;
    }

    return post;
}

function Catbtn({ name, handleSetCat, type, handlePost, handleCurrentPage}) {

    if(type === "Desktop"){
        return (
            <>
                <button
                    className="cat-btn-desktop"
                    onClick={() => { 
                        handleSetCat(name);
                        handlePost(imagesList(name));
                        handleCurrentPage(1);
                }}>
                    {name}
                </button>
            </>
        );
    }else if(type === "Tablet"){
        return (
            <>
                <button
                    className="cat-btn-tablet"
                    onClick={() => { 
                        handleSetCat(name);
                        handlePost(imagesList(name));
                        handleCurrentPage(1);
                }}>
                    {name}
                </button>
            </>
        );
    }else {
        return (
            <>
                <button
                    className="cat-btn-tablet"
                    onClick={() => { 
                        handleSetCat(name);
                        handlePost(imagesList(name));
                        handleCurrentPage(1);
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
            
            if(!isLogined()) {  //로그인 유저가 아닐경우 = jwt token이 없을 경우
                //기능 이용시 이용횟수 + 1
                console.log(1)
                // 비로그인 유저 IP 조회
                axios.get("https://api.ipify.org/?format=json")
                .then((res) => {
                    console.log(2)
                    // db 해당 IP 조회
                    axios.post('http://localhost:8080/issignedin', {
                        visitUserIp : res.data.ip,
                        usedCount : 1,
                    }).then((res) => {
                        console.log(3)
                        if(res.data.result === 2){
                            alert("비로그인으로 이용할 경우 사용 횟수 3회로 제한됩니다. \n");
                        }else if (res.data.result === 999){
                            alert("오늘 사용가능한 횟수를 모두 소진하셨습니다.");
                        }
                    }).catch((e) => {
                        console.error(e)
                    })
                })
            }
        }
    }, []);
    
    useEffect(() => {
        // 이미지 Base64 String 비동기 전송
        if(reUploadImg != null){
            sessionStorage.setItem("uploadedImg", reUploadImg);
            window.location.reload(); // 테스트용
        }
        axios.post('http://localhost:80/test', {
            file : reUploadImg
        })
        .then((res) => {
            
        })
        .catch((e) => {
            console.error(e);
        })
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

    // useState() 렌더링으로는 바로 적용이 안됨
    // useEffect()에서 렌더링 후 바로 업데이트 하기 위한 함수를 설정	
    useEffect(() => {
        setData(categories.filter((v) => v === activeCat));
    }, [activeCat]);
    
    //Pagination 미완성 
    //- 비동기 데이터 받아와서 뿌리는 작업 필요
    //아이템 총 개수 - 설정 필요
    //Desktop과 Tablet & Mobile 한 페이지 출력 개수 구분
    // 카테고리 버튼 누를때마다 해당 카테고리 1페이지 출력되게 구현함

    //Desktop
    const [postDt, setPostDt] = useState([]);
    const [countDt, setCountDt] = useState(0); //아이템 총 개수
    const [currentPageDt, setCurrentPageDt] = useState(1); //현재페이지
    const [postPerPageDt] = useState(20); //페이지당 아이템 개수
    
    const [indexOfLastPostDt, setIndexOfLastPostDt] = useState(0);
    const [indexOfFirstPostDt, setIndexOfFirstPostDt] = useState(0);
    const [currentPostsDt, setCurrentPostsDt] = useState(0);


    useEffect(() => {
        setActiveCat(categories[0]);
        setPostDt(imagesList(categories[0]));
        // btnEffect.current.focus();
    }, []);


    useEffect(() => {
        setCountDt(postDt.length);
        setIndexOfLastPostDt(currentPageDt * postPerPageDt);
        setIndexOfFirstPostDt(indexOfLastPostDt - postPerPageDt);
        setCurrentPostsDt(postDt.slice(indexOfFirstPostDt, indexOfLastPostDt));
    }, [currentPageDt, indexOfFirstPostDt, indexOfLastPostDt, postDt]);

    const setPageDt = (e) => {
        setCurrentPageDt(e);
    }

    //Tablet & Mobile
    const [postTM, setPostTM] = useState([]);
    const [countTM, setCountTM] = useState(0); //아이템 총 개수
    const [currentPageTM, setCurrentPageTM] = useState(1); //현재페이지
    const [postPerPageTM] = useState(20); //페이지당 아이템 개수
    
    const [indexOfLastPostTM, setIndexOfLastPostTM] = useState(0);
    const [indexOfFirstPostTM, setIndexOfFirstPostTM] = useState(0);
    const [currentPostsTM, setCurrentPostsTM] = useState(0);
    
    useEffect(() => {
        setActiveCat(categories[0]);
        setPostTM(imagesList(categories[0]));
    }, []);

    useEffect(() => {
        setCountTM(postTM.length);
        setIndexOfLastPostTM(currentPageTM * postPerPageTM);
        setIndexOfFirstPostTM(indexOfLastPostTM - postPerPageTM);
        setCurrentPostsTM(postTM.slice(indexOfFirstPostTM, indexOfLastPostTM));
    }, [currentPageTM, indexOfFirstPostTM, indexOfLastPostTM, postTM]);

    const setPageTM = (e) => {
        setCurrentPageTM(e);
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
                                    // marginTop:"2.2em"
                                }} />다시 업로드하기
                        </button>
                        <div style={{
                            margin:"3em auto",
                            display:"flex",
                            justifyContent:"center",
                            fontSize: "1.3em",
                            width: "20em",
                            height: "auto",
                            overflow: "hidden",
                            background: "#E8EDED",
                            borderRadius: "1.3em",
                            boxShadow: "-4px 5px 5px 0 rgba(80, 80, 80, 0.698)"
                        }}>
                        <p style={modelSpecTable}>
                            <span style={{
                                color: "#6E6E6E",
                            }}>업로드 이미지 모델 분석 결과</span>
                            <hr style={{height:"0em", border:"2px solid"}}></hr>
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
                    </div>

                    <div className="right-result-desktop">
                        <div className='result-category-desktop'>
                            {categoryArr.map((idx, i) => {
                                if (idx == '치마' || idx == '가방') {
                                    return null;
                                } else {
                                    return (
                                        <>
                                            <Catbtn 
                                                name={idx}
                                                type="Desktop"
                                                handleSetCat={setActiveCat}
                                                handlePost={setPostDt}
                                                handleCurrentPage={setCurrentPageDt}
                                                key={i}
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
                                // fontSize: "1.6em",
                                fontWeight: "bold",
                                textAlign: "center",
                                background: "none",
                                border: "none"
                            }}>
                            </div>
                            {
                                currentPostsDt && postDt.length > 0 ?
                                <div>
                                {currentPostsDt.map((idx, i) => (
                                    <>
                                        <img src={process.env.PUBLIC_URL + idx.src } key={i} className={`${idx.className}desktop`} />
                                    </>
                                    ))
                                }
                                </div> :
                                <div>
                                    <h3>이미지를 분석할 수 없습니다.</h3>
                                    <Link to="/main">다시 찾으러가기</Link>
                                </div>
                            }
                            <Pagination
                                activePage={currentPageDt}
                                itemsCountPerPage={postPerPageDt}
                                totalItemsCount={countDt}
                                pageRangeDisplayed={countDt/20}
                                prevPageText={"Prev"}
                                nextPageText={"Next"}
                                onChange={setPageDt}
                            />
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
                        width: "20em",
                        height: "auto",
                        overflow: "hidden",
                        background: "#E8EDED",
                        borderRadius: "1.3em",
                        boxShadow: "-4px 5px 5px 0 rgba(80, 80, 80, 0.698)"
                    }}>
                        <p style={modelSpecTable}>
                            <span style={{
                                color: "#6E6E6E",
                            }}>업로드 이미지 모델 분석 결과</span>
                            <hr style={{height:"0em", border:"2px solid"}}></hr>
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
                                            <Catbtn 
                                                name={idx}
                                                type="Tablet"
                                                handleSetCat={setActiveCat}
                                                handlePost={setPostTM}
                                                handleCurrentPage={setCurrentPageTM}
                                                key={idx}
                                            />
                                        </>
                                    );
                                }
                            })}
                        </div>
                        <div className='result-list-tablet' style={{ overflow: "hidden" }}>
                            <div style={{
                                margin: "2em 0 0 1em",
                            }}>
                            </div>
                            {
                                currentPostsTM && postTM.length > 0 ?
                                <div>
                                {currentPostsTM.map((idx, i) => (
                                    <>
                                        <img src={process.env.PUBLIC_URL + idx.src } key={i} className={`${idx.className}tablet`} />
                                    </>
                                    ))
                                }
                                </div> :
                                <div>
                                    <h3>이미지를 분석할 수 없습니다.</h3>
                                    <Link to="/main">다시 찾으러가기</Link>
                                </div>
                            }
                            <div>
                            <Pagination
                                activePage={currentPageTM}
                                itemsCountPerPage={postPerPageTM}
                                totalItemsCount={countTM}
                                pageRangeDisplayed={countTM/20}
                                prevPageText={"Prev"}
                                nextPageText={"Next"}
                                onChange={setPageTM}
                                itemClass='page-item'
                                linkClass='page-ling'
                            />
                            </div>
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
                        fontSize: "1.3em",
                        width: "17em",
                        height: "auto",
                        overflow: "hidden",
                        background: "#E8EDED",
                        borderRadius: "1.3em",
                        boxShadow: "-4px 5px 5px 0 rgba(80, 80, 80, 0.698)"
                    }}>
                        <p style={modelSpecTable}>
                        <span style={{
                                color: "#6E6E6E",
                            }}>업로드 이미지 모델 분석 결과</span>
                        <hr style={{height:"0em", border:"2px solid"}}></hr>
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
                        marginLeft: "10%",
                        marginRight: "10%",
                        width: "80%",
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
                                                handlePost={setPostTM}
                                                handleCurrentPage={setCurrentPageTM}
                                                key={idx}
                                            />
                                        </>
                                    );
                                }
                            })}
                        </div>
                        <div className='result-list-tablet' style={{ overflow: "hidden" }}>
                            <div style={{
                                margin: "2em 0 0 1em",
                            }}>
                            </div>
                            {
                                currentPostsTM && postTM.length > 0 ?
                                <div>
                                {currentPostsTM.map((idx, i) => (
                                    <>
                                        <img src={process.env.PUBLIC_URL + idx.src } key={i} className={`${idx.className}mobile`} />
                                    </>
                                    ))
                                }
                                </div> :
                                <div>
                                    <h3>이미지를 분석할 수 없습니다.</h3>
                                    <Link to="/main">다시 찾으러가기</Link>
                                </div>
                            }
                            <Pagination
                                activePage={currentPageTM}
                                itemsCountPerPage={postPerPageTM}
                                totalItemsCount={countTM}
                                pageRangeDisplayed={countTM/20}
                                prevPageText={"‹"}
                                nextPageText={"›"}
                                onChange={setPageTM}
                            />
                        </div>
                    </div>
                </>
            </Mobile>
        </>

    );
}



export default Result;