import React, { useState } from 'react';
import axios from "axios"

        let mainURL="https://www.career.go.kr/cnet/openapi/getOpenApi?apiKey=f06828f52ece9c68db430db8fb2584d9&svcType=api&svcCode=SCHOOL&contentType=json&gubun=univ_list";
        let regionURL="";
        let sch1URL="";
        let sch2NURL="";
        let sch2JURL="";
        let estTypeURL="";
export default function Main2() {
        
        const getRegion =()=>{
            let regionList = document.getElementsByName("region");
            let regionValue;
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
                sch1Code="100323"
            }
            else if(sch1Value==="전문대학"){
                sch1Code="100322"
            }
            sch1Code="&sch1="+sch1Code;
            console.log(sch1Code);
            sch1URL=sch1Code;
        }

        const getSch2ForNormal=()=>{
            let sch2List = document.getElementsByName("sch2ForNormal");
            let sch2Value;
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
            let sch2Value;
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
            let estTypeValue;
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
        const ConfirmURL = async()=>{
            mainURL=mainURL+regionURL+sch1URL+sch2NURL+sch2JURL+estTypeURL;
            
              
                
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
        }

        const newArrayData = univList.map((item) => {
            return(
              <tr>
                <td>{item.schoolName}</td>
                <td>{item.region}</td>
                <td>{item.estType}</td>
              </tr>
            );
          });
  return (
    <>  
        
        <input name="region" value="서울특별시" type="radio" onChange={getRegion}/>서울특별시
        <input name="region" value="부산광역시" type="radio" onChange={getRegion}/>부산광역시
        <input name="region" value="인천광역시" type="radio" onChange={getRegion}/>인천광역시
        <input name="region" value="대전광역시" type="radio" onChange={getRegion}/>대전광역시
        <input name="region" value="대구광역시" type="radio" onChange={getRegion}/>대구광역시
        <input name="region" value="울산광역시" type="radio" onChange={getRegion}/>울산광역시
        <input name="region" value="광주광역시" type="radio" onChange={getRegion}/>광주광역시
        <input name="region" value="경기도" type="radio" onChange={getRegion}/>경기도
        <input name="region" value="강원도" type="radio" onChange={getRegion}/>강원도
        <input name="region" value="충청북도" type="radio" onChange={getRegion}/>충청북도
        <input name="region" value="충청남도" type="radio" onChange={getRegion}/>충청남도
        <input name="region" value="전라북도" type="radio" onChange={getRegion}/>전라북도
        <input name="region" value="전라남도" type="radio" onChange={getRegion}/>전라남도
        <input name="region" value="경상북도" type="radio" onChange={getRegion}/>경상북도
        <input name="region" value="경상남도" type="radio" onChange={getRegion}/>경상남도
        <input name="region" value="제주도" type="radio" onChange={getRegion}/>제주도
        <br/><br/>

        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
            <input type="radio" class="btn-check" value="일반대학" name="sch1" id="btnradio1" onChange={getSch1}  autocomplete="off"/>
            <label class="btn btn-outline-success btn-lg" for="btnradio1">일반대학</label>

            <input type="radio" class="btn-check" value="전문대학" name="sch1" id="btnradio2" onChange={getSch1} autocomplete="off"/>
            <label class="btn btn-outline-success btn-lg" for="btnradio2">전문대학</label>
        </div>
    
        <br/><br/>

        <input name="sch2ForNormal" value="일반대학" type="radio" onChange={getSch2ForNormal}/>일반대학
        <input name="sch2ForNormal" value="교육대학" type="radio" onChange={getSch2ForNormal}/>교육대학
        <input name="sch2ForNormal" value="산업대학" type="radio" onChange={getSch2ForNormal}/>산업대학
        <input name="sch2ForNormal" value="사이버대학(4년제)" type="radio" onChange={getSch2ForNormal}/>사이버대학(4년제)
        <input name="sch2ForNormal" value="각종대학(대학)" type="radio" onChange={getSch2ForNormal}/>각종대학(대학)
        
        <br/><br/>
        <input name="sch2ForJunior" value="전문대학" type="radio" onChange={getSch2ForJunior}/>전문대학
        <input name="sch2ForJunior" value="기능대학" type="radio" onChange={getSch2ForJunior}/>기능대학
        <input name="sch2ForJunior" value="사이버대학(2년제)" type="radio" onChange={getSch2ForJunior}/>사이버대학(2년제)
        <input name="sch2ForJunior" value="각종대학(전문)" type="radio" onChange={getSch2ForJunior}/>각종대학(전문)

        <br/><br/>
        <input name="estType" value="국립" type="radio" onChange={getEstType}/>국립
        <input name="estType" value="사립" type="radio" onChange={getEstType}/>사립
        <input name="estType" value="공립" type="radio" onChange={getEstType}/>공립

        

        <br/><br/>
        <div id="div_players">
            <input value="확인" type="button" onClick={ConfirmURL}/>
            <table class="table" center>
                <thead>
                    <tr>
                        <th scope="col">schoolName</th>
                        <th scope="col">region</th>
                        <th scope="col">estType</th>
                    </tr>
                </thead>
                <tbody>
                    {newArrayData}
                </tbody>
            </table>
        </div>
        <div>main</div>
    </>
    
  )
}
