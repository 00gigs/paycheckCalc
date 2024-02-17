import Articles from "./components/Articles";
import CheckCalc from "./components/CheckCalc";
import ProfileData from "./components/ProfileData";


export default function Home() {
  return (
  <div>
    
    <CheckCalc/>
    <hr className="h-4 bg-orange-300 border"></hr>
      <Articles/>
      <hr className="h-4 bg-orange-300 border"></hr>
    <ProfileData/>
  </div>
  );
}
