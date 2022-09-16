import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {row,col,Container} from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import data from './routes/data.js';
import DetailPage from './routes/detail'
import { computeHeadingLevel } from '@testing-library/react';




function App() {
  let [shoes,setShoes] = useState(data);
  let navigate = useNavigate();
  let [buttonCount,setButtonCount] = useState(1);
  let [loading, setLoading] = useState(false);
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
      {
        loading ? <span>로딩중</span> : null
      }
      {
          buttonCount >= 3 ? null:
          <button onClick={()=> {
            setButtonCount(buttonCount+1);
            setLoading(true);
            axios.get('https://codingapple1.github.io/shop/data'+(buttonCount+1)+'.json')
            .then((result)=>{
              setLoading(false);
              console.log(result.data)
              let copy = [...shoes,...result.data];
              setShoes(copy);
            }).catch(()=> {
              setLoading(false);
            })
            
            
          }}>버튼</button>

      }
      
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

