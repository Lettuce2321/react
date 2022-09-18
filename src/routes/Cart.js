import {Table} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setCountPlus, setCountMinus } from '../store';


function Cart() {

    let cart = useSelector((state)=>{return state.cart})
    
    return(
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map((item, i)=>{
                            return(<CartBody item={item}/>)
                        })
                    }
                </tbody>
            </Table> 
        </div>
    )
}

function CartBody(props){
    let dispatch = useDispatch();
    return(
        <tr>
            <td>{props.item.id}</td>
            <td>{props.item.name}</td>
            <td>{props.item.count}</td>
            <td>안녕</td>
        <td>
            <button onClick={()=>{
                dispatch(setCountMinus(props.item.id))
            }}> - </button>
            <button onClick={()=>{
                dispatch(setCountPlus(props.item.id))
            }}>+</button>
        </td>
    </tr>
    )
}

export default Cart;