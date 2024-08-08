import BookListing from "../components/Booklisting";
import Header from "../components/Header";
import Footer from "../components/footer";

export function Travel(){
    return (
        <>
        <Header/>
        <h1><center>Category-6 Page</center> </h1>
        <br />
        <br />
        <BookListing/>
        <Footer/>
        </>
    );
}

export default Travel;