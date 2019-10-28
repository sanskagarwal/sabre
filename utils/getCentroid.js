const getCentroid = (polygonCoords) => {
  if (!polygonCoords || !(polygonCoords instanceof Array)) {
    return {
      status: 0,
      x: -1,
      y: -1,
      msg: "Array Required"
    };
  }
  let signedArea = 0, Cx = 0, Cy = 0;
  for (let i = 0; i < polygonCoords.length - 1; i++) {
    const xi = Number(polygonCoords[i][0]);
    const xi1 = Number(polygonCoords[i + 1][0]);
    const yi = Number(polygonCoords[i][1]);
    const yi1 = Number(polygonCoords[i + 1][1]);
    Cx += (xi + xi1) * (xi * yi1 - xi1 * yi);
    Cy += (yi + yi1) * (xi * yi1 - xi1 * yi);
    signedArea += (xi * yi1 - xi1 * yi)
  }
  signedArea /= 2;
  try {
    Cx /= (6 * signedArea);
    Cy /= (6 * signedArea);
    return {
      status: 1,
      Cx,
      Cy
    };
  } catch (e) {
    console.log("Divide By zero");
    return {
      status: 0,
      x: -1,
      y: -1,
      msg: "Divide By zero"
    };
  }
};

module.exports = getCentroid;