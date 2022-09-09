import React from "react"
import { useState } from "react"
import api from '../api'

const Users=()=>{
    const [users, setUsers] = useState(api.users.fetchAll())
   console.log(users) 
    const handDelete = (userId) => {
console.log(userId)
      setUsers(users.filter(user => user._id != userId))

      console.log(users)
    }

    let numberPeople = users.length

    const getPhraseClasses =()=>{
      let classes = ''
      classes += numberPeople===0 ? 'btn btn-danger fs-4': 'btn btn-primary fs-4'
      return classes          
  }

    const renderPhrase = (number) => {
      let text = ''
      if (number == 0) {
        text = 'Никто с тобой не тусанет'

      } else if (number > 4) {
        text = number + ' человек тусанет с тобой сегодня'
      } else if (number < 5 && number > 0)
      text = number +  ' человека тусанет с тобой сегодня'

      return text
    }

    return <>
        <h2 className={getPhraseClasses()}>{renderPhrase(numberPeople)}</h2>
    <table class="table">
  <thead>
    <tr>
      <th scope="col">Имя</th>
      <th scope="col">Качества</th>
      <th scope="col">Профессия</th>
      <th scope="col">Встретился раз</th>
      <th scope="col">Оценка</th>
      <th scope="col">delete</th>
    </tr>
  </thead>
  <tbody>
  {users.map(user => {

    return <>
      <tr>
      <td>{user.name}</td>
      <td>
        {user.qualities.map(qualiti => {
            let qualitColor = 'badge m-1 bg-' + qualiti.color

        return <span className={qualitColor}>{qualiti.name}</span>
      })}      
      </td> 
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}/5</td>
      <td> <button className="btn btn-danger" onClick={()=>handDelete(user._id)}>delete</button></td>
      </tr>
    </>
    
  })}
  </tbody>
</table></>
}

export default Users