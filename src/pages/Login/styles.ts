import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-content: center;

  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)),
    url('/images/login_image.jpg');
  background-size: cover;
  background-repeat: no-repeat;

  .container {
    height: 100%;
    align-content: center;
  }
  .container-card {
    max-width: 400px;
    margin: 0 auto;
    margin-top: 50px;
  }

  .card {
    margin-button: 100px
    height: 300px;
    width: 100%;
    background-color: var(--color-background-login) !important;
  }

  .social_icon span {
    font-size: 60px;
    margin-left: 10px;
    color: var(--color-primary);
  }

  .social_icon span:hover {
    color: white;
    cursor: pointer;
  }

  .card-header h3 {
    color: white;
  }

  .social_icon {
    position: absolute;
    right: 20px;
    top: -45px;
  }

  .input-group-prepend span {
    width: 50px;
    background-color: var(--color-primary);
    color: black;
    border: 0 !important;
  }

  input:focus {
    outline: 0 0 0 0 !important;
    box-shadow: 0 0 0 0 !important;
  }

  .remember {
    color: white;
  }

  .remember input {
    width: 20px;
    height: 20px;
    margin-left: 15px;
    margin-right: 5px;
  }

  .login-btn {
    color: white;
    background-color: var(--color-primary);
    width: 100px;
    transition: all 0.2s;
  }

  .login-btn:hover {
    color: white;
    filter: brightness(0.7);
  }

  .links {
    color: white;
  }

  .links a {
    margin-left: 4px;
  }

  .logos-container {
    img {
      max-width: 130px;
      height: auto;
    }

    img + img {
      margin-left: 15px;
    }
  }
`;
