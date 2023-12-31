import React, { useReducer, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SimpleBackdrop from "../components/SimpleBackdrop";


const Container = styled.div`
width: 100vw;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 20px 0; 
`;
const Wrapper = styled.div`
width: 80%;
`;
const Options = styled.div`
`;
const Title = styled.h1`
margin: 20px;
`;
const Input = styled.input`
flex: 1;
min-width: 50%;
height: 20px;
margin: 10px 10px 0 0;
`;
const Label = styled.label`
height: 20px;
margin: 10px 10px 0 0;
font-family: helvetica;
font-weight: 200;
`;
const Button = styled.button`
width: 95%;
background-color: rgb(230, 230, 230);
padding: 5px;
cursor: pointer;
font-size: 20px;
font-weight: bold;
border-radius: 5px;
margin-top: 20px;
margin-bottom: 20px;


&:hover{
    background-color: pink;
}
`;
const InputCheckbox = styled.input`
margin: 10px;
`;
const ImageContainer = styled.div`
width: 350px;
height: auto;
background-color: grey;
display: flex;
flex-direction: column;
justify-content: center;
`;

const Image = styled.img`
`;

const AddProducts = () => {
    const  navigate = useNavigate(); //navigate to dashboard
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const token = localStorage.getItem('token');
    const config = {
        headers: {"Authorization": `Bearers ${token}`}
    };
    function handleClickRemove(e) {
        e.preventDefault();
        alert("Item Removed"); 
    };

    const initialState = {
        title: '',
        img: '',
        description: '',
        price: 0,
        productId: '',
        isActive: false
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    function onChange(e) {              
        const action = {
            input: e.target.name,
            value: e.target.value
        }                
        dispatch(action);
    };
    function isChecked(e){
        const action = {
            input: e.target.name,
            value: e.target.checked
        }
        dispatch(action);
    };
    function categoryHandler(e){

        if(e.target.checked){
            if(!categories.includes(e.target.value)){
                setCategories([...categories, e.target.value ]);
                console.log("categories", e.target.value);
            }
        }
        dispatch({input: "categories", value: categories});
    }
    function reducer(state, action) {
        return {...state, [action.input] : action.value};
    };
    const sendData = async() => {
        dispatch({input: "img", value: image});
        // console.log(state);
        console.log("categories", categories);
        setLoading(true);
        try {
          const response = await axios.post('https://shop-soap-boulangerie-api.onrender.com/api/v1/products/addproduct', state, config );
          console.log(response)
          alert('product is added')
        } catch (error) {
          alert('cannot send product. Product ID invalid');
        }
        setLoading(false);
      };
    function handleClick(e) {
        e.preventDefault();
        sendData();
    };

    const uploadImage = () => {
        
        if (file == null) return;
        const fileName = `trialUpload/${file.name + v4()}`;
        const imageRef = ref(storage, fileName);
        uploadBytes(imageRef, file).then((item) => {
          getDownloadURL(item.ref).then((url) => {
            setImage(url);
            
          });
        });
      };

  return (
    <div>
        {loading 
        ? <SimpleBackdrop/>
        :               
        <Container>
            <Title>ADMIN DASHBOARD</Title>
            <Wrapper>
                    <form>
                        <h1>Add an item</h1>
                            <ImageContainer>
                                <div style={{width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: "5px"}}>
                                {
                                    image ? (
                                        <img src={image} style={{ maxWidth: "100%", maxHeight: "100%" }} />
                                      ) : (
                                        <AddPhotoAlternateIcon style={{width: "60%", height: "60%"}}/>
                                      )
                                }
                                </div>
                                
                                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center", width: "100%"}}>
                                    <input
                                    style={{ marginBottom: "1rem" }}
                                    type="file"
                                    id="file"
                                    accept=".png,.jpeg,.jpg"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    />
                                    <button onClick={uploadImage} style={{marginBottom: "5px"}}>Upload</button>
                                </div>
                            </ImageContainer>
                            <div>
                                <Label>Name of Item:</Label>
                                <Input 
                                    type='text'
                                    name='title'
                                    placeholder='title'
                                    onChange={onChange}
                                    required/>
                            </div>
                            <div>
                                <Label>Image URL:</Label>
                                <Input 
                                    type='text'
                                    name='img'
                                    value={image}
                                    placeholder='image url'
                                    onChange={onChange}
                                    required/>
                            </div>
                            <div>
                                <Label>Description:</Label>
                                <Input 
                                    type='text'
                                    name='description'
                                    placeholder='description'
                                    onChange={onChange}
                                    required/>
                            </div>
                            <div>
                                <Label>Price of Item:</Label>
                                <Input 
                                    type='text'
                                    name='price'
                                    placeholder='price'
                                    onChange={onChange}
                                    required/>
                            </div> 
                            <div>
                                <Label>Item Code:</Label>
                                <Input 
                                    type='text'
                                    name='productId'
                                    placeholder='item code'
                                    onChange={onChange}
                                    required/>
                            </div>
                            <div>
                                <InputCheckbox 
                                        type='checkbox'
                                        name='isActive'
                                        onChange={e => isChecked(e)}
                                        required/>
                                <Label>active</Label>
                            </div>
                            <div style={{marginTop: "10px"}}>
                                <Label >Categories</Label>
                            </div>
                            <div>
                                <InputCheckbox 
                                    type='checkbox'
                                    name='categories'
                                    value= "body soap"
                                    onChange={e => categoryHandler(e)}
                                    required/>
                                <Label>Body Soap</Label>
                            </div>
                            <div>
                                <InputCheckbox 
                                    type='checkbox'
                                    name='categories'
                                    value= "fragrant soap"
                                    onChange={e => categoryHandler(e)}
                                    required/>
                                <Label>Fragrant Soap</Label>
                            </div>
                            <div>
                                <InputCheckbox 
                                    type='checkbox'
                                    name='categories'
                                    value= "facial soap"
                                    onChange={e => categoryHandler(e)}
                                    required/>
                                <Label>Facial Soap</Label>
                            </div>
                    
                        
                        <Button onClick={handleClick}> 
                          ADD PRODUCT
                        </Button>  
                    </form>
                    <a onClick={() => navigate("/dashboard")}>
                        <Button>Return to Dashboard</Button>
                    </a>
            </Wrapper>
        </Container>
        }
    </div>
  )
};

export default AddProducts;