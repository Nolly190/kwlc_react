import { useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { deleteCategoryApi, updateCategoryApi } from '../../../../../api/blog.api';
import ConfirmationModal from '../../../../../components/confirmationModal';
import { CategoryItem } from '../../../../../dto/Blog.dto';
import { statusEnum } from '../../../../../enums/util.enum';
import { StyledButton } from '../../branchDashboard/styles';

interface props {
    category: CategoryItem;
    handleClose: () => void;
}

const Entry: React.FC<props> = ({ category, handleClose }) => {
    const [clickedEdit, setClickedEdit] = useState(false)
    const [changed, setChanged] = useState(false)
    const [categoryItem, setCategoryItem] = useState(category)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleEdit = async () => {
        if (changed) {
            const response = await updateCategoryApi(categoryItem);
            if (response.code >= statusEnum.ok) {
                toast.success("Category Updated Successfully");
                setChanged(false)
                setClickedEdit(false)
            } else {
                toast.error(response.message);
            }
        } else {
            setClickedEdit(true)
        }
    }

    const handleDelete = async () => {
        const response = await deleteCategoryApi(category.id)
        if (response.code >= statusEnum.ok) {
            toast.success("Category Deleted Successfully");
            handleClose();
        } else {
            toast.error(response.message);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryItem({ ...category, name: e.target.value })
        setChanged(true)
    }

    return (
        <EntryWrapper>
            <input
                type="text"
                className="form-control"
                id="imageUrl"
                name="imageUrl"
                defaultValue={category.name}
                disabled={!clickedEdit}
                onChange={handleChange}
                value={categoryItem.name}
                element-data="imageUrl"
            />
            <EntryButtonWrapper>
                <EntryButton onClick={handleEdit}>{changed ? "Save" : "Edit"}</EntryButton>
                <EntryButton onClick={onOpen}>Delete</EntryButton>
            </EntryButtonWrapper>
            <ConfirmationModal
                title={"Delete Item"}
                description="Are you sure you want to delete this item?"
                action={handleDelete}
                isOpen={isOpen}
                onClose={onClose}
            />
        </EntryWrapper>
    )
}

export default Entry

const EntryWrapper = styled.div`
    display: flex;
    gap: 40px;
    align-items: center;
    margin-bottom: 40px;
    padding: 0 40px;
    
    & > input {
        width: 55%;
        font-size: 16px;
    }

    @media (max-width: 465px) {
        padding: 0 10px;
    }
`;

const EntryButtonWrapper = styled.div`
    display: flex;
    gap: 15px;
`;

const EntryButton = styled(StyledButton)`
    height: 30px;
    width: fit-content;
    padding: 0 20px;
    color: white;
    font-size: 14px;
    margin-top: 0;  
`;