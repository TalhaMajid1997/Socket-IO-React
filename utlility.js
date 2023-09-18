const IdExist = (Id, Arr, Param) => {
  let result = false
  if (typeof Arr.find((x) => x[`${Param}`] == Id) != 'undefined') {
    result = true
  } else {
    result = false
  }
  return result
}

let UpdateArrayData = (data, arr, id, Param) => {
  const findedIndex = arr.findIndex((x) => x[Param] == id)
  arr[findedIndex] = data
}

module.exports = {
  IdExist,
  UpdateArrayData,
}
