import styled from "styled-components";

interface props {
  width?: string;
  height?: string;
  color?: string;
}

const DualRing: React.FC<props> = ({ width, height, color }) => (
  <Ring width={width} height={height} color={color}></Ring>
);

export default DualRing;

const Ring = styled.div<props>`
  position: relative;
  display: inline-block;
  width: ${(props) => (props.width ? props.width : "25px")};
  height: ${(props) => (props.height ? props.height : "25px")};

  &:after {
    content: "";
    position: absolute;
    top: -8px;
    left: -8px;
    display: inline-block;
    width: 100%;
    height: 100%;
    margin: 8px;
    border-radius: 50%;
    border: ${(props) => props.color ? `6px solid ${props.color}` : "6px solid #fff"};
    border-color: ${(props) => props.color ? `${props.color} transparent ${props.color} transparent` : "#fff transparent #fff transparent"};
    animation: lds-dual-ring 1.2s linear infinite;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
