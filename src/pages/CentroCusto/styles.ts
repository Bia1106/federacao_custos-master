import styled from 'styled-components';

export const Container = styled.div``;

export const Form = styled.form`
  margin: 0px auto;
  display: grid;
  width: 100%;
`;

export const Label = styled.label`
  margin-bottom: 0.5em;
  color: palevioletred;
  display: block;
  color: #f0a500;
`;

export const TD = styled.td`
  td {
    box-sizing: border-box;
    color: #3e3e3e;
    padding: 8px;
    white-space: nowrap;
    width: 400px;
    background-color: #f0a500;
  }
`;
export const Input = styled.input`
  input[type="checkbox"] + label:before,
  width: 100%;
  padding: 1em;
  line-height: 1.4;
  background-color: #f9f9f9;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  -webkit-transition: 0.35s ease-in-out;
  -moz-transition: 0.35s ease-in-out;
  -o-transition: 0.35s ease-in-out;
  transition: 0.35s ease-in-out;
  transition: all 0.35s ease-in-out;
  :focus {
    outline: 0;
    border-color: #bd8200;
  }

:checked + label,
:checked + label:before,
:focus,
:active {
  background-color: #f0a500;
  color: #fff;
  border-color: #bd8200;
}

`;
