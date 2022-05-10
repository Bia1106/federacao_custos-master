import styled from 'styled-components';
import { Navbar } from 'react-bootstrap';

export const Container = styled(Navbar)`
  background-image: url('/images/navbar_background.png');
  background-repeat: repeat;

  .logo-container {
    img {
      max-width: 80px;
      height: auto;
    }
  }

  .nav-item {
    &:hover {
      & > .nav-dropdown {
        display: flex;
      }
    }
  }
  .nav-link.nav-btn {
    font-size: 0.7em;
    color: white;
    text-decoration: none;
  }

  .nav-link.nav-btn:hover {
    background-color: #06979e;
  }

  .nav-link.nav-btn.active {
    color: #c8fdcc;
  }

  .nav-btn.nav-btn-dropdown {
    position: relative;
  }

  .nav-dropdown {
    display: none;
    flex-direction: column;
    align-items: center;
    position: absolute;
    background-image: url('/images/navbar_background.png');
    background-repeat: repeat;
    box-shadow: 0px 8px 16px 0px rgb(0 0 0 / 20%);
    z-index: 1;

    .btn-dropdown {
      text-decoration: none;
      font-size: 0.7em;
      color: white;
      text-decoration: none;
      transition: all 0.3s;
      width: 100%;
      &:hover {
        background-color: #06979e;
      }
      &:not(:last-of-type) {
        border-bottom: 1px solid white;
      }
    }
  }

  .user-container {
    display: flex;
    flex-direction: column;

    .info-user {
      font-size: 0.8em;
      color: white;
    }
  }

  .system-info {
    img {
      width: 50px;
      height: auto;
    }
    .version-system {
      span {
        font-size: 0.7em;
        color: white;
        text-align: center;
      }
    }
  }
`;
