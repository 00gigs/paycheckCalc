import Articles from "./components/Articles";
import CheckCalc from "./components/CheckCalc";


export default function Home() {
  return (
  <div>
    
    <CheckCalc/>
    <hr className="h-5 bg-orange-300 border"></hr>
      <Articles/>
    <hr className="h-4"></hr>
    
  </div>
  );
}
