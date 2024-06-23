import React, { useState } from 'react';
import PersonInfo from './components/PersonInfo';
import Form from './components/Form';

const initialPeople = [
  {
    name: "Rafał",
    tel: 12345679,
    city:"Kraków",
    id: crypto.randomUUID() //tu zapianamy adres z beakend 
  },
  {
    name:"PanTester",
    tel: 321654987,
    city: "Lublin",
    id: crypto.randomUUID() //tu zapianamy adres z beakend 
  },
  {
    name:"PanTester1",
    tel: 3216456,
    
    id: crypto.randomUUID() //tu zapianamy adres z beakend 
  }

];

//i = 10
//i = i + 1
//i = ?

function App(){
  const [isFormShowe, setIsFormShowe] = useState(false);
  const [people, setPeople] = useState(initialPeople);

  const hendelShoweFormClick = () => setIsFormShowe(true);

  const addPerson = (data) => {
    const newPeople = [...people, data];
    setPeople(newPeople); 
    setIsFormShowe(false);
  };

  return (
    <>
      <h1>Lista Kontaków</h1>
      {isFormShowe ? (<Form onAddPerson={addPerson}/>) : (<button onClick={hendelShoweFormClick}>Dodaj</button>)} 
      <ul>
          {people.map((person) => (
            <PersonInfo 
            key={person.tel}
            name={person.name} 
            tel={person.tel} 
            city={person.city}
         />
        ))}
     </ul>
    </>
  );

  

}
export default App;
