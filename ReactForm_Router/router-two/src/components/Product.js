import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Product() {
    // let { categoryId } = useParams();
    const { state } = useLocation();
    return (
        <div>
            {/*<h3>Id selected {categoryId} </h3>*/}
            <h3>Id selected {state.categoryId} </h3>
        </div>
    );
}
export default Product;