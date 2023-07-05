import React from 'react'

const Lists = (props) => {


  return (
    <div>
        <form>
            <label>{`User Id: ${props.userId}`}</label>
            <p></p>
            <label>{`amount: ${props.amount}`}</label>
            <p></p>
            <label>{`address: ${props.address}`}</label>
            <p></p>
            <label>{`contact: ${props.contact}`}</label>
            <p></p>
            <label>{`status: ${props.status}`}</label>
            <p></p>
          
          
         

        </form>
    </div>
  )
}

export default Lists