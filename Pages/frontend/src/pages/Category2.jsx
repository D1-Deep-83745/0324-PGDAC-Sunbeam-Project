import BookListing from "../components/Booklisting";
import Header from "../components/Header";
import Footer from "../components/footer";

export function Category2(){
    return (
        <>
        <Header/>
        <h1><center>Category-2 Page</center> </h1>
        <br />
        <br />
        <BookListing/>
        <BookListing/>
        <BookListing/>
        <Footer/>
        </>
    );
}

export default Category2;