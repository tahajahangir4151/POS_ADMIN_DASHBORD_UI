import "./App.css";
import DashboardCards from "./components/DashboardCard";
import DashboardCharts from "./components/DashboardCharts";
import Header from "./components/Header";
import { sampleData } from "./data/sampleData";

function App() {
  return (
    <div>
      <Header />
      <DashboardCards data={sampleData} />
      <DashboardCharts data={sampleData} />
    </div>
  );
}

export default App;
