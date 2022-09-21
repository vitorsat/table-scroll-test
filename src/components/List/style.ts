import styled from 'styled-components'

export const Itens = styled.div`
  background-color: #353742;
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 20vh;
  height: auto;

  margin: 0.75rem;
  padding: 1vh;

  &:hover {
    background-color: black;
    cursor: pointer;
    box-shadow: 0px 0px 10px 3px rgba(189, 195, 199, 0.5);
  }

  p {
    font-size: 2vh;
    text-align: center;
  }
`