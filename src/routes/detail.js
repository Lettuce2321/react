import { useParams } from "react-router-dom";
import styled from 'styled-components'

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
    let {id} = useParams();
    //이동한 위치의 id와 같은 id를 가진 상품을 찾음 (데이터바인딩을 통해 싸이트는 결정 됨)
    let 찾은상품 = props.shoes.find((x) => { return x.id == (id-1)})
    console.log(찾은상품);
    return(
        <>
            <div className="container">
                <Box><YellowBtn bg={'blue'}>버튼</YellowBtn></Box>
                <div className="row">
                    <div className="col-md-6">
                    <img src={"https://codingapple1.github.io/shop/shoes"+(찾은상품.id+1)+".jpg"} width="100%" />
                    </div>
                    <div className="col-md-6">
                    <h4>{ 찾은상품.title }</h4>
                    <p>{ 찾은상품.content }</p>
                    <p>{ 찾은상품.price }</p>
                    <button className="btn btn-danger">주문하기</button> 
                    </div>
                </div>
            </div> 
        </>
    )
}
export default DetailPage;