import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMediaQuery } from 'react-responsive';
import '../css/Paging.css';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import { isLogined } from './User/Login';

const imagesList = (category)  => {
    const post = new Array();
    if (category === "아우터") {
        for(let i =0; i < 100; i++){
            let data = new Object();
            
            data.number = i;
            data.src = JSON.parse(sessionStorage.getItem('outerLink'))
            data.link = JSON.parse(sessionStorage.getItem('outerUrl'))
            data.className = "result-img-"
            
            post.push(data);
        }
        
        return post;
    } else if (category === '드레스') {
        for(let i =0; i < 100; i++){
            let data = new Object();
            
            data.number = i;
            data.src = JSON.parse(sessionStorage.getItem('dressLink'))
            data.link = JSON.parse(sessionStorage.getItem('dressUrl'))
            data.className = "result-img-"
            
            post.push(data);
        }
        
        return post;
    } else if (category === '셔츠류') {
        for(let i =0; i < 100; i++){
            let data = new Object();
            
            data.number = i;
            data.src = JSON.parse(sessionStorage.getItem('topLink'))
            data.link = JSON.parse(sessionStorage.getItem('topUrl'))
            data.className = `result-img-`;
            // console.log(data.src[0] == data.src[20])
            post.push(data);
        }
        
        return post;
    } else if (category === '반팔') {
        for(let i =0; i < 100; i++){
            let data = new Object();
            
            data.number = i;
            data.src = JSON.parse(sessionStorage.getItem('shortsLink'))
            data.link = JSON.parse(sessionStorage.getItem('shortsUrl'))
            data.className = "result-img-"
            post.push(data);
        }

        return post;
    } else if (category === "바지") {
        for(let i =0; i < 100; i++){
            let data = new Object();

            data.number = i;
            data.src = JSON.parse(sessionStorage.getItem('pantsLink'))
            data.link = JSON.parse(sessionStorage.getItem('pantsUrl'))
            data.className = `result-img-`

            post.push(data);
        }

        return post;
    }else if (category === "치마") {
        for(let i =0; i < 100; i++){
            let data = new Object();

            data.number = i;
            data.src = JSON.parse(sessionStorage.getItem('skirtLink'))
            data.link = JSON.parse(sessionStorage.getItem('skirtUrl'))
            data.className = `result-img-`
            
            post.push(data);
        }

        return post;
    }

    return post;
}

function Catbtn({ name, type, handlePost, handleCurrentPage, category, currentPostsDt}) {

    if(type === "Desktop"){
        return (
            <>
                <button
                    className="cat-btn-desktop"
                    onClick={() => { 
                        handlePost(imagesList(category));
                        handleCurrentPage(1);
                        console.log(currentPostsDt)
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
                        handlePost(imagesList(category));
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
                        handlePost(imagesList(category));
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

    const categoryStr = sessionStorage.getItem("category")
    const category = categoryStr.split(',')

    // 이미지 재업로드
    const onDrop = useCallback(acceptedFiles => {
        //이미지 Base64 변환
        const file = acceptedFiles.find(f => f)
        let reader = new FileReader()

        reader.readAsDataURL(file);
        reader.onload = () => {

            sessionStorage.clear();

            if (!isLogined()) {
                // 비로그인 유저 IP 조회
                axios.get("https://api.ipify.org/?format=json")
                    .then((res) => {
                        // db 해당 IP 조회
                        axios.post('http://ec2-13-209-48-179.ap-northeast-2.compute.amazonaws.com:8080/issignedin', {
                            visitUserIp: res.data.ip,
                            usedCount: 1,
                        }).then((res) => {
                            if (res.data.result < 3) {
                                if(res.data.result == 1){
                                    alert(`저희 서비스는 비로그인으로 이용 시 하루 3회로 제한됩니다😭 \n 오늘 남은 횟수 : ${3-res.data.result-1} 번`);
                                }
                                sessionStorage.setItem("uploadedImg", reader.result);
                                axios.post('http://ec2-3-34-217-228.ap-northeast-2.compute.amazonaws.com:5000/upload', {
                                    file: reader.result
                                }).then((res) => {
                                    const category = new Array();
                                    if(JSON.stringify(res.data.top.outer) != null){
                                        if(JSON.stringify(res.data.top.outer.result_img_link_top) != null){
                                            sessionStorage.setItem("outerUrl", JSON.stringify(res.data.top.outer.result_img_link_top))
                                            sessionStorage.setItem("outerLink", JSON.stringify(res.data.top.outer.result_img_path_top))
                                            sessionStorage.setItem("outerScore", JSON.stringify(res.data.top.outer.result_img_score_top))
                                            category.push("아우터")
                                        }
                                    }
                                    if(JSON.stringify(res.data.top.dress) != null){
                                        if(JSON.stringify(res.data.top.dress.result_img_link_top) != null){
                                            sessionStorage.setItem("dressUrl", JSON.stringify(res.data.top.dress.result_img_link_top))
                                            sessionStorage.setItem("dressLink", JSON.stringify(res.data.top.dress.result_img_path_top))
                                            sessionStorage.setItem("dressScore", JSON.stringify(res.data.top.dress.result_img_score_top))
                                            category.push("드레스")
                                        }
                                    }
                                    if(JSON.stringify(res.data.top.top) != null){
                                        if(JSON.stringify(res.data.top.top.result_img_link_top) != null){
                                            sessionStorage.setItem("topUrl", JSON.stringify(res.data.top.top.result_img_link_top))
                                            sessionStorage.setItem("topLink", JSON.stringify(res.data.top.top.result_img_path_top))
                                            sessionStorage.setItem("topScore", JSON.stringify(res.data.top.top.result_img_score_top))
                                            category.push("셔츠류")
                                        }
                                    }
                                    if(JSON.stringify(res.data.top.shorts) != null){
                                        if(JSON.stringify(res.data.top.shorts.result_img_link_top) != null){
                                            sessionStorage.setItem("shortsUrl", JSON.stringify(res.data.top.shorts.result_img_link_top))
                                            sessionStorage.setItem("shortsLink", JSON.stringify(res.data.top.shorts.result_img_path_top))
                                            sessionStorage.setItem("shortsScore", JSON.stringify(res.data.top.shorts.result_img_score_top))
                                            category.push("반팔")
                                        }
                                    }
                                    if(JSON.stringify(res.data.bottom.pants) != null){
                                        if(JSON.stringify(res.data.bottom.pants.result_img_link_top) != null){
                                            sessionStorage.setItem("pantsUrl", JSON.stringify(res.data.bottom.pants.result_img_link_top))
                                            sessionStorage.setItem("pantsLink", JSON.stringify(res.data.bottom.pants.result_img_path_top))
                                            sessionStorage.setItem("pantsScore", JSON.stringify(res.data.bottom.pants.result_img_score_top))
                                            category.push("바지")
                                        }
                                    }
                                    if(JSON.stringify(res.data.bottom.skirts) != null){
                                        if(JSON.stringify(res.data.bottom.skirts.result_img_link_top) != null){
                                            sessionStorage.setItem("skirtsUrl", JSON.stringify(res.data.bottom.skirts.result_img_link_top))
                                            sessionStorage.setItem("skirtsLink", JSON.stringify(res.data.bottom.skirts.result_img_path_top))
                                            sessionStorage.setItem("skirtsScore", JSON.stringify(res.data.bottom.skirts.result_img_score_top))
                                            category.push("치마")
                                        }
                                    }
                                    sessionStorage.setItem("category", category)
                                    window.location.reload();
                                }).catch((e) => {
                                    console.error(e);
                                })
                            } else if (res.data.result === 999) {
                                alert(`오늘 사용가능한 횟수를 모두 소진하셨습니다.\n회원가입 시 무제한으로 이용 가능합니다.🎉🎉`);
                            }
                    }).catch((e) => {
                        console.error(e)
                    })
                })
            }
        }
    }, []);

    const { open } = useDropzone({
        onDrop,
        noClick: true,
        noKeyboard: true,
        multiple: false,
        accept  : 'image/png, image/jpeg, image/jpg',
    });

    //Desktop - pagination
    const [postDt, setPostDt] = useState([]);
    const [countDt, setCountDt] = useState(0); //아이템 총 개수
    const [currentPageDt, setCurrentPageDt] = useState(1); //현재페이지
    const [postPerPageDt] = useState(20); //페이지당 아이템 개수
    
    const [indexOfLastPostDt, setIndexOfLastPostDt] = useState(0);
    const [indexOfFirstPostDt, setIndexOfFirstPostDt] = useState(0);
    const [currentPostsDt, setCurrentPostsDt] = useState(0);


    useEffect(() => {
        setPostDt(imagesList(category[0]));
        setPostTM(imagesList(category[0]));
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

    //Tablet & Mobile - pagination
    const [postTM, setPostTM] = useState([]);
    const [countTM, setCountTM] = useState(0); //아이템 총 개수
    const [currentPageTM, setCurrentPageTM] = useState(1); //현재페이지
    const [postPerPageTM] = useState(20); //페이지당 아이템 개수
    
    const [indexOfLastPostTM, setIndexOfLastPostTM] = useState(0);
    const [indexOfFirstPostTM, setIndexOfFirstPostTM] = useState(0);
    const [currentPostsTM, setCurrentPostsTM] = useState(0);

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
                                style={{width: "4.2em"}} />다시 업로드하기
                        </button>
                        
                    </div>

                    <div className="right-result-desktop">
                        <div className='result-category-desktop'>
                            {category.map((idx, i) => { {
                                return (
                                    <>
                                        <Catbtn 
                                            name={idx}
                                            type="Desktop"
                                            currentPostsDt = {currentPostsDt}
                                            handlePost={setPostDt}
                                            category={category[i]}
                                            handleCurrentPage={setCurrentPageDt}
                                            key={i}
                                        />
                                    </>
                                );}
                            })}
                        </div>
                        <div className='result-list-desktop' style={{ overflow: "hidden" }}>
                            <div style={{
                                margin: "2.2em 0 0 1em",
                                height: "2em",
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
                                        <img src={idx.src[i] } key={i} className={`${idx.className}desktop`} />
                                    </>
                                    ))
                                }
                                </div> :
                                <div>
                                    <h1>이미지를 분석할 수 없습니다.😢</h1>
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
                        marginLeft: "7.5%",
                        marginRight: "7.5%",
                        width: "85%",
                        marginTop: "3em",
                        background: "#E8EDED",
                        borderRadius: "1.8em"
                    }}>
                        <div className='result-category-tablet'>
                            {category.map((idx, i) => {
                                if (idx === '치마' || idx === '가방') {
                                    return null;
                                } else {
                                    return (
                                        <>
                                            <Catbtn 
                                                name={idx}
                                                type="Tablet"
                                                currentPostsDt = {currentPostsTM}
                                                handlePost={setPostTM}
                                                category={category[i]}
                                                handleCurrentPage={setCurrentPageTM}
                                                key={i}
                                            />
                                        </>
                                    );
                                }
                            })}
                        </div>
                        <div className='result-list-tablet' style={{ overflow: "hidden" }}>
                            <div style={{margin: "2em 0 0 1em"}}>
                            </div>
                            {
                                currentPostsTM && postTM.length > 0 ?
                                <div>
                                {currentPostsTM.map((idx, i) => (
                                    <>
                                        <img src={idx.src[i] } key={i} className={`${idx.className}tablet`} />
                                    </>
                                    ))
                                }
                                </div> :
                                <div>
                                    <h1>이미지를 분석할 수 없습니다.😢</h1>
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
                            style={{width: "5.7em"}} />
                    </button>

                    <div style={{
                        marginLeft: "10%",
                        marginRight: "10%",
                        width: "80%",
                        marginTop: "3em",
                        background: "#E8EDED",
                        borderRadius: "1.8em"
                    }}>
                        <div className='result-category-mobile'>
                            {category.map((idx, i) => {
                                if (idx === '치마' || idx === '가방') {
                                    return null;
                                } else {
                                    return (
                                        <>
                                            <Catbtn 
                                                name={idx}
                                                type="Mobile"
                                                currentPostsDt = {currentPostsTM}
                                                handlePost={setPostTM}
                                                category={category[i]}
                                                handleCurrentPage={setCurrentPageTM}
                                                key={i}
                                            />
                                        </>
                                    );
                                }
                            })}
                        </div>
                        <div className='result-list-tablet' style={{ overflow: "hidden" }}>
                            <div style={{margin: "2em 0 0 1em"}}>
                            </div>
                            {
                                currentPostsTM && postTM.length > 0 ?
                                <div>
                                {currentPostsTM.map((idx, i) => (
                                    <>
                                        <img src={idx.src[i] } key={i} className={`${idx.className}mobile`} />
                                    </>
                                    ))
                                }
                                </div> :
                                <div>
                                    <h1>이미지를 분석할 수 없습니다.😢</h1>
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