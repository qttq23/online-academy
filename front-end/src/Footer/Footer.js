import React from 'react';

const Footer = () => {

    const mystyle = {
        backgroundColor: "#005580",
        padding: "10px 0px",
        fontFamily: "Arial",
        color: "white",
        textAlign: "center",
        position: "fixed",
        bottom: "0",
        width: "100%",
    };

    return (
        <div style={mystyle}>
            <p>Copyright &copy; WNC 17CLC-KTPM</p>
        </div>
    )
}

export default Footer;