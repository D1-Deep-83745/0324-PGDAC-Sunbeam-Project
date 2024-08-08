import BookListing from "../components/Booklisting";
import Header from "../components/Header";
import Footer from "../components/footer";

export function Fiction(){
    return (
        <>
        <Header/>
        <h1><center>Fiction</center> </h1>
        <br />
        <br />
        <BookListing/>
        <Footer/>
        </>
    );
}

export default Fiction;