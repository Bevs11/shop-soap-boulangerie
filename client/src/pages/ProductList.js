import Categories from "../components/Categories";
import Products from "../components/Products";
import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { ShopContext } from "../context/ShopContextProvider";


const Container = styled.div``;
const Title = styled.h1`
margin: 20px;
`;
const FilterContainer = styled.div`
display: flex;
justify-content: space-between;
`;
const Filter = styled.div`
margin: 20px;
`;
const FilterText = styled.span`
font-size: 20px;
font-weight: bold;
margin-right: 10px;
`;
const Select = styled.select`
padding: 10px;
margin-right: 20px;
`;
const Option = styled.option``;

const ProductList = () => {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const { soapsData, settingSoapsData, soapFilters, setSoapFilters} = useContext(ShopContext);

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({...filters, [e.target.name]: value})
    
  }

  useEffect(()=>{
    setSoapFilters(filters)
  },[filters])

  return (
    <Container>
      <Title>Product List</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="type" onChange={handleFilters}>
            <Option disabled selected>Soap Option</Option>
            <Option value={"fragrant soap"}>Fragrant Soap</Option>
            <Option value={"facial soap"}>Facial Soap</Option>
            <Option value={"body soap"}>Body Soap</Option>
            <Option value={"all"}>All</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select name="sort" onChange={handleFilters}>
            <Option disabled selected>Sort</Option>
            <Option value={"ascending"}>Price (asc)</Option>
            <Option value={"descending"}>Price (desc)</Option>
          </Select>
        </Filter> 
      </FilterContainer>
      <Categories/>
      <Products filters={filters}/>
    </Container>
  )
};

export default ProductList;