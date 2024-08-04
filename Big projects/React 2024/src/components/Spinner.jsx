import { ClipLoader } from "react-spinners";

const Spinner = ({loading}) => {

    const override = {
        display: "block",
        margin: "100px auto"
    }

    return (
        
            <ClipLoader  loading={loading} cssOverride={override}/>
        )
}

export default Spinner