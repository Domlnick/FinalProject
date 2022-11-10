import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { isLogined } from '../Routes/User/Login';
import Cookies from 'universal-cookie';

const dragActiveStyle = {
    color: "white",
    fontSize: "2em",
    padding: "7.67em 0",
    letterSpacing: "0",
    position: "absolute",
    textAlign: "center",
    width: "79.8%",
    background: "black",
    opacity: "0.7",
    borderRadius: "1.93em",
    zIndex: "9999",
    overflow: 'hidden'
}

const baseStyle = {
    marginTop: '5%',
    marginLeft: '10%',
    width: '80%',
    height: '34em',
    textAlign: 'center',
    border: '3px gray dashed',
    overflow: 'hidden',
    background: '#E8EDED',
    borderRadius: '4.5em'
}

function DragAndDrop() {

    const navigate = useNavigate();
    const goToResult = () => {
        navigate("/result");
    }
    const cookies = new Cookies();

    const onDrop = useCallback(async acceptedFiles => {


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
                                    goToResult();
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
        accept: 'image/png, image/jpeg, image/jpg',
        noClick: true,
        noKeyboard: true
    }, []);

    const style = useMemo(() => ({
        ...baseStyle,
    }), [
        isDragActive, isDragAccept, isDragReject
    ]);

    return (
        <>
            {isDragAccept ?
                <>
                    <div>
                        <div {...getRootProps({ className: 'dropzone', style })} >
                            <input {...getInputProps()} />

                            <div style={dragActiveStyle}>여기에 파일을 놔주세요.</div>
                            <div style={{
                                marginTop: "1.5em",
                                fontSize: "2rem"
                            }}>
                                <img src={process.env.PUBLIC_URL + "/image_src/icon_clothes_mainpage.png"}
                                    style={{ width: "3rem", height: "5.3rem" }} />
                                &nbsp;&nbsp;비슷한 옷을 찾아 드릴게요!
                            </div>

                            <p style={{
                                marginTop: "3%",
                                fontSize: "1.1rem"
                            }}>버튼으로 업로드
                            </p>
                            <button type="button" onClick={open}
                                style={{
                                    marginTop: "-0.8%",
                                    background: "none",
                                    border: "none"
                                }}>
                                <img src={process.env.PUBLIC_URL + "/image_src/images.png"}
                                    style={{
                                        width: "11rem",
                                        background: "none",
                                        borderRadius: "1.25rem",
                                        boxShadow: "-1px 3px 3px 0 rgba(80, 80, 80, 0.698)",
                                    }} />
                            </button>
                            <p style={{ marginTop: "1.3em" }}>또는 여기에 이미지를 드롭해주세요.</p>
                        </div>
                    </div>

                </> :
                <div>
                    <div {...getRootProps({ className: 'dropzone', style })}>
                        <input {...getInputProps()} />

                        <div style={{ display: "none" }}>여기에 파일을 놔주세요.</div>

                        <div style={{
                            marginTop: "1.5em",
                            fontSize: "2rem"
                        }}>
                            <img src={process.env.PUBLIC_URL + "/image_src/icon_clothes_mainpage.png"}
                                style={{ width: "3rem", height: "5.3rem" }} />
                            &nbsp;&nbsp;비슷한 옷을 찾아 드릴게요!
                        </div>
                        <p style={{
                            marginTop: "3%",
                            fontSize: "1.1rem"
                        }}>버튼으로 업로드
                        </p>
                        <button type="button" onClick={open}
                            style={{
                                marginTop: "-0.8%",
                                background: "none",
                                border: "none"
                            }}>
                            <img src={process.env.PUBLIC_URL + "/image_src/images.png"}
                                style={{
                                    width: "11rem",
                                    background: "none",
                                    borderRadius: "1.25rem",
                                    boxShadow: "-1px 3px 3px 0 rgba(80, 80, 80, 0.698)",
                                }} />
                        </button>
                        <p style={{ marginTop: "1.3em" }}>또는 여기에 이미지를 드롭해주세요.</p>
                    </div>
                    <div>

                    </div>
                </div>
            }
        </>
    );
}

export default DragAndDrop;