import colors from "../../util/ColorUtil";

const alphabet = "abcdefghijklmnopqrstuvwxyz";


const Chart = ({ max, counts }) => {
  return (
    <div className="flex flex-col chart">
      { counts?.map((count, i) => {
        const style = { width: ((count/max) * 100) + "%" };
        return (
          <span className="flex h-10 mb-2" key={i}>
            <label className="flex items-center justify-center text-sm font-bold  w-10"> {alphabet[i]} </label>
            { max > 0 && <span className={colors[i] + "flex bar"} style={style}></span> }
          </span>
        )
      })}
    </div>
  )
}

export default Chart;