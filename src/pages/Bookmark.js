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
  
  const PageData = () => {
      const pageArr = [];
      const totalPages = Math.ceil(totalData / 20);
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
      page=num; 
      newArrayData2(); 
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
                  <td>{searchList[i].isFavorite ? <img alt="error" src="star.png" style={{width: "20px"}}></img>:<img alt="error" src="outline_star.png" style={{width: "20px"}}></img>}</td>
              </tr>
          );
      }
      setTempData(updatedData);
      console.log(searchList.length)
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
      <Footer></Footer>
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


