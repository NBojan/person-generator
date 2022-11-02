import { useEffect, useState } from 'react';
import Buttons from './Buttons';
import useFetch from "./useFetch";

const url = "https://randomuser.me/api/";
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'

function App() {
  const [invoker, setInvoker] = useState(0);
  const {data, loading} = useFetch(url,invoker);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("");

  const handleBtn = (e) => {
    if(e.target.classList.contains("icon")){
      setTitle(e.target.dataset.label)
      setValue(person[e.target.dataset.label])
    }
  }

  useEffect(() => {
    if(data){
        const person = data.results[0];
        const {first, last} = person.name;
        const {number, name} = person.location.street;
        const {email, phone} = person;
        const {password} = person.login;
        const {age} = person.dob;
        const {large: image} = person.picture;
        const newPerson = {name: `${first} ${last}`, street: `${number} ${name}`, email, phone, password, age, image};
        setPerson(newPerson);
        setTitle('name')
        setValue(newPerson.name);
    }
  }, [data])

  return (
    <section className="App d-flex justify-center align-center">
      <div className="item">

        <div className="imgCont">
          <img src={person ? person.image : defaultImage} alt="Random User" />
        </div>

        <div className='infoCont'>
          {person && <>
            <div className="ta-center mb-32">
              <p className='col-grey mb-8 fs-18'>My {title} is:</p>
              <h3>{value}</h3>
            </div>

            <Buttons handleBtn={handleBtn}/>
          </>}

          <div className="d-flex justify-center">
            {loading && <button className='btn btn-primary uppercase' type='button' disabled>Loading...</button>}
            {!loading && <button className='btn btn-primary uppercase' type='button' onClick={() => setInvoker(invoker + 1)}>New Person</button>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;