import { clear } from "@testing-library/user-event/dist/clear";
import { useEffect, useState } from "react";
import {Nav} from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from 'styled-components'
import {setCount, setCart} from '../store';

let YellowBtn = styled.button`
    background: ${props => props.bg};
    color: ${props => props.bg == 'blue' ? 'white' : 'black'};
    padding: 10px
    `;
let Box = styled.div`
    background: grey;
    padding : 20px
    `;

function DetailPage(props) {
    let [count, setCount] = useState(0);
    let [show, setShow] = useState(true);
    let [amountShow, setAmountShow] = useState(false);
    let [amount, setAmount] = useState("");
    let [tab, setTab] = useState(0);
    let [detailFade,setDetailFade] = useState('');
    let {id} = useParams();
    useEffect(()=> {
        let a = setTimeout(() => {
            setDetailFade('end')
        }, 10);
        return()=> {
            clearTimeout(a);
            setDetailFade('')
        }
    }, [id])
    useEffect(() => {
        let a = setTimeout(()=> {
           setShow(false);
        }, 2000);
        return() => {
            clearTimeout(a);
        }
    },[])

    useEffect(()=> {
        setAmountShow(true);
        if(isNaN(amount)) {
            setAmountShow(true);
        } else {
            setAmountShow(false);
        }
    },[amount]);
    
    //이동한 위치의 id와 같은 id를 가진 상품을 찾음 (데이터바인딩을 통해 싸이트는 결정 됨)
    let 찾은상품 = props.shoes.find((x) => { return x.id == (id-1)})
    let dispatch = useDispatch();
    // console.log(찾은상품)
    return(
        <>
            <div className={"container start "+ detailFade}>
            {
                show ? <div className="alert alert-warning">2초이내 구매시 할인</div> : null
            }
                <Box><YellowBtn bg={'blue'} onClick={()=>{setCount(count+1)}}>버튼</YellowBtn></Box>
                <div className="row">
                    <div className="col-md-6">
                        <img src={"https://codingapple1.github.io/shop/shoes"+(찾은상품.id+1)+".jpg"} width="100%" />
                    </div>
                    <div className="col-md-6">
                        <h4>{ 찾은상품.title }</h4>
                        <p>{ 찾은상품.content }</p>
                        <p>{ 찾은상품.price }</p>
                        {
                            amountShow ?  <div className="alert alert-warning">2초이내 구매시 할인</div> : null
                        }
                        <input className="me-3 p-2" placeholder="숫자만" onChange={(e)=> {
                            setAmount(e.target.value);
                        }}></input>
                        <button className="btn btn-danger" onClick={()=> {
                            console.log(찾은상품);
                            dispatch(setCart(찾은상품));
                        }}>주문하기</button> 
                    </div>
                </div>
            </div>
            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={() => setTab(0)}>버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={() => setTab(1)}>버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={() => setTab(2)}>버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tab={tab}></TabContent>
            
            
        </>
    )
}

function TabContent({tab}) {
    let [fade,setFade] = useState('');
    useEffect(()=> {
        let a = setTimeout(() => {
            setFade('end')
        }, 10);
        return()=> {
            clearTimeout(a);
            setFade('')
        }
    }, [tab])

    return (<div className={'start ' + fade}>
        {[<div>내용0</div>, <div>내용1</div>,<div>내용2</div>][tab]}
    </div>);
}


export default DetailPage;