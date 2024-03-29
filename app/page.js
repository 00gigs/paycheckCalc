import Articles from "./components/Articles";
import CheckCalc from "./components/CheckCalc";
import Footer from "./components/Footer";
import { Fourm } from "./components/fourm";
import MultiChartDisplay from '../app/components/multiplechart'
import Stock from "./components/stock";

export default function Home() {
  return (
    <div>
      <div className="h-1 bg-slate-800 w-full"></div>
      <CheckCalc />
      <div className="h-1 bg-slate-800 w-full"></div>
      <Articles />
      <div className="h-1 bg-slate-800 w-full"></div>
      {/* <Stock /> */}
      {/* <MultiChartDisplay/> */}
      <div className="h-1 bg-slate-800 w-full"></div>
      <Fourm/>
      <div className="h-1 bg-slate-800 w-full"></div>
      <Footer/>
    </div>
  );
}
