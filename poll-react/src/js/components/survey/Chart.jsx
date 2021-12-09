import { useMemo } from "react";
import colors from "../../util/ColorUtil";

const alphabet = "abcdefghijklmnopqrstuvwxyz";

const getMaxLengths = (arr) => {
  if(!arr) return;
  let max = 0;
  for(let i = 0; i < arr.length; i++) {
    if(max < arr[i]) max = arr[i];
  }
  return max;
}

const Chart = ({ counts }) => {
  const max = useMemo(() => getMaxLengths(counts), [counts]);

  return (
    <div className="flex flex-col chart">
      { counts?.map((count, i) => {
        const width = (count/max) * 100;

        const style = { width: width + "%" };
        return (
          <span className="flex h-10 mb-2" key={i}>
            <label className="flex items-center justify-center text-sm font-bold  w-10"> {alphabet[i]} </label>
            { max > 0 && 
              <span className={colors[i] + "flex bar"} style={style}> 
                { count > 0 && <label className="text-sm font-bold"> {count} </label> }
              </span> 
            }
          </span>
        )
      })}
    </div>
  )
}

export default Chart;