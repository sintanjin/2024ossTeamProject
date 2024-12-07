import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import axios from "axios"
import { Link, Outlet } from 'react-router-dom';


let page=1;
let sch1Value="";
let estTypeValue="";
let sch2Value="";
let schTypeValue="";
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
        for(let i=0;i<sch2ForJunior.length;i++){
            if(sch2ForJunior[i].getAttribute('type')==='radio'){
                sch2ForJunior[i].checked = false;
            }
        }
        var estType=document.getElementsByName("estType");
        for(let i=0;i<estType.length;i++){
            if(estType[i].getAttribute('type')==='radio'){
                estType[i].checked = false;
            }
        }
        
        estTypeValue="";
        sch2Value="";
        var searching = document.getElementById("searching");
        searching.value="";
    }
    function deslectAll(){
        deslect();
        var sch1=document.getElementsByName("sch1");
        for(let i=0;i<sch1.length;i++){
            if(sch1[i].getAttribute('type')==='radio'){
                sch1[i].checked = false;
            }
        }
        sch1Value="";
        var sch1Create = document.getElementsByName("schTypeForCreate");
        for(let i=0;i<sch1Create.length;i++){
            if(sch1Create[i].getAttribute('type')==='radio'){
                sch1Create[i].checked = false;
            }
        }
        let schNameForCreate = document.getElementById("schNameForCreate");
        let schAddressForCreate = document.getElementById("schAddressForCreate");
        let schLinkForCreate = document.getElementById("schLinkForCreate");
        let schCampusForCreate = document.getElementById("schCampusForCreate");
        schNameForCreate.value="";
        schAddressForCreate.value="";
        schLinkForCreate.value="";
        schCampusForCreate.value="";
        let sch2ForNormalForCreate = document.getElementsByName("sch2ForNormalForCreate");
        let estTypeForCreate = document.getElementsByName("estTypeForCreate");
        for(let i=0;i<sch2ForNormalForCreate.length;i++){
            if(sch2ForNormalForCreate[i].getAttribute('type')==='radio'){
                sch2ForNormalForCreate[i].checked = false;
            }
        }
        for(let i=0;i<estTypeForCreate.length;i++){
            if(estTypeForCreate[i].getAttribute('type')==='radio'){
                estTypeForCreate[i].checked = false;
            }
        }
        let sch2ForJuniorForCreate = document.getElementsByName("sch2ForJuniorForCreate");
        for(var i=0;i<sch2ForJuniorForCreate.length;i++){
            if(sch2ForJuniorForCreate[i].getAttribute('type')==='radio'){
                sch2ForJuniorForCreate[i].checked = false;
            }
        }
        setData();
        ConfirmURL();
    }

    const CreateData=()=>{
        let schNameForCreate = document.getElementById("schNameForCreate");
        let schAddressForCreate = document.getElementById("schAddressForCreate");
        let schLinkForCreate = document.getElementById("schLinkForCreate");
        let schCampusForCreate = document.getElementById("schCampusForCreate");
        let sch2ForNormalForCreate = document.getElementsByName("sch2ForNormalForCreate");
        let estTypeForCreate = document.getElementsByName("estTypeForCreate");
        let sch2ValueForCreate="";
        let estTypeValueForCreate="";
        sch2ForNormalForCreate.forEach((node)=>{
            if(node.checked){
                sch2ValueForCreate=node.value;
            }
        })
        estTypeForCreate.forEach((node)=>{
            if(node.checked){
                estTypeValueForCreate=node.value;
            }
        })
        if(sch2ValueForCreate==="사이버대학"){
            sch2ValueForCreate="사이버대학(대학)"
        }
        else if(sch2ValueForCreate==="각종대학"){
            sch2ValueForCreate="각종대학(대학)"
        }
        const createList={
            campusName:schCampusForCreate.value,
            schoolType:sch2ValueForCreate,
            link:schLinkForCreate.value,
            schoolGubun:"대학(4년제)",
            adres:schAddressForCreate.value,
            schoolName:schNameForCreate.value,
            estType:estTypeValueForCreate,
            isFavorite: false
          }
          axios.post("https://672818aa270bd0b975544f4d.mockapi.io/api/v1/univ",createList)
            .then((response)=>{
                console.log(response);
                deslectAll();
                ConfirmURL();
                
            })
            .catch((error)=>{
                console.log(error);
            })
    }
    const CreateData2=()=>{
        let schNameForCreate = document.getElementById("schNameForCreate2");
        let schAddressForCreate = document.getElementById("schAddressForCreate2");
        let schLinkForCreate = document.getElementById("schLinkForCreate2");
        let schCampusForCreate = document.getElementById("schCampusForCreate2");
        let sch2ForJuniorForCreate = document.getElementsByName("sch2ForJuniorForCreate");
        let estTypeForCreate = document.getElementsByName("estTypeForCreate");
        let sch2ValueForCreate="";
        let estTypeValueForCreate="";
        sch2ForJuniorForCreate.forEach((node)=>{
            if(node.checked){
                sch2ValueForCreate=node.value;
            }
        })
        estTypeForCreate.forEach((node)=>{
            if(node.checked){
                estTypeValueForCreate=node.value;
            }
        })
        if(sch2ValueForCreate==="사이버대학"){
            sch2ValueForCreate="사이버대학(대학)"
        }
        else if(sch2ValueForCreate==="각종대학"){
            sch2ValueForCreate="각종대학(대학)"
        }
        const createList={
            campusName:schCampusForCreate.value,
            schoolType:sch2ValueForCreate,
            link:schLinkForCreate.value,
            schoolGubun:"전문대학",
            adres:schAddressForCreate.value,
            schoolName:schNameForCreate.value,
            estType:estTypeValueForCreate,
            isFavorite: false
          }
          axios.post("https://672818aa270bd0b975544f4d.mockapi.io/api/v1/univ",createList)
            .then((response)=>{
                console.log(response);
                deslectAll();
                ConfirmURL();
            })
            .catch((error)=>{
                console.log(error);
            })
    }
    
    const typeSelect=()=>{
        console.log("nihao3");
        let schTypeForCreate=document.getElementsByName("schTypeForCreate");
        schTypeForCreate.forEach((node)=>{
            if(node.checked){
                schTypeValue=node.value;
            }
        })
        if(schTypeValue==="일반대학"){
            console.log("nihao1");
            let modal=document.getElementById("modal_btn2");
            modal.setAttribute("data-bs-target","#filterModalNormalForCreate");
        }
        else if(schTypeValue==="전문대학"){
            console.log("nihao");
            let modal =document.getElementById("modal_btn2");
            modal.setAttribute("data-bs-target","#filterModalJuniorForCreate")
        }
    }

    const getSch1=()=>{
        deslect();
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
      const [inputs, setInputs] = useState([]);
      
    const handelChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    const ModalUpdate = () => {
        const updatedUnivList = univList.map((univ) =>
            univ.id === inputs.id ? inputs : univ
        );
        setUnivList(updatedUnivList);
        const updatedSearchList = searchList.map((univ) =>
            univ.id === inputs.id ?  inputs: univ
        );
        setSearchList(updatedSearchList);

        axios.put(`https://672818aa270bd0b975544f4d.mockapi.io/api/v1/univ/${inputs.id}`, inputs)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
                setUnivList((prevList) =>
                    prevList.map((univ) =>
                        univ.id === inputs.id ? inputs : univ
                    )
                );
                setSearchList((prevList) =>
                    prevList.map((univ) =>
                        univ.id === inputs.id ? inputs : univ
                    )
                );
            });


    }
    const deleteData = async(id) => {
        if(window.confirm("Do you want to delete it..?")) {
            await axios.delete("https://672818aa270bd0b975544f4d.mockapi.io/api/v1/univ/"+id)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                })
                const newList = univList.filter((c) => c.id !== id); 
                setUnivList(newList); 
                const newList2 = searchList.filter((c) => c.id !== id); 
                setUnivList(newList2); 
        }
    }

    const Update = (item) => {
        setInputs({ id: item.id, schoolName: item.schoolName, campusName: item.campusName, link: item.link, adres: item.adres, estType: item.estType, schoolType: item.schoolType, isFavorite: item.isFavorite, schoolGubun: item.schoolGubun})
    }
      useEffect(() => {
        ConfirmURL();
     },[]);
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
        setData();
        PageData();
        newArrayData2();
    }
    
    const setData = () => {
        const filteredData = univList.filter((item) => {
            let searching=document.getElementById("searching");
            if(searching.value===""){
                if (sch1Value !== "" && sch2Value !== "" && estTypeValue !== "") {
                    return item.schoolGubun === sch1Value && item.estType === estTypeValue && item.schoolType === sch2Value;
                } else if (sch1Value !== "" && sch2Value !== "") {
                    return item.schoolGubun === sch1Value && item.schoolType === sch2Value;
                } else if (sch1Value !== "") {
                    return item.schoolGubun === sch1Value;
                } else if (sch2Value !== "") {
                    return item.schoolType === sch2Value;
                } else if (estTypeValue !== "") {
                    return item.estType === estTypeValue;
                }
                return true; // 조건이 없으면 전체 리스트 반환

            }
            else{
                if (sch1Value !== "" && sch2Value !== "" && estTypeValue !== "") {
                    return item.schoolGubun === sch1Value && item.estType === estTypeValue && item.schoolType === sch2Value &&item.schoolName.includes(searching.value);
                } else if (sch1Value !== "" && sch2Value !== "") {
                    return item.schoolGubun === sch1Value && item.schoolType === sch2Value &&item.schoolName.includes(searching.value);
                } else if (sch1Value !== "") {
                    return item.schoolGubun === sch1Value &&item.schoolName.includes(searching.value);
                } else if (sch2Value !== "") {
                    return item.schoolType === sch2Value &&item.schoolName.includes(searching.value);
                } else if (estTypeValue !== "") {
                    return item.estType === estTypeValue &&item.schoolName.includes(searching.value);
                }
                return item.schoolName.includes(searching.value); // 조건이 없으면 전체 리스트 반환

            }
            
        });
        setSearchList(filteredData); // 필터된 데이터를 상태로 업데이트
    };
    useEffect(() => {
        setData();
    }, [sch1Value, sch2Value, estTypeValue, univList]);
    useEffect(() => {
        if (searchList && searchList.length > 0) {
            newArrayData2();
        }
        else{
            setTempData([<tr key="no-data"><td colSpan="3">No Data Available</td></tr>]);
            console.log("ASd");
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
        page=num; // 페이지 상태 업데이트
        newArrayData2(); // 데이터 업데이트
    }
    const [tempData, setTempData] = useState([]);
    
    const newArrayData2 = () => {
        const updatedData = [];
        if (!searchList || searchList.length === 0 || !searchList[0].schoolName||totalData===0) {
            setTempData([<tr key="no-data"><td colSpan="3">No Data Available</td></tr>]);
            return;
        }
        for (let i = (page - 1) * 20; i < Math.min((page - 1) * 20 + 20, searchList.length); i++) {
            updatedData.push(
                <tr key={i}>
                    <td><StyledLink href={searchList[i].link}>{searchList[i].schoolName}</StyledLink></td>
                    <td>{searchList[i].campusName}</td>
                    <td>{searchList[i].estType}</td>
                    <td>{searchList[i].isFavorite ? <img alt="error" src="star.png" style={{width: "20px"}} onClick={()=> toggleFavorite(searchList[i])}></img>:<img alt="error" src="outline_star.png" style={{width: "20px"}} onClick={()=> toggleFavorite(searchList[i])}></img>}</td>
                    <td><UpdateBtn data-bs-toggle="modal" data-bs-target="#updateNormalModal" onClick={()=> Update(searchList[i])}><img alt="error" src="updateIcon.png" style={{width: "20px"}}></img></UpdateBtn></td>
                    <td><DeleteBtn onClick={()=>deleteData(searchList[i].id)}><img alt="error" src="deleteIcon.png" style={{width: "20px"}}></img></DeleteBtn></td>
                </tr>
            );
        }
        setTempData(updatedData);
        console.log(searchList.length)// 상태 업데이트
    };

    

    const toggleFavorite = (item) => {
        const updatedStar = {...item, isFavorite: !item.isFavorite};
        const updatedUnivList = univList.map((univ) =>
            univ.id === item.id ? updatedStar : univ
        );
        setUnivList(updatedUnivList);
        const updatedSearchList = searchList.map((univ) =>
            univ.id === item.id ?  updatedStar: univ
        );
        setSearchList(updatedSearchList);
    
        axios.put(`https://672818aa270bd0b975544f4d.mockapi.io/api/v1/univ/${item.id}`, updatedStar)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
                setUnivList((prevList) =>
                    prevList.map((univ) =>
                        univ.id === item.id ? updatedStar : univ
                    )
                );
                setSearchList((prevList) =>
                    prevList.map((univ) =>
                        univ.id === item.id ? updatedStar : univ
                    )
                );
            });
    };
    
    
    
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
                <input type="text" id="searching" placeholder='대학명을 입력해주세요:)'></input>
                <button onClick={filterEnter}><img alt="error" src='./searchIcon.png'></img></button>
            </Input>
            <Filter>
                <div id='moveFilter'>
                    <span>적용필터</span>
                    <button id="modal_btn" data-bs-toggle="modal" data-bs-target="#filterModalNormal"><img alt="error" src='./filterIcon2.png'></img></button>
                </div>

                <div id="condition"> {sch2Value} &nbsp;&nbsp; {estTypeValue} &nbsp;&nbsp; </div>
            </Filter>
            <Link to='/bookmark'><BookMarkBtn>관심 대학 찾기</BookMarkBtn></Link>
            <ResetBtn onClick={deslectAll}>
                검색 조건 초기화
            </ResetBtn>
            <CreateBtn data-bs-toggle="modal" data-bs-target="#createModal">
                대학 추가하기
            </CreateBtn>
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
                        <th scope='col'></th>
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
        <div class="modal fade" id="createModal" tabindex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="createModalLabel">대학유형</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                    </div>
                    <table class="table" style={{verticalAlign: "middle"}}>
                        <tbody class="table-group-divider">
                            <tr> 
                                <td>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="schTypeForCreate" value="일반대학" onChange={typeSelect} id="normal"/>
                                        <label class="form-check-label" for="normal">일반대학</label>
                                    </div>
                                </td>
                                <td>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="schTypeForCreate" value="전문대학" onChange={typeSelect}  id="junior"/>
                                        <label class="form-check-label" for="junior">전문대학</label>    
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="modal-footer justify-content-center">
                        <button type="button" class="btn btn-outline-success" data-bs-dismiss="modal" >취소</button>
                        <button type="button" data-bs-toggle="modal"  data-bs-target="#filterModalNormalForCreate" id="modal_btn2" class="btn btn-success" data-bs-dismiss="modal">확인</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade modal-lg" id="filterModalNormalForCreate" tabindex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="createModalLabel">대학 추가하기</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                    </div>
                        <div class="modal-body " id="createModalBody">
                        
                        <table class="table" style={{verticalAlign: "middle"}}>
                                <tbody class="table-group-divider">
                                    <tr>
                                        <th scope="row" class="table-secondary">학교명</th>
                                        <td colSpan={5}>
                                            <input type="text"  id="schNameForCreate" /><br/>
                                        </td>
                                        
                                    </tr>
                                    <tr>
                                        <th scope="row" class="table-secondary">학교 주소</th>
                                        <td colSpan={5}>
                                            <input type="text"  id="schAddressForCreate" /><br/>
                                        </td>
                                        
                                    </tr>
                                    <tr>
                                        <th scope="row" class="table-secondary">학교 사이트</th>
                                        <td colSpan={5}>
                                            <input type="text" id="schLinkForCreate"  /><br/>
                                        </td>
                                        
                                    </tr>
                                    <tr>
                                        <th scope="row" class="table-secondary">캠퍼스</th>
                                        <td colSpan={5}>
                                            <select id="schCampusForCreate" >
                                                <option>제1캠퍼스</option>
                                                <option>제2캠퍼스</option>
                                                <option>제3캠퍼스</option>
                                            </select>
                                        </td>
                                        
                                    </tr>
                                    <tr> 
                                        <th scope="row" class="table-secondary">학교유형</th>
                                        <td>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="sch2ForNormalForCreate" value="각종대학(대학)"  id="sch2ForNormal1"/>
                                            <label class="form-check-label" for="sch2ForNormal1">각종대학</label>
                                        </div>
                                        </td>
                                        <td>
                                            
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="sch2ForNormalForCreate" value="교육대학"  id="sch2ForNormal2"/>
                                            <label class="form-check-label" for="sch2ForNormal2">교육대학</label>    
                                        </div>
                                        </td>
                                        <td>
                                            <div class="form-check">
                                            <input class="form-check-input" type="radio" name="sch2ForNormalForCreate" value="일반대학"  id="sch2ForNormal3"/>
                                            <label class="form-check-label" for="sch2ForNormal3">대학교</label>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="form-check">
                                            <input class="form-check-input" type="radio" name="sch2ForNormalForCreate" value="사이버대학(4년제)" id="sch2ForNormal4"/>
                                            <label class="form-check-label" for="sch2ForNormal4">사이버대학</label>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="form-check">
                                            <input class="form-check-input" type="radio" name="sch2ForNormalForCreate" value="산업대학"  id="sch2ForNormal5"/>
                                            <label class="form-check-label" for="sch2ForNormal5">산업대학</label>
                                            </div>
                                        </td>
                                        
                                        
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" class="table-secondary">설립유형</th>
                                        <td>
                                            <div class="form-check">
                                            <input class="form-check-input" type="radio" name="estTypeForCreate" value="국립"  id="estType1"/>
                                            <label class="form-check-label" for="estType1">국립</label>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="form-check">
                                            <input class="form-check-input" type="radio" name="estTypeForCreate" value="공립"  id="estType2"/>
                                            <label class="form-check-label" for="estType2">공립</label>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="form-check">
                                            <input class="form-check-input" type="radio" name="estTypeForCreate" value="사립"   id="estType3"/>
                                            <label class="form-check-label" for="estType3">사립</label>
                                            </div>
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>

                                     
                            
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer justify-content-center" >
                        
                        <button type="button" class="btn btn-success" data-bs-dismiss="modal" onClick={CreateData}>추가</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade modal-lg" id="filterModalJuniorForCreate" tabindex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="createModalLabel">대학 추가하기</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                    </div>
                        <div class="modal-body " id="createModalBody">
                        
                        <table class="table" style={{verticalAlign: "middle"}}>
                                <tbody class="table-group-divider">
                                    <tr>
                                        <th scope="row" class="table-secondary">학교명</th>
                                        <td colSpan={5}>
                                            <input type="text"  id="schNameForCreate2" /><br/>
                                        </td>
                                        
                                    </tr>
                                    <tr>
                                        <th scope="row" class="table-secondary">학교 주소</th>
                                        <td colSpan={5}>
                                            <input type="text"  id="schAddressForCreate2" /><br/>
                                        </td>
                                        
                                    </tr>
                                    <tr>
                                        <th scope="row" class="table-secondary">학교 사이트</th>
                                        <td colSpan={5}>
                                            <input type="text" id="schLinkForCreate2"  /><br/>
                                        </td>
                                        
                                    </tr>
                                    <tr>
                                        <th scope="row" class="table-secondary">캠퍼스</th>
                                        <td colSpan={5}>
                                            <select id="schCampusForCreate2" >
                                                <option>제1캠퍼스</option>
                                                <option>제2캠퍼스</option>
                                                <option>제3캠퍼스</option>
                                            </select>
                                        </td>
                                        
                                    </tr>
                                    <tr> 
                                        <th scope="row" class="table-secondary">학교유형</th>
                                        <td>
                                            <div class="form-check">
                                            <input class="form-check-input" type="radio" name="sch2ForJuniorForCreate" value="각종대학(전문)" id="sch2ForJunior1ForCreate"/>
                                            <label class="form-check-label" for="sch2ForJunior1ForCreate">각종대학</label>
                                            </div>
                                        </td>
                                        <td>
                                            
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="sch2ForJuniorForCreate" value="기능대학"  id="sch2ForJunior2ForCreate"/>
                                            <label class="form-check-label" for="sch2ForJunior2ForCreate">기능대학</label>    
                                        </div>
                                        </td>
                                        <td>
                                            <div class="form-check">
                                            <input class="form-check-input" type="radio" name="sch2ForJuniorForCreate" value="사이버대학(2년제)"  id="sch2ForJunior3ForCreate"/>
                                            <label class="form-check-label" for="sch2ForJunior3ForCreate">사이버대학</label>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="form-check">
                                            <input class="form-check-input" type="radio" name="sch2ForJuniorForCreate" value="전문대학"  id="sch2ForJunior4ForCreate"/>
                                            <label class="form-check-label" for="sch2ForJunior4ForCreate">전문대학</label>
                                            </div>
                                        </td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" class="table-secondary">설립유형</th>
                                        <td>
                                            <div class="form-check">
                                            <input class="form-check-input" type="radio" name="estTypeForCreate" value="국립"  id="estType1"/>
                                            <label class="form-check-label" for="estType1">국립</label>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="form-check">
                                            <input class="form-check-input" type="radio" name="estTypeForCreate" value="공립"  id="estType2"/>
                                            <label class="form-check-label" for="estType2">공립</label>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="form-check">
                                            <input class="form-check-input" type="radio" name="estTypeForCreate" value="사립"   id="estType3"/>
                                            <label class="form-check-label" for="estType3">사립</label>
                                            </div>
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>

                                     
                            
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer justify-content-center" >
                        
                        <button type="button" class="btn btn-success" data-bs-dismiss="modal" onClick={CreateData2}>추가</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade modal-lg" id="updateNormalModal" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="updateModalLabel">대학 편집하기</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                    </div>
                    <div class="modal-body" id="createModalBody">
                        <table class="table" style={{verticalAlign: "middle"}}>
                            <tbody class="table-group-divider">
                                    <tr> 
                                        <th scope="row" class="table-secondary">학교명</th>
                                        <td colSpan={5}>
                                            <input type="text" name="schoolName" value={inputs.schoolName || "" } onChange={handelChange}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" class="table-secondary">학교 주소</th>
                                        <td colSpan={5}>
                                            <input type="text" name="adres" value={inputs.adres || "" } onChange={handelChange}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" class="table-secondary">학교 사이트</th>
                                        <td colSpan={5}>
                                            <input type="text" name="link" value={inputs.link || "" } onChange={handelChange}/>
                                        </td>
                                        
                                    </tr>
                                    <tr>
                                        <th scope="row" class="table-secondary">캠퍼스</th>
                                        <td colSpan={5}>
                                            <select name="campusName" value={inputs.campusName || "" } onChange={handelChange}>
                                                <option value="제1캠퍼스">제1캠퍼스</option>
                                                <option value="제2캠퍼스">제2캠퍼스</option>
                                                <option value="제3캠퍼스">제3캠퍼스</option>
                                            </select>
                                        </td>
                                    </tr>
                                      
                            </tbody>
                    </table>
  
                    </div>
                    <div class="modal-footer justify-content-center">
                        <button type="button" class="btn btn-outline-success" data-bs-dismiss="modal" >취소</button>
                        <button type="button" class="btn btn-success"  data-bs-dismiss="modal" onClick={ModalUpdate}>완료</button>
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
    &:hover{
        background: #41AB66;
        color: #FFF;
    }
`
const CreateBtn = styled.button`
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
const UpdateBtn = styled.button`
    border: none;
    background: #FFF;
`
const DeleteBtn = styled.button`
    border: none;
    background: #FFF;
`

