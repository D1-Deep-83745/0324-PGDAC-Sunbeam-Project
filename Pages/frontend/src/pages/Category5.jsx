import BookListing from "../components/Booklisting";
import Header from "../components/Header";
import Footer from "../components/footer";

export function Category5(){
    return (
        <>
        <Header/>
        <h1><center>Category-5 Page</center> </h1>
        <br />
        <br />
        <BookListing/>
        <BookListing/>
        <BookListing/>
        <Footer/>
        </>
    );
}

export default Category5;