
import React, {  useState } from "react";

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import "./transnav.css";
import { useTranslation } from 'react-i18next';
import { useTheme } from '@material-ui/core/styles';



const Header = () => {

  const [activeHeader, setActiveHeader] = useState(false)
  const [navbarExpanded, setNavbarExpanded] = useState(false)



  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    if (scrollY >= 210) {

      setActiveHeader(true)
    } else if (
      scrollY < 210 &&
      navbarExpanded === false
    ) {

      setActiveHeader(false)

    }
  });



  const containerstyle = {
    marginTop: "10px",
    marginBottom: " 10px",

  };
  const [t, i18n]= useTranslation();
  const theme = useTheme();
  document.body.dir = i18n.dir();

  // const changeLanguage = (lng) => { 
  //   i18n.changeLanguage(lng)
  //   document.body.dir = i18n.dir();
  //   theme.direction = i18n.dir();
  // }
  
  console.log(i18n.language);
  return (

    <div>
      <nav
        className={`navbar navbar-expand-lg navbar-light fixed-top  ${activeHeader || window.location.pathname !== '/' ? "nav" : ""}`}
      >
        <Navbar
          expand="lg"
          variant="light"

          expanded={navbarExpanded}
          onToggle={(expanded) => {
            const scrollY = window.scrollY;

            const shouldHeaderBeActive = ((_) => {
              if (expanded === true) {
                return true;
              } else if (
                expanded === false &&
                scrollY < 210
              ) {
                return false;
              } else {
                return true;
              }
            })();


            setNavbarExpanded(expanded)
            setActiveHeader(shouldHeaderBeActive)

          }}
        >

          <Container style={containerstyle}>
            <Navbar.Brand href="/" className={`center-navbar  ${activeHeader || window.location.pathname.startsWith('/admin') || window.location.pathname !== "/" ? "text-dark" : "text-light"}`} >Buy It</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/" className={`center-navbar  ${activeHeader || window.location.pathname.startsWith('/admin') || window.location.pathname !== "/" ? "text-dark" : "text-light"}`} >{t('Home')}</Nav.Link>
                <Nav.Link href="/products" className={`center-navbar  ${activeHeader || window.location.pathname.startsWith('/admin') || window.location.pathname !== "/" ? "text-dark" : "text-light"}`} >{t('Products')}</Nav.Link>
                <Nav.Link href="/categories" className={`center-navbar  ${activeHeader || window.location.pathname.startsWith('/admin') || window.location.pathname !== "/" ? "text-dark" : "text-light"}`} >{t('Categories')}</Nav.Link>

                <Nav.Link href="/contact" className={`center-navbar  ${activeHeader || window.location.pathname.startsWith('/admin') || window.location.pathname !== "/" ? "text-dark" : "text-light"}`} >{t('Contact')}</Nav.Link>



              </Nav>

              <Nav>
                {
                  i18n.language == 'en' && <Nav.Link  onClick={() =>{ i18n.changeLanguage('ar');
                 }} variant="outline-light" className={`center-navbar  border-0   ${activeHeader || window.location.pathname.startsWith('/admin') || window.location.pathname !== "/" ? "text-dark" : "text-light"} `}>ar</Nav.Link>
                
                
                }
                {
                  i18n.language == 'ar' && <Nav.Link  onClick={() =>{ i18n.changeLanguage('en');
                 }} variant="outline-light" className={`center-navbar  border-0   ${activeHeader || window.location.pathname.startsWith('/admin') || window.location.pathname !== "/" ? "text-dark" : "text-light"} `}>en</Nav.Link>
                }
                <Nav.Link href="/search" className={`center-navbar  ${activeHeader || window.location.pathname.startsWith('/admin') || window.location.pathname !== "/" ? "text-dark" : "text-light"}`} >
                  <SearchOutlinedIcon />
                </Nav.Link>
                <Nav.Link href="/login" className={`center-navbar  ${activeHeader || window.location.pathname.startsWith('/admin') || window.location.pathname !== "/" ? "text-dark" : "text-light"}`} >
                  <AccountCircleOutlinedIcon />
                </Nav.Link>

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </nav>



    </div>


  );

}
export default Header
