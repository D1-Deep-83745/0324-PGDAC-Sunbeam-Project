import BookListing from "../components/Booklisting";
import Header from "../components/header";
import Footer from "../components/footer";

export function Childrens(){
    return (
        <>
        <Header/>
        <h1><center>Category-4 Page</center> </h1>
        <br />
        <br />
        <BookListing/>
        <Footer/>
        </>
    );
}

export default Childrens;