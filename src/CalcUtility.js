const PRICE_PER_KWH = 0.34;
const STAND_CHRG = 0.46;
/* Potential refactor to class, on instanciation declare PRICE_PER_KWH and STAND_CHRG in constructor */

/** Calculate the cost of electricity from the user selected timer
 *  @param watts number of watts
 *  @param hours number of hours used in a day
 *  @param days number of days used
 *  @param costOverTimeDisp string which alters calculation based on "weekly", "monthly" or "yearly"
 *  @param incStandCharge boolean value to flag whether standing charge fee should be added
 *  @return the cost as a string array, monetary units and subunits to two decimal places
 */
export function timerCalc(
  watts,
  hours,
  days = 1,
  { costOverTimeDisp, incStandCharge }
) {
  const kiloWattHours = (watts * hours) / 1000;

  let cost = 0;

  cost += kiloWattHours * PRICE_PER_KWH * days;

  let standChgWeeksAdjust = 1;

  if (costOverTimeDisp === "monthly") {
    // calc electric cost for month (4 weeks)
    cost *= 4;
    standChgWeeksAdjust = 4;
  }

  if (costOverTimeDisp === "yearly") {
    // calc electric cost for year (52 weeks)
    cost *= standChgWeeksAdjust = 52; // TODO check this assignment / calculation
  }

  if (incStandCharge) {
    cost += STAND_CHRG * (days * standChgWeeksAdjust);
  }
  // limit to two decimal places
  const costStr = cost.toFixed(2);

  // split the units and subunits
  const unitsStr = costStr.split(".");

  return [unitsStr[0], unitsStr[1]];
}

export function presetCalc(watts, minutes) {
  // console.log(`presetCalc watts:${watts} minutes:${minutes}`);
  const kiloWattHours = (watts * (minutes / 60)) / 1000;
  // console.log(`minutes(${minutes}) / 60 = ${minutes / 60}`);
  let cost = 0;

  cost += kiloWattHours * PRICE_PER_KWH;

  // limit to two decimal places
  const costStr = cost.toFixed(2);

  // split the units and subunits
  const unitsStr = costStr.split(".");

  return [unitsStr[0], unitsStr[1]];
}
