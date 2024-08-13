import BookListing from "../components/Booklisting";
import Header from "../components/Header";
import Footer from "../components/footer";

export function Novels(){
    return (
        <>
        <Header/>
        <h1><center>Category-5 Page</center> </h1>
        <br />
        <br />
        <BookListing/>
        <Footer/>
        </>
    );
}

export default Novels;