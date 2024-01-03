import React, { useState } from "react";
import {gql} from '@apollo/client'
import { useMutation} from '@apollo/client'
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();
  const [values, setValues] = useState({
    username:'',
    email:'',
    password:'',
    confirmPassword:''
  })

  const [errors, setErrors] = useState({});


  const onChange = (event) =>{
    setValues({...values, [event.target.name]:event.target.value})
  }

  const [addregister, {loading}] = useMutation(REGISTER_USER,{
    update(_,result){
      console.log(result)
      navigate('/');
    },
      onError(err) {
        if (err.graphQLErrors && err.graphQLErrors.length > 0) {
          setErrors(err.graphQLErrors[0].extensions.errors);
        } else {
          console.error("GraphQL Errors not present", err);
        }
    },
    variables:values
  })

  // if (loading) return 'Submitting...';
  // if (error) return `Submission error! ${error.extensions}`;

  const onSubmit = (event) =>{
    event.preventDefault();
    addregister();
  }

  return (
    <>
    <div className="parent-container">
      {loading ? (<p>Loading....</p>) : (
      <form className="ui form" style={{width:"60%"}} onSubmit={onSubmit}>
        <div className="field">
          <label>Username</label>
          <input type="text" placeholder="Enter username" name="username" value={values.username} onChange={onChange}/>
        </div>
        <div className="field">
          <label>Email</label>
          <input type="text"  placeholder="Enter Email" name="email" value={values.email} onChange={onChange}/>
        </div>
        <div className="field">
          <label>Password</label> 
          <input type="text"  placeholder="Password" name="password" value={values.password} onChange={onChange}/>
        </div>
        <div className="field">
          <label>ConfirmPassword</label>
          <input type="text"  placeholder="Confirm Password" name="confirmPassword" value={values.confirmPassword} onChange={onChange}/>
        </div>
        <button className="ui button" type="submit">Submit</button>
      </form>
          )}
    </div>

{errors && Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        </div>
      )}
</>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username:String!
    $email:String!
    $confirmPassword:String!
    $password:String!
  ){
    register(
      registerInput:{
        username:$username
        email:$email
        confirmPassword:$confirmPassword
        password:$password
      })
    {
      id
    email
    token
    username
    }
  }
`
export default Register;
