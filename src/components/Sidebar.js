import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import axios from "axios"
import Content from './Content';

let defaultURL="https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=f06828f52ece9c68db430db8fb2584d9&svcType=api&svcCode=SCHOOL&contentType=json&gubun=univ_list";
let regionURL="";
let sch1URL="";
let sch2NURL="";
let sch2JURL="";
let estTypeURL="";
let page=1;
let regionValue="";
let estTypeValue="";
let sch2Value="";
let totalData;
export default function Sidebar() {
    function deslect(){
        
        var sch2ForNormal=document.getElementsByName("sch2ForNormal");
        for(var i=0;i<sch2ForNormal.length;i++){
            if(sch2ForNormal[i].getAttribute('type')==='radio'){
                sch2ForNormal[i].checked = false;
            }
        }
        var sch2ForJunior=document.getElementsByName("sch2ForJunior");
        for(var i=0;i<sch2ForJunior.length;i++){
            if(sch2ForJunior[i].getAttribute('type')==='radio'){
                sch2ForJunior[i].checked = false;
            }
        }
        var region=document.getElementsByName("region");
        for(var i=0;i<region.length;i++){
            if(region[i].getAttribute('type')==='radio'){
                region[i].checked = false;
            }
        }
        var estType=document.getElementsByName("estType");
        for(var i=0;i<estType.length;i++){
            if(estType[i].getAttribute('type')==='radio'){
                estType[i].checked = false;
            }
        }
        sch2NURL="";
        sch2JURL="";
        estTypeURL="";
        regionURL="";
        regionValue="";
        estTypeValue="";
        sch2Value="";
    }
    const getRegion =()=>{
        let regionList = document.getElementsByName("region");
        
        regionList.forEach((node)=>{
            if(node.checked){
                regionValue=node.value;
            }
        })
        let regionCode;
        if(regionValue=="서울특별시"){
            regionCode="100260";
        }
        else if(regionValue==="부산광역시"){
            regionCode="100267";
        }
        else if(regionValue==="인천광역시"){
            regionCode="100269";
        }
        else if(regionValue==="대전광역시"){
            regionCode="100271";
        }
        else if(regionValue==="대구광역시"){
            regionCode="100272";
        }
        else if(regionValue==="울산광역시"){
            regionCode="100273";
        }
        else if(regionValue==="광주광역시"){
            regionCode="100275";
        }
        else if(regionValue==="경기도"){
            regionCode="100276";
        }
        else if(regionValue==="강원도"){
            regionCode="100278";
        }
        else if(regionValue==="충청북도"){
            regionCode="100280";
        }
        else if(regionValue==="충청남도"){
            regionCode="100281";
        }
        else if(regionValue==="전라북도"){
            regionCode="100282";
        }
        else if(regionValue==="전라남도"){
            regionCode="100283";
        }
        else if(regionValue==="경상북도"){
            regionCode="100285";
        }
        else if(regionValue==="경상남도"){
            regionCode="100291";
        }
        else if(regionValue==="제주도"){
            regionCode="100292";
        }
        console.log(regionCode);
        regionCode="&region="+regionCode;
        regionURL=regionCode;
    }

    const getSch1=()=>{
        let sch1List = document.getElementsByName("sch1");
        let sch1Value;
        sch1List.forEach((node)=>{
            if(node.checked){
                sch1Value=node.value;
            }
        })
        let sch1Code;
        if(sch1Value==="일반대학"){
            sch1Code="100323";
            let modal =document.getElementById("modal_btn");
            modal.setAttribute("data-bs-target","#filterModalNormal");
        }
        else if(sch1Value==="전문대학"){
            sch1Code="100322"
            let modal =document.getElementById("modal_btn");
            modal.setAttribute("data-bs-target","#filterModalJunior")
        }
        sch1Code="&sch1="+sch1Code;
        console.log(sch1Code);
        sch1URL=sch1Code;
        ConfirmURL();
    }

    const getSch2ForNormal=()=>{
        let sch2List = document.getElementsByName("sch2ForNormal");
        
        sch2List.forEach((node)=>{
            if(node.checked){
                sch2Value=node.value;
            }
        })
        let sch2Code;
        if(sch2Value==="일반대학"){
            sch2Code="100328"
        }
        else if(sch2Value==="교육대학"){
            sch2Code="100329"
        }
        else if(sch2Value==="산업대학"){
            sch2Code="100330"
        }
        else if(sch2Value==="사이버대학(4년제)"){
            sch2Code="100331"
        }
        else if(sch2Value==="각종대학(대학)"){
            sch2Code="100332"
        }
        sch2Code="&sch2="+sch2Code;
        sch2NURL=sch2Code;
        console.log(sch2Code);
    }

    const getSch2ForJunior=()=>{
        let sch2List = document.getElementsByName("sch2ForJunior");
        sch2List.forEach((node)=>{
            if(node.checked){
                sch2Value=node.value;
            }
        })
        let sch2Code;
        if(sch2Value==="전문대학"){
            sch2Code="100324"
        }
        else if(sch2Value==="기능대학"){
            sch2Code="100325"
        }
        else if(sch2Value==="사이버대학(2년제)"){
            sch2Code="100326"
        }
        else if(sch2Value==="각종대학(전문)"){
            sch2Code="100327"
        }
        sch2Code="&sch2="+sch2Code;
        sch2JURL=sch2Code;
        console.log(sch2Code);
    }

    const getEstType=()=>{
        let estTypeList = document.getElementsByName("estType");
        
        estTypeList.forEach((node)=>{
            if(node.checked){
                estTypeValue=node.value;
            }
        })
        let estTypeCode;
        if(estTypeValue==="국립"){
            estTypeCode="100334"
        }
        else if(estTypeValue==="사립"){
            estTypeCode="100335"
        }
        else if(estTypeValue==="공립"){
            estTypeCode="100336"
        }
        estTypeCode="&estType="+estTypeCode;
        estTypeURL=estTypeCode;
        console.log(estTypeCode);
    }
    
    let defaultList=[{
        campusName:"",
        collegeinfourl:"",
        schoolType:"",
        link:"",
        schoolGubun:"",
        adres:"",
        schoolName:"",
        region:"",
        totalCount:"",
        estType:"",
        seq:"",
      }]
      const [univList, setUnivList] = useState(defaultList);
      useEffect(() => {
        ConfirmURL();
    }, []);
    const ConfirmURL = async()=>{
        let mainURL=defaultURL+regionURL+sch1URL+sch2NURL+sch2JURL+estTypeURL+"&perPage=500";
          
            
            // axios.get(mainURL)
            // .then((response)=>{
            //     console.log(response.datSearch.content.data);
            //     setUnivList(response.datSearch.content.data);
            // })
            // .catch((error)=>{
            //   console.log(error);
            // })
            try {
                // 데이터를 가져올 URL
                const response = await axios.get(mainURL);
                
                // dataSearch와 content에 접근
                const dataSearch = response.data?.dataSearch || {};
                const content = dataSearch.content || [];
            
                // content 데이터를 출력
                //console.log(content);
            
                // 예시: 모든 학교 이름 출력
                setUnivList(content);
              } catch (error) {
                console.error('Error fetching data:', error);
              }
              PageData();
              newArrayData2();
              console.log(page);

    }
    useEffect(() => {
        if (univList && univList.length > 0 && univList[0].schoolName) {
            newArrayData2();
        }
        else{
            setTempData([<tr key="no-data"><td colSpan="3">No Data Available</td></tr>]);
        }
    }, [univList]);
    if (!univList || univList.length === 0 || !univList[0].schoolName) {
        totalData = 0;
    }
    else{
        totalData = univList[0].totalCount;
    }
    
    const pageCount = totalData/20;
    const arr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    const PageData = () => {
        const pageArr = [];
        const totalPages = Math.ceil(totalData / 20); // 페이지 계산
        for (let i = 0; i < totalPages; i++) {
            pageArr.push(
                <li key={i} className="page-item" onClick={() => PageNumber(i + 1)}>
                    <a className="page-link" href="#">
                        {i + 1}
                    </a>
                </li>
            );
        }
        
        return pageArr;
    };
    
    function PageNumber(num) {
        page=num; // 페이지 상태 업데이트
        newArrayData2(); // 데이터 업데이트
    }
    const [tempData, setTempData] = useState([]);
    
    const newArrayData2 = () => {
        const updatedData = [];
        if (!univList || univList.length === 0 || !univList[0].schoolName||totalData===0) {
            setTempData([<tr key="no-data"><td colSpan="3">No Data Available</td></tr>]);
            return;
        }
        for (let i = (page - 1) * 20; i < Math.min((page - 1) * 20 + 20, univList.length); i++) {
            updatedData.push(
                <tr key={i}>
                    <td>{univList[i].schoolName}</td>
                    <td>{univList[i].region}</td>
                    <td>{univList[i].estType}</td>
                </tr>
            );
        }
        setTempData(updatedData);
        console.log(univList[0])// 상태 업데이트
    };
    // useEffect(()=>{
    //     newArrayData2();
    // },[]);
    // const newArrayData = univList.map((item) => {
    //     return(
    //       <tr>
    //         <td>{item.schoolName}</td>
    //         <td>{item.region}</td>
    //         <td>{item.estType}</td>
    //       </tr>
    //     );
    //   });
  return (
    <MainContainer class="container">
        <Container>
            
            <MainBtn>
                <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" class="btn-check" value="일반대학" name="sch1" id="btnradio1" onChange={getSch1}  autocomplete="off"/>
                    <label class="btn btn-outline-success" for="btnradio1">일반대학</label>

                    <input type="radio" class="btn-check" value="전문대학" name="sch1" id="btnradio2" onChange={getSch1} autocomplete="off"/>
                    <label class="btn btn-outline-success" for="btnradio2">전문대학</label>
                </div>
            </MainBtn>

            <Input>
                <input type="text" placeholder='대학명을 입력해주세요:)'></input>
                <button><img src='./searchIcon.png'></img></button>
            </Input>
            <Filter>
                <div id='moveFilter'>
                    <span>적용필터</span>
                    <button id="modal_btn" data-bs-toggle="modal" data-bs-target="#filterModalNormal"><img src='./filterIcon2.png'></img></button>
                </div>

                <div id="condition"> {sch2Value} &nbsp;&nbsp;  {estTypeValue} &nbsp;&nbsp;  {regionValue} </div>
            </Filter>
            <BookMarkBtn>
                관심 대학 찾기
            </BookMarkBtn>
            <ResetBtn>
                검색 조건 초기화
            </ResetBtn>
            
        </Container>
        <TableContainer>
            <label>총 <span>{totalData}</span>건</label>
            <table class="table" style={{textAlign:"center"}} center>
                <thead>
                    <tr>
                        <th scope="col">학교 이름</th>
                        <th scope="col">지역</th>
                        <th scope="col">설립유형</th>
                    </tr>
                </thead>
                <tbody>
                    {tempData}
                </tbody>
            </table>
            <PagingContainer>
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                
                        {PageData()}
                    </ul>
                </nav>
            </PagingContainer>
            
            
        </TableContainer>
        <div class="modal fade modal-lg" id="filterModalNormal" tabindex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-body" id="createModalBody">
                            <table class="table" style={{verticalAlign: "middle"}}>
                                <tbody class="table-group-divider">
                                    <tr> 
                                        <th scope="row" class="table-secondary">학교유형</th>
                                        <td>
                                            <input class="form-check-input" type="radio" name="sch2ForNormal" value="각종대학(대학)" onChange={getSch2ForNormal} id="sch2ForNormal1"/>
                                            <label class="form-check-label" for="sch2ForNormal1">각종대학</label>
                                        </td>
                                        <td>
                                            
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="sch2ForNormal" value="교육대학" onChange={getSch2ForNormal} id="sch2ForNormal2"/>
                                            <label class="form-check-label" for="sch2ForNormal2">교육대학</label>    
                                        </div>
                                        </td>
                                        <td>
                                            <input class="form-check-input" type="radio" name="sch2ForNormal" value="일반대학" onChange={getSch2ForNormal} id="sch2ForNormal3"/>
                                            <label class="form-check-label" for="sch2ForNormal3">대학교</label>
                                        </td>
                                        <td>
                                            <input class="form-check-input" type="radio" name="sch2ForNormal" value="사이버대학(4년제)" onChange={getSch2ForNormal} id="sch2ForNormal4"/>
                                            <label class="form-check-label" for="sch2ForNormal4">사이버대학</label>
                                        </td>
                                        <td>
                                            <input class="form-check-input" type="radio" name="sch2ForNormal" value="산업대학" onChange={getSch2ForNormal} id="sch2ForNormal5"/>
                                            <label class="form-check-label" for="sch2ForNormal5">산업대학</label>
                                        </td>
                                        
                                        
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" class="table-secondary">설립유형</th>
                                        <td>
                                            <input class="form-check-input" type="radio" name="estType" value="국립" onChange={getEstType} id="estType1"/>
                                            <label class="form-check-label" for="estType1">국립</label>
                                        </td>
                                        <td>
                                            <input class="form-check-input" type="radio" name="estType" value="공립" onChange={getEstType} id="estType2"/>
                                            <label class="form-check-label" for="estType2">공립</label>
                                        </td>
                                        <td>
                                            <input class="form-check-input" type="radio" name="estType" value="사립"  onChange={getEstType} id="estType3"/>
                                            <label class="form-check-label" for="estType3">사립</label>
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>

                                    <tr>
                                        <th scope="row" rowSpan={3} class="table-secondary">지역</th>
                                
                                        <td>
                                            <input class="form-check-input" type="radio" name="region" value="강원도" onChange={getRegion} id="region1"/>
                                            <label class="form-check-label" for="region1">강원</label>
                                        </td>
                                        <td>
                                            <input class="form-check-input" type="radio" name="region" value="경기도" onChange={getRegion} id="region2"/>
                                            <label class="form-check-label" for="region2">경기</label>
                                        </td>
                                        <td>
                                            <input class="form-check-input" type="radio" name="region" value="경상남도"  onChange={getRegion} id="region3"/>
                                            <label class="form-check-label" for="region3">경남</label>
                                        </td>
                                        <td>
                                            <input class="form-check-input" type="radio" name="region" value="경상북도" onChange={getRegion} id="region4"/>
                                            <label class="form-check-label" for="region4">경북</label>
                                        </td>
                                        <td>
                                            <input class="form-check-input" type="radio" name="region" value="광주광역시" onChange={getRegion} id="region5"/>
                                            <label class="form-check-label" for="region5">광주</label>
                                        </td>
                                        <td>
                                            <input class="form-check-input" type="radio" name="region" value="대구광역시" onChange={getRegion} id="region6"/>
                                            <label class="form-check-label" for="region6">대구</label>
                                        </td>  
                                    </tr>
                                    <tr>
                                        <td>
                                            <input class="form-check-input" type="radio" name="region" value="대전광역시" onChange={getRegion} id="region7"/>
                                            <label class="form-check-label" for="region7">대전</label>
                                        </td>
                                    <td>
                                        <input class="form-check-input" type="radio" name="region" value="부산광역시" onChange={getRegion} id="region8"/>
                                        <label class="form-check-label" for="region8">부산</label>
                                    </td>
                                    <td>
                                        <input class="form-check-input" type="radio" name="region" value="서울특별시" onChange={getRegion} id="region9"/>
                                        <label class="form-check-label" for="region9">서울</label>
                                    </td>
                                    
                                    <td>
                                        <input class="form-check-input" type="radio" name="region" value="울산광역시" onChange={getRegion} id="region11"/>
                                        <label class="form-check-label" for="region11">울산</label>
                                    </td>
                                    <td>
                                        <input class="form-check-input" type="radio" name="region" value="인천광역시" onChange={getRegion} id="region12"/>
                                        <label class="form-check-label" for="region12">인천</label>
                                    </td>
                                    <td>
                                        <input class="form-check-input" type="radio" name="region" value="전라남도" onChange={getRegion} id="region13"/>
                                        <label class="form-check-label" for="region13">전남</label>
                                    </td>
                                </tr>
                                <tr>
                                    
                                    <td>
                                        <input class="form-check-input" type="radio" name="region" value="전라북도" onChange={getRegion} id="region14"/>
                                        <label class="form-check-label" for="region14">전북</label>
                                    </td>
                                    <td>
                                        <input class="form-check-input" type="radio" name="region" value="제주도" onChange={getRegion} id="region15"/>
                                        <label class="form-check-label" for="region15">제주</label>
                                    </td>
                                    <td>
                                        <input class="form-check-input" type="radio" name="region" value="충청남도" onChange={getRegion} id="region16"/>
                                        <label class="form-check-label" for="region16">충남</label>
                                    </td>
                                    <td>
                                        <input class="form-check-input" type="radio" name="region" value="충청북도" onChange={getRegion} id="region17"/>
                                        <label class="form-check-label" for="region17">충북</label>
                                    </td>
                                    <td></td>
                                    <td></td>
                                </tr>   
                            
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer justify-content-center" >
                        <button type="button" class="btn btn-outline-success" onClick={deslect}>초기화</button>
                        <button type="button" class="btn btn-success" data-bs-dismiss="modal" onClick={ConfirmURL}>적용</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade modal-lg" id="filterModalJunior" tabindex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-body" id="createModalBody">
                            <table class="table" style={{verticalAlign: "middle"}}>
                                <tbody class="table-group-divider">
                                    <tr> 
                                        <th scope="row" class="table-secondary">학교유형</th>
                                        <td>
                                            <input class="form-check-input" type="radio" name="sch2ForJunior" value="각종대학(전문)" onChange={getSch2ForJunior} id="sch2ForJunior1"/>
                                            <label class="form-check-label" for="sch2ForJunior1">각종대학</label>
                                        </td>
                                        <td>
                                            
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="sch2ForJunior" value="기능대학" onChange={getSch2ForJunior} id="sch2ForJunior2"/>
                                            <label class="form-check-label" for="sch2ForJunior2">기능대학</label>    
                                        </div>
                                        </td>
                                        <td>
                                            <input class="form-check-input" type="radio" name="sch2ForJunior" value="사이버대학(2년제)" onChange={getSch2ForJunior} id="sch2ForJunior3"/>
                                            <label class="form-check-label" for="sch2ForJunior3">사이버대학</label>
                                        </td>
                                        <td>
                                            <input class="form-check-input" type="radio" name="sch2ForJunior" value="전문대학" onChange={getSch2ForJunior} id="sch2ForJunior4"/>
                                            <label class="form-check-label" for="sch2ForJunior4">전문대학</label>
                                        </td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" class="table-secondary">설립유형</th>
                                        <td>
                                            <input class="form-check-input" type="radio" name="estType" value="국립" onChange={getEstType} id="estType1"/>
                                            <label class="form-check-label" for="estType1">국립</label>
                                        </td>
                                        <td>
                                            <input class="form-check-input" type="radio" name="estType" value="공립" onChange={getEstType} id="estType2"/>
                                            <label class="form-check-label" for="estType2">공립</label>
                                        </td>
                                        <td>
                                            <input class="form-check-input" type="radio" name="estType" value="사립"  onChange={getEstType} id="estType3"/>
                                            <label class="form-check-label" for="estType3">사립</label>
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>

                                    <tr>
                                        <th scope="row" rowSpan={3} class="table-secondary">지역</th>
                                
                                        <td>
                                            <input class="form-check-input" type="radio" name="region" value="강원도" onChange={getRegion} id="region1"/>
                                            <label class="form-check-label" for="region1">강원</label>
                                        </td>
                                        <td>
                                            <input class="form-check-input" type="radio" name="region" value="경기도" onChange={getRegion} id="region2"/>
                                            <label class="form-check-label" for="region2">경기</label>
                                        </td>
                                        <td>
                                            <input class="form-check-input" type="radio" name="region" value="경상남도"  onChange={getRegion} id="region3"/>
                                            <label class="form-check-label" for="region3">경남</label>
                                        </td>
                                        <td>
                                            <input class="form-check-input" type="radio" name="region" value="경상북도" onChange={getRegion} id="region4"/>
                                            <label class="form-check-label" for="region4">경북</label>
                                        </td>
                                        <td>
                                            <input class="form-check-input" type="radio" name="region" value="광주광역시" onChange={getRegion} id="region5"/>
                                            <label class="form-check-label" for="region5">광주</label>
                                        </td>
                                        <td>
                                            <input class="form-check-input" type="radio" name="region" value="대구광역시" onChange={getRegion} id="region6"/>
                                            <label class="form-check-label" for="region6">대구</label>
                                        </td>  
                                    </tr>
                                    <tr>
                                        <td>
                                            <input class="form-check-input" type="radio" name="region" value="대전광역시" onChange={getRegion} id="region7"/>
                                            <label class="form-check-label" for="region7">대전</label>
                                        </td>
                                    <td>
                                        <input class="form-check-input" type="radio" name="region" value="부산광역시" onChange={getRegion} id="region8"/>
                                        <label class="form-check-label" for="region8">부산</label>
                                    </td>
                                    <td>
                                        <input class="form-check-input" type="radio" name="region" value="서울특별시" onChange={getRegion} id="region9"/>
                                        <label class="form-check-label" for="region9">서울</label>
                                    </td>
                                    
                                    <td>
                                        <input class="form-check-input" type="radio" name="region" value="울산광역시" onChange={getRegion} id="region11"/>
                                        <label class="form-check-label" for="region11">울산</label>
                                    </td>
                                    <td>
                                        <input class="form-check-input" type="radio" name="region" value="인천광역시" onChange={getRegion} id="region12"/>
                                        <label class="form-check-label" for="region12">인천</label>
                                    </td>
                                    <td>
                                        <input class="form-check-input" type="radio" name="region" value="전라남도" onChange={getRegion} id="region13"/>
                                        <label class="form-check-label" for="region13">전남</label>
                                    </td>
                                </tr>
                                <tr>
                                    
                                    <td>
                                        <input class="form-check-input" type="radio" name="region" value="전라북도" onChange={getRegion} id="region14"/>
                                        <label class="form-check-label" for="region14">전북</label>
                                    </td>
                                    <td>
                                        <input class="form-check-input" type="radio" name="region" value="제주도" onChange={getRegion} id="region15"/>
                                        <label class="form-check-label" for="region15">제주</label>
                                    </td>
                                    <td>
                                        <input class="form-check-input" type="radio" name="region" value="충청남도" onChange={getRegion} id="region16"/>
                                        <label class="form-check-label" for="region16">충남</label>
                                    </td>
                                    <td>
                                        <input class="form-check-input" type="radio" name="region" value="충청북도" onChange={getRegion} id="region17"/>
                                        <label class="form-check-label" for="region17">충북</label>
                                    </td>
                                    <td></td>
                                    <td></td>
                                </tr>   
                            
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer justify-content-center" >
                        <button type="button" class="btn btn-outline-success" onClick={deslect} >초기화</button>
                        <button type="button" class="btn btn-success" data-bs-dismiss="modal" onClick={ConfirmURL}>적용</button>
                    </div>
                </div>
            </div>
        </div>
    </MainContainer>
    
  )
}
const MainContainer = styled.div`
    position:absolute;
`
const PagingContainer = styled.div`
    display: flex;
        align-items: center;
        justify-content: center;
`
const TableContainer = styled.div`
    position:static;
    right:0px;
    float:right;
    width: 1200px;

    label{
    font-size:28px;
    font-weight:700;
    }
    span{
    color:#41AB66;
    }
    
`
const Container = styled.div`
    float:left;
    width: 346px;
    
    margin: 55px 50px;
`
const MainBtn = styled.div`
    margin-bottom: 30px;
    div{
        width: 346px;
        height: 68px;
        position: relative;
    }
    label{
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
    }
`

const Input = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 346px;
    height: 68px;
    margin-bottom: 30px;

    input{
        width: 278px;
        height: 68px;
        border-radius: 20px;
        background: #D9D9D9;
    }
    button{
        width: 68px;
        height: 68px;
        border-radius: 20px;
        background: #000;
    }
`

const Filter = styled.div`
    width: 346px;
    height: 110px;
    border-radius: 20px;
    border: 2px solid #41AB66;
    background: #FFF;
    margin-bottom: 30px;
    span{
        font-size: 24px;
        font-weight: 700;
    }
    button{
        width: 34px;
        height: 34px;
        border: none;
        background: #FFF;
    }
    #moveFilter{
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-bottom: solid 2px #000;
        margin: 0 10px;
        padding: 10px 10px;
    }
    #condition{
        margin: 0 10px;
        padding: 10px 10px;
    }
    
`
const BookMarkBtn = styled.button`
    margin-bottom: 30px;
    border-radius: 20px;
    border: 2px solid #41AB66;
    background: #FFF;
    width: 346px;
    height: 68px;
    font-size: 24px;
    color: #41AB66;
`
const ResetBtn = styled.button`
    margin-bottom: 30px;
    border-radius: 20px;
    border: 2px solid #41AB66;
    background: #FFF;
    width: 346px;
    height: 68px;
    font-size: 24px;
    color: #41AB66;
`


