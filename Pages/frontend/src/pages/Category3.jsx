import BookListing from "../components/Booklisting";
import Header from "../components/Header";
import Footer from "../components/footer";

export function Non_Fiction(){
    return (
        <>
        <Header/>
        <h1><center>Non-Fiction</center> </h1>
        <br />
        <br />
        <BookListing/>
        <Footer/>
        </>
    );
}

export default Non_Fiction;