import BookListing from "../components/Booklisting";
import Header from "../components/Header";

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
        </>
    );
}

export default Category5;