import Articles from "./components/Articles";
import CheckCalc from "./components/CheckCalc";
import Footer from "./components/Footer";
import ProfileData from "./components/ProfileData";
import Stock from "./components/stock";

export default function Home() {
  return (
    <div>
      <hr className="h-1 bg-orange-300 border"></hr>
      <CheckCalc />
      <hr className="h-1 bg-orange-300 border"></hr>
      <ProfileData />
      <hr className="h-1 bg-orange-300 border"></hr>
      <Articles />
      <hr className="h-1 bg-orange-300 border"></hr>
      <Stock />
      <hr className="h-1 bg-orange-300 border"></hr>
      <Footer/>
    </div>
  );
}
