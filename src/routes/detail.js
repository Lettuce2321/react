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
        let temp = JSON.parse(localStorage.getItem('watched'));
        let check = true;
        for(let i=0; i<temp.length; i++) {
            // console.log(temp[i])
            // console.log(id-1)
            // console.log(i)
            if(temp[i] == id-1) {
                console.log(temp);
                temp.splice(i,1);
                console.log(temp);
                temp.push(id-1);
                check = false;
                break;
            }
        }
        if(check) { temp.push(id-1); }
        localStorage.setItem('watched',JSON.stringify(temp));
    },[])
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
    
    //????????? ????????? id??? ?????? id??? ?????? ????????? ?????? (????????????????????? ?????? ???????????? ?????? ???)
    let ???????????? = props.shoes.find((x) => { return x.id == (id-1)})
    let dispatch = useDispatch();
    // console.log(????????????)
    return(
        <>
            <div className={"container start "+ detailFade}>
            {
                show ? <div className="alert alert-warning">2????????? ????????? ??????</div> : null
            }
                <Box><YellowBtn bg={'blue'} onClick={()=>{setCount(count+1)}}>??????</YellowBtn></Box>
                <div className="row">
                    <div className="col-md-6">
                        <img src={"https://codingapple1.github.io/shop/shoes"+(????????????.id+1)+".jpg"} width="100%" />
                    </div>
                    <div className="col-md-6">
                        <h4>{ ????????????.title }</h4>
                        <p>{ ????????????.content }</p>
                        <p>{ ????????????.price }</p>
                        {
                            amountShow ?  <div className="alert alert-warning">2????????? ????????? ??????</div> : null
                        }
                        <input className="me-3 p-2" placeholder="?????????" onChange={(e)=> {
                            setAmount(e.target.value);
                        }}></input>
                        <button className="btn btn-danger" onClick={()=> {
                            console.log(????????????);
                            dispatch(setCart(????????????));
                        }}>????????????</button> 
                    </div>
                </div>
            </div>
            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={() => setTab(0)}>??????0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={() => setTab(1)}>??????1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={() => setTab(2)}>??????2</Nav.Link>
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
        {[<div>??????0</div>, <div>??????1</div>,<div>??????2</div>][tab]}
    </div>);
}


export default DetailPage;