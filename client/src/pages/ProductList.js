import Categories from "../components/Categories";
import Products from "../components/Products";
import styled from "styled-components";

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
  return (
    <Container>
      <Title>Product List</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select>
            <Option disabled selected>Soap Option</Option>
            <Option>Fragrant Soap</Option>
            <Option>Facial Soap</Option>
            <Option>Assorted Soap</Option>
          </Select>
          <Select>
            <Option disabled selected>Soap Collection</Option>
            <Option>Best Seller</Option>
            <Option>Summer Collection</Option>
            <Option>Rainy Season Collection</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select>
            <Option disabled selected>Sort</Option>
            <Option>Newest</Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>
        </Filter> 
      </FilterContainer>
      <Categories/>
      <Products/>
    </Container>
  )
};

export default ProductList;