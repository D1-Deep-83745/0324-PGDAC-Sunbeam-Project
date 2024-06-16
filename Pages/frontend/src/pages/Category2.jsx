import BookListing from "../components/Booklisting";
import Header from "../components/Header";

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
        </>
    );
}

export default Category2;