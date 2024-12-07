import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from "axios"
import styled from 'styled-components';
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'

let page=1;
let sch1Value="";
let estTypeValue="";
let sch2Value="";
let totalData;
export default function Bookmark() {
  function toggleFavorite() {
        
  }
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
      var estType=document.getElementsByName("estType");
      for(var i=0;i<estType.length;i++){
          if(estType[i].getAttribute('type')==='radio'){
              estType[i].checked = false;
          }
      }
      
      estTypeValue="";
      sch2Value="";
  }
  function deslectAll(){
      deslect();
      var sch1=document.getElementsByName("sch1");
      for(var i=0;i<sch1.length;i++){
          if(sch1[i].getAttribute('type')==='radio'){
              sch1[i].checked = false;
          }
      }
      sch1Value="";
      setData();
      ConfirmURL();
  }
  

  const getSch1=()=>{
      let sch1List = document.getElementsByName("sch1");
      sch1List.forEach((node)=>{
          if(node.checked){
              sch1Value=node.value;
          }
      })
      if(sch1Value==="일반대학"){
          sch1Value="대학(4년제)";
          let modal =document.getElementById("modal_btn");
          modal.setAttribute("data-bs-target","#filterModalNormal");
      }
      else if(sch1Value==="전문대학"){
          let modal =document.getElementById("modal_btn");
          modal.setAttribute("data-bs-target","#filterModalJunior")
      }
      console.log(sch1Value);
      filterEnter();
  }

  const getSch2ForNormal=()=>{
      let sch2List = document.getElementsByName("sch2ForNormal");
      
      sch2List.forEach((node)=>{
          if(node.checked){
              sch2Value=node.value;
          }
      })
      
      if(sch2Value==="일반대학"){
          sch2Value="대학교";
      }
      else if(sch2Value==="교육대학"){
          
      }
      else if(sch2Value==="산업대학"){
          
      }
      else if(sch2Value==="사이버대학(4년제)"){
          sch2Value="사이버대학(대학)";
      }
      else if(sch2Value==="각종대학(대학)"){
          
      }
      
  }

  const getSch2ForJunior=()=>{
      let sch2List = document.getElementsByName("sch2ForJunior");
      sch2List.forEach((node)=>{
          if(node.checked){
              sch2Value=node.value;
          }
      })
      
      if(sch2Value==="전문대학"){
          
      }
      else if(sch2Value==="기능대학"){
          
      }
      else if(sch2Value==="사이버대학(2년제)"){
          sch2Value="사이버대학(대학)"
      }
      else if(sch2Value==="각종대학(전문)"){
          sch2Value="각종대학(대학)"
      }
      
  }

  const getEstType=()=>{
      let estTypeList = document.getElementsByName("estType");
      
      estTypeList.forEach((node)=>{
          if(node.checked){
              estTypeValue=node.value;
          }
      })
      
      if(estTypeValue==="국립"){
          
      }
      else if(estTypeValue==="사립"){
          
      }
      else if(estTypeValue==="공립"){
          
      }
      
  }
  
  let defaultList=[{
      campusName:"",
      schoolType:"",
      link:"",
      schoolGubun:"",
      adres:"",
      schoolName:"",
      estType:"",
      isFavorite: false
    }]
    const [univList, setUnivList] = useState(defaultList);
    const [searchList, setSearchList] = useState(defaultList);
    useEffect(() => {
      ConfirmURL();
  }, []);
  const ConfirmURL = async()=>{
          try {
          
              const response = await axios.get("https://672818aa270bd0b975544f4d.mockapi.io/api/v1/univ");
              
          
              // 예시: 모든 학교 이름 출력
              setUnivList(response.data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
            setData();
            PageData();
            newArrayData2();
            console.log(page);

  }
  const filterEnter = ()=>{
      searchFunction();
      PageData();
      newArrayData2();
  }
  const searchFunction = ()=>{
      const searchArr = univList.map((item)=>{
        if(item.isFavorite){
          setSearchList(item);
        }
          
     })
  }
  
  const setData = () => {
      const filteredData = univList.filter((item) => {
          if (item.isFavorite) {
              return true;
          }
          return false; // 조건이 없으면 전체 리스트 반환
      });
      setSearchList(filteredData);// 필터된 데이터를 상태로 업데이트
  };
  useEffect(() => {
     setData();
  }, [sch1Value, sch2Value, estTypeValue, univList]);
  useEffect(() => {
      if (searchList && searchList.length > 0 && searchList[0].schoolName) {
          newArrayData2();
      }
      else{
          setTempData([<tr key="no-data"><td colSpan="3">No Data Available</td></tr>]);
          console.log("asd");
      }
  }, [searchList]);
  if (!univList || univList.length === 0 || !univList[0].schoolName) {
      totalData = 0;
  }
  else{
      totalData = searchList.length;
  }
  //totalData = searchList.length;
  const pageCount = totalData/20;
  const arr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  const PageData = () => {
      const pageArr = [];
      const totalPages = Math.ceil(totalData / 20); // 페이지 계산
      for (let i = 0; i < totalPages; i++) {
          pageArr.push(
              <li key={i} className="page-item" onClick={() => PageNumber(i + 1)}>
                      <PageLink className="page-link" href="#">{i + 1}</PageLink>

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
      if (!searchList || searchList.length === 0 ||totalData===0) {
          setTempData([<tr key="no-data"><td colSpan="3">No Data Available</td></tr>]);
          return;
      }
      for (let i = (page - 1) * 20; i < Math.min((page - 1) * 20 + 20, searchList.length); i++) {
          updatedData.push(
              <tr key={i}>
                  <td><StyledLink href={searchList[i].link}>{searchList[i].schoolName}</StyledLink></td>
                  <td>{searchList[i].campusName}</td>
                  <td>{searchList[i].estType}</td>
                  <td>{searchList[i].isFavorite ? <img src="star.png" style={{width: "20px"}}></img>:<img src="outline_star.png" style={{width: "20px"}}></img>}</td>
              </tr>
          );
      }
      setTempData(updatedData);
      console.log(searchList.length)// 상태 업데이트
  };
  return (
    <>
        <Header title="관심 대학"></Header>
        <MainContainer class="container">
        <Container>
            
            {/* <MainBtn>
                <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" class="btn-check" value="일반대학" name="sch1" id="btnradio1" onChange={getSch1}  autocomplete="off"/>
                    <label class="btn btn-outline-success" for="btnradio1">일반대학</label>

                    <input type="radio" class="btn-check" value="전문대학" name="sch1" id="btnradio2" onChange={getSch1} autocomplete="off"/>
                    <label class="btn btn-outline-success" for="btnradio2">전문대학</label>
                </div>
            </MainBtn> */}

            {/* <Input>
                <input type="text" id="searching" placeholder='대학명을 입력해주세요:)'></input>
                <button><img src='./searchIcon.png'></img></button>
            </Input> */}
            {/* <Filter>
                <div id='moveFilter'>
                    <span>적용필터</span>
                    <button id="modal_btn" data-bs-toggle="modal" data-bs-target="#filterModalNormal"><img src='./filterIcon2.png'></img></button>
                </div>

                <div id="condition"> {sch2Value} &nbsp;&nbsp; {estTypeValue} &nbsp;&nbsp; </div>
            </Filter> */}
            <Link to='/main'><BookMarkBtn>돌아가기</BookMarkBtn></Link>
            {/* <ResetBtn onClick={deslectAll}>
                검색 조건 초기화
                
            </ResetBtn> */}
            <Outlet></Outlet>
        </Container>
        <TableContainer>
            <label>총 <span>{totalData}</span>건</label>
            <table class="table" style={{textAlign:"center"}} center>
                <thead>
                    <tr>
                        <th scope="col">학교 이름</th>
                        <th scope="col">캠퍼스</th>
                        <th scope="col">설립유형</th>
                        <th scope='col'></th>
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
        
                    
      </MainContainer>
    </>
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
    &:hover{
        background: #41AB66;
        color: #FFF;
    }
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
const StyledLink = styled.a`
  color: #000000;
  text-decoration: none;
  
  &:hover {
    color: #41AB66;
  }
`;
const PageLink = styled.a`
    color: #41AB66;
`


