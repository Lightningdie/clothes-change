import ShowWindow from "./ui/ShowWindow"; // 修改为小写ui
import Menubar from "./ui/Menubar";
import "./App.css";
import { useState } from 'react';

function App() {
const [currentCloth, setCurrentCloth] = useState('秋衣'); // 默认显示秋衣

  const handleClothChange = (clothType) => {
    setCurrentCloth(clothType);
  };

  return (
    <div className="App">
      <div className="App-header">
        <span>小猫猫的衣橱</span>
      </div>
      <Menubar onClothChange={handleClothChange} />
      <ShowWindow clothType={currentCloth} />
    </div>
  );
}

export default App;
