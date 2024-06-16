import BookListing from "../components/Booklisting";
import Header from "../components/Header";

export function Category3(){
    return (
        <>
        <Header/>
        <h1><center>Category-3 Page</center> </h1>
        <br />
        <br />
        <BookListing/>
        <BookListing/>
        <BookListing/>
        </>
    );
}

export default Category3;