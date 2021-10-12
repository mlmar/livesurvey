const label = "flex text-gray-700 font-bold mb-2 ";
const text = "appearance-none rounded text-gray-700 w-full leading-tight bg-gray-100 focus:shadow-inner focus:outline-none px-4 py-2 ";

const hover = {
  blue: "focus:outline-none hover:bg-blue-500 ",
  red: "focus:outline-none hover:bg-red-500 "
}

const button = {
  blue: "appearance-none text-white font-bold bg-blue-400 rounded px-4 py-1 focus:outline-none " + hover.blue,
  red: "appearance-none text-white font-bold bg-red-400 rounded px-4 py-1 focus:outline-none " + hover.red,
}


const styles = { label, text, button, hover };

export default styles;