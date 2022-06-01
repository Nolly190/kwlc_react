import styled from "styled-components";

interface props {
    id: number;
    url: string;
    isMainImage?: boolean;
    onCheck?: any;
    handleDelete: (index: number) => void;
    index: number;
}

const DonationImageItem: React.FC<props> = ({ id, url, isMainImage, onCheck, handleDelete, index }) => {
    return (
        <ImageWrapper>
            <img src={url} alt={url} />
            {onCheck && <label>Main Image<input type="checkbox" name="image" checked={isMainImage} onClick={() => onCheck(id)} /></label>}
            <span onClick={() => handleDelete(index)}>x</span>
        </ImageWrapper>
    );
}

export default DonationImageItem;

const ImageWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 7px;

    & > img {
        height: 170px;
        width: 170px;
    }

    & > label {
        display: flex;
        align-items: center;
        gap: 7px;
        cursor: pointer;

        input {
            width: 16px;
            height: 16px;
            accent-color: #0b0146;
        }
    }

    & > span {
        position: absolute;
        top: 7px;
        right: 7px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        padding-bottom: 7px;
        width: 20px;
        height: 20px;
        font-size: 20px;
        border: 1px solid #073375;
        border-radius: 50%;
        background: #ffffff;
        color: #073375;
        cursor: pointer;
 }
`;