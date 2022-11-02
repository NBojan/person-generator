import { useEffect, useState } from 'react';
import Buttons from './Buttons';

const url = "https://randomuser.me/api/";
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'

function App() {
  const [loading, setLoading] = useState(false);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("Random Person");

  const handleBtn = (e) => {
    if(e.target.classList.contains("icon")){
      setTitle(e.target.dataset.label)
      setValue(person[e.target.dataset.label])
    }
  }

  const fetching = async () => {
    setLoading(true);

    const response = await fetch(url);
    const data = await response.json();
    const person = data.results[0];
    const {first, last} = person.name;
    const {number, name} = person.location.street;
    const {email, phone} = person;
    const {password} = person.login;
    const {age} = person.dob;
    const {large: image} = person.picture;
    const newPerson = {name: `${first} ${last}`, street: `${number} ${name}`, email, phone, password, age, image};

    setPerson(newPerson);
    setLoading(false);
    setTitle("name")
    setValue(newPerson.name);
  }

  useEffect(() => {
    fetching();
  }, [])
  
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
              <h2>{value}</h2>
            </div>

            <Buttons handleBtn={handleBtn}/>
          </>}

          <div className="d-flex justify-center">
            {loading && <button className='btn btn-primary uppercase' type='button' disabled>Loading...</button>}
            {!loading && <button className='btn btn-primary uppercase' type='button' onClick={fetching}>New Person</button>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
