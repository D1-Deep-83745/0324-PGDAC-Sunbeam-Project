import BookListing from "../components/Booklisting";
import Header from "../components/header";
import Footer from "../components/footer";

export function Newrelease(){
    return (
        <>
        <Header/>
        <h1><center>New-Release</center> </h1>
        <br />
        <br />
        <BookListing/>
        <Footer/>
        </>
    );
}

export default Newrelease;