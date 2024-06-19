import { useState } from "react";
import "./Form.css"

export const Form = ({onAddPerson}) => {
    const [name, setName] = useState("");
    const [tel, setTel] = useState("");
    const [city, setCity] = useState("");
    
    return <form onSubmit={(e) => {
                e.preventDefault();
                onAddPerson({name, tel , city});
                console.log({name, tel , city});}}>
        <div>
            <input 
                defaultValue={name} 
                onChange={(e) => {setName(e.target.value);}}
                type="text" 
                name="name" 
                placeholder="Imię" 
            />
        </div>
        <div>
            <input 
                defaultValue={tel}
                onChange={(e) => {setTel(e.target.value);}}
                type="tel" 
                name="tel" 
                placeholder="Telefon"
            />
        </div>
        <div>
            <input 
                defaultValue={city}
                onChange={(e) => {setCity(e.target.value);}}
                type="text" 
                name="city" 
                placeholder="Miasto" 
            />
        </div>
        <button disabled={name.length === 0 || tel.length === 0 || city.length === 0}>Zapisz</button>
    </form>
}

export default Form