import { filterChange } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const Filter = () => {

    const dispanch = useDispatch()
    const handleChange = (event) => {
        dispanch(filterChange(event.target.value))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} name='filter'/>
      </div>
    )
  }
  
  export default Filter