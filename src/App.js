import "./App.css";
import { useEffect, useState } from "react";

/**
 * Two child components one for input one for display.
 * @returns
 */

function App() {
  const [tipPercentage, setTipPercentage] = useState(15);
  const [bill, setBill] = useState(0);
  const [tip, setTip] = useState(0);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [tipPerGroup, setTipPerGroup] = useState(tip);
  const [activeState, setActiveState] = useState("fifteen-percent");

  useEffect(() => {
    const calculateTip = () => {
      const tip = ((tipPercentage / 100) * bill).toFixed(2);
      const tipPerGroup = (
        (tipPercentage / 100) *
        bill *
        numberOfPeople
      ).toFixed(2);
      setTipPerGroup(tipPerGroup);

      setTip(tip);
    };
    calculateTip();
  }, [bill, tipPercentage, numberOfPeople]);

  return (
    <div className="App">
      <p className="splitter">SPLITTER</p>
      <div className="components flex__container">
        <Input
          setBill={setBill}
          setTipPercentage={setTipPercentage}
          setNumberOfPeople={setNumberOfPeople}
          activeState={activeState}
          setActiveState={setActiveState}
        />
        <Display
          tip={tip}
          tipPerGroup={tipPerGroup}
          setBill={setBill}
          setActiveState={setActiveState}
          setTipPercentage={setTipPercentage}
          setNumberOfPeople={setNumberOfPeople}
        />
      </div>
    </div>
  );
}

export default App;

const Input = ({
  setBill,
  setTipPercentage,
  setNumberOfPeople,
  activeState,
  setActiveState,
}) => {
  return (
    <div className="input-container">
      <div>
        <p className="input-heading">Bill</p>
        <input
          type="number"
          dir="rtl"
          name="bill"
          id="bill"
          onChange={(e) => {
            setBill(e.target.value);
          }}
        />
      </div>
      <div className="tips">
        <p className="input-heading">Select Tip %</p>
        <div className="flex__container">
          <p
            className={`tip-value five ${activeState}`}
            onClick={() => {
              setActiveState("five-percent");
              setTipPercentage(5);
            }}
          >
            5%
          </p>
          <p
            className={`tip-value ten ${activeState}`}
            onClick={() => {
              setActiveState("ten-percent");
              setTipPercentage(10);
            }}
          >
            10%
          </p>
          <p
            className={`tip-value fifteen ${activeState}`}
            onClick={() => {
              setActiveState("fifteen-percent");
              setTipPercentage(15);
            }}
          >
            15%
          </p>
          <p
            className={`tip-value twenty-five ${activeState}`}
            onClick={() => {
              setActiveState("twenty-five-percent");
              setTipPercentage(25);
            }}
          >
            25%
          </p>
          <p
            className={`tip-value fifty ${activeState}`}
            onClick={() => {
              setActiveState("fifty-percent");
              setTipPercentage(50);
            }}
          >
            50%
          </p>
          <input
            type="number"
            placeholder="Custom"
            id="customPercentage"
            className={`tip-value custom ${activeState}`}
            onChange={(e) => {
              setTipPercentage(e.target.value);
            }}
          />
        </div>
      </div>
      <div>
        <p className="input-heading">Number of People</p>
        <input
          type="number"
          dir="rtl"
          name="numberOfPeople"
          id="numberOfPeople"
          onChange={(e) => {
            setNumberOfPeople(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

const Display = ({
  tip,
  tipPerGroup,
  setBill,
  setActiveState,
  setTipPercentage,
  setNumberOfPeople,
}) => {
  return (
    <div className="display-container">
      <div className="flex__container">
        <div>
          <p className="tip__amount">Tip Amount</p>
          <p>/ person</p>
        </div>
        <p className="tip__amount-value">${tip}</p>
      </div>
      <div className="flex__container">
        <div>
          <p className="tip__amount">Total</p>
          <p>/ person</p>
        </div>
        <p className="tip__amount-value">${tipPerGroup}</p>
      </div>
      <div
        className="reset-button"
        onClick={() => {
          const inputs = Array.from(document.getElementsByTagName("input"));
          inputs.forEach((input) => {
            input.value = " ";
          });
          setBill(0);
          setActiveState("fifteen-percent");
          setTipPercentage(15);
          setNumberOfPeople(1);
        }}
      >
        RESET
      </div>
    </div>
  );
};
