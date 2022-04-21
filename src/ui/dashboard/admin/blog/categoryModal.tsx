import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { createCategoryApi, getCategoriesApi } from '../../../../api/blog.api';
import Modal from '../../../../components/modal';
import { CategoryItem, CreateCategoryItem } from '../../../../dto/Blog.dto';
import { statusEnum } from '../../../../enums/util.enum';
import StyledInput from '../branchDashboard/components/styledInput';
import { Button, ButtonWrapper, NewUserHeader, SlidersBodyWrapper, SlidersModalContainer, SlidersModalHeaderContainer } from '../branchDashboard/styles';
import Entry from './components/entry';

interface props {
    isOpen: boolean;
    closeModal: () => void;
}

const initialState = {
    name: '',
}

const CategoryModal: React.FC<props> = ({ isOpen, closeModal }) => {
    const [category, setCategory] = useState<CreateCategoryItem>(initialState)
    const [categories, setCategories] = useState<CategoryItem[]>([])

    useEffect(() => {
        getCategories()
    }, [])

    async function getCategories() {
        const response = await getCategoriesApi()
        setCategories(response.data)
        console.log("gato", response.data)
    }

    const handleClose = () => {
        closeModal();
    };

    const handleAddInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory({ ...category, [e.target.name]: e.target.value })
    }

    const addCategory = async () => {
        const response = await createCategoryApi(category);
        if (response.code >= statusEnum.ok) {
            toast.success("Category Created successfully");
            getCategories()
        } else {
            toast.error(response.message);
        }
        setCategory(initialState)
    }

    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
            <SlidersModalContainer width="45vw">
                <SlidersModalHeaderContainer>
                    <NewUserHeader>
                        <p>Manage Categories</p>
                        <span></span>
                    </NewUserHeader>
                    <span onClick={() => handleClose()}>x</span>
                </SlidersModalHeaderContainer>
                <SlidersBodyWrapper>
                    <AddWrapper>
                        <StyledInput
                            name="name"
                            width={100}
                            height={45}
                            onChange={handleAddInputChange}
                            value={category.name}
                        />
                        <AddButton onClick={addCategory}>Add</AddButton>
                    </AddWrapper>
                    <EntryContainer>
                        {categories?.length > 0 && categories.map((category, index) => (<Entry key={index} category={category} />))}
                    </EntryContainer>
                    {/* <ButtonWrapper>
                        <Button onClick={handleSubmit}>
                            <p>Submit</p>
                        </Button>
                    </ButtonWrapper> */}
                </SlidersBodyWrapper>
            </SlidersModalContainer>
        </Modal>
    )
}

export default CategoryModal

const AddWrapper = styled.div`
    display: flex;
    gap: 40px;
    align-items: center;
    margin-bottom: 40px;

    & > input {
        width: 45%;
    }
`;

const AddButton = styled(Button)`
    color: white;
    width: 120px;
    margin-top: 0;
    margin-bottom: 2px;
    height: 40px;
`;

const EntryContainer = styled.div`
    height: 200px;
    overflow-y: scroll;
`;