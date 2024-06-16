import BookListing from "../components/Booklisting";
import Header from "../components/Header";

export function Category1(){
    return (
        <>
        <Header/>
        <h1><center>Category-1 Page</center> </h1>
        <br />
        <br />
        <BookListing/>
        <BookListing/>
        <BookListing/>
        </>
    );
}

export default Category1;