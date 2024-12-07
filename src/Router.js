

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main.js";
import Bookmark from "./pages/Bookmark.js";

export default function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Main/>}></Route>
                <Route path='/main' element={<Main/>}></Route>
                <Route path='/bookmark' element={<Bookmark/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}