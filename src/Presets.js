import React, { useState, useEffect } from "react";

function Presets({ presets, setPreset }) {
  const [selectVal, setSelectVal] = useState("");
  const [presetDesc, setPresetDesc] = useState("");

  const [showPresets, setShowPresets] = useState(true);

  const NO_PRE_AVAIL = "No presets available.";

  /* Runs on initial render to check if there is any Presets and if so
  update the initial Preset description */
  useEffect(() => {
    // console.log("Running useEffect on Preset.js init");
    if (presets.length === 0) {
      setPresetDesc(NO_PRE_AVAIL);
    } else {
      setPresetDesc(presets[0].desc);
    }
  }, []);

  useEffect(() => {
    // console.log("Running useEffect on Preset.js on mutation of presets var");
    if (presets.length === 0) {
      setShowPresets(false);
      setPresetDesc(NO_PRE_AVAIL);
    } else {
      setShowPresets(true);
      setPresetDesc(presets[0].desc);
    }
  }, [presets]);

  function handleSelect(e) {
    setSelectVal(e.target.value);
    setPresetDesc(presets[e.target.selectedIndex].desc);

    // set Preset
    setPreset(presets[e.target.selectedIndex]);
  }

  return (
    <div className="preset-container">
      <select
        name="presets"
        id="presets"
        value={selectVal}
        onChange={handleSelect}
        disabled={!showPresets}
      >
        {presets.map((preset) => {
          return (
            <option key={preset.id} name={preset.name} id="">
              {preset.name}
            </option>
          );
        })}
      </select>
      <p>{presetDesc}</p>
    </div>
  );
}

export default Presets;
