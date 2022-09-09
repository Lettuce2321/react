import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {row,col,Container} from 'react-bootstrap'
import { useState } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import data from './routes/data.js';
import DetailPage from './routes/detail'



function App() {
  let [shoes,setShoes] = useState(data);
  let navigate = useNavigate();
  return (

    <div className="App">
      <Link to='/'>홈</Link>
      <Link to='/detail'>상세페이지</Link>
      <Link to='/about'>자세히</Link>
      <Routes>
        <Route path='/' element={
          <>
            <div className="container">
              <div className="row">
              {
                shoes.map((shoes,i) => {
                  return(
                    <ShoesItem shoes = {shoes} i = {i}></ShoesItem>
                  )
                })
              }
              </div>
            </div>
         </>
        }/>
        <Route path='/detail/:id' element={<DetailPage shoes={shoes}></DetailPage>}/>
        

        <Route path='/*' element={<p>404</p>}/>
        <Route path='/about' element={<About/>}>
          <Route path="member" element={<div>멤버임</div>}/>
          <Route path='location' element={<div>위치임</div>}/>
        </Route>
        
      </Routes>
    </div>
  );
}
function About() {
  return(
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}
function ShoesItem(props) {
  return(
    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes'+(props.shoes.id+1)+'.jpg'} width="80%" />
      <Link to={'/detail/'+(props.shoes.id+1)}><h4>{ props.shoes.title }</h4></Link>
      <p>{ props.shoes.price }</p>
    </div>
  )
}

export default App;

