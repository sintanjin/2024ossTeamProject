import React from 'react'
import Sidebar from '../components/Sidebar.js'
import Content from '../components/Content.js'
import Footer from '../components/Footer.js'
import Header from '../components/Header.js'

export default function Main() {

  return (
    <>
    <div>
        <Header title="대학 정보"></Header>
        <div id='body'>
            <Sidebar></Sidebar>
            <Footer></Footer>
        </div>
        

    </div>
    </>
  )
}
