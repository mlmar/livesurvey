const label = "flex text-gray-700 font-bold mb-2 ";
const text = "appearance-none rounded text-gray-700 w-full leading-tight bg-gray-100 focus:shadow-inner focus:outline-none px-4 py-2 ";
const textCenter = "appearance-none rounded text-gray-700 leading-tight text-center bg-gray-100 focus:shadow-inner focus:outline-none px-4 py-2 ";

const disabled = {
  plain: "disabled:cursor-not-allowed ",
  blue: "disabled:bg-blue-300 disabled:hover:bg-blue-300 disabled:cursor-not-allowed ",
  red: "disabled:bg-red-300 disabled:hover:bg-red-300 disabled:cursor-not-allowed ",
  green: "disabled:bg-green-300 disabled:hover:bg-green-300 disabled:cursor-not-allowed ",
}

const hover = {
  plain: "hover:",
  blue: "hover:bg-blue-500 ",
  red: "hover:bg-red-500 ",
  green: "hover:bg-green-500 ",
}

const button = {
  plain: "appearance-none text-white font-bold rounded px-4 py-1 focus:outline-none ",
  blue: "appearance-none text-white font-bold bg-blue-400 rounded px-4 py-1 focus:outline-none " + hover.blue + disabled.blue,
  red: "appearance-none text-white font-bold bg-red-400 rounded px-4 py-1 focus:outline-none " + hover.red + disabled.red,
  green: "appearance-none text-white font-bold bg-green-400 rounded px-4 py-1 focus:outline-none " + hover.green + disabled.green,
}

const panel = "flex flex-col shadow-md p-8 py-10 bg-white rounded-md lg:w-1/2 md:w-9/12 w-11/12 ";


const styles = { label, text, textCenter, button, hover, panel };

export default styles;