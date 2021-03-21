import React from "react";
import formatcoords from "formatcoords";

export default function Grid(props) {
  var keys = Object.keys(props.TableProperties);
  var headings = Object.keys(props.TableProperties).map(
    (key) => props.TableProperties[key]
  );

  const renderHeading = () => {
    return headings.map((heading, index) => {
      return <th key={index}>{heading}</th>;
    });
  };

  const renderRows = (airportData) => {
    
    const airportDataFormatedCords = airportData.map((airport) => {
      var coords = formatcoords(airport.latitude,airport.longitude);
      let coordsString =coords.format('XDDMMss', {latLonSeparator: ', ',  decimalPlaces: 0})
      let [lat,long]=coordsString.split(",")
    
      return { ...airport,
        type:airport.type.toUpperCase() + "",
        elevation:airport.elevation + "",
        latitude:lat,
        longitude:long
       };
    });

    return airportDataFormatedCords.map((airport) => {
      return (
        <tr key={airport.id}>
          {keys.map((key, index) => {
            return <td key={index}>{airport[key]}</td>
          })}
        </tr>
      );
    });
  };

  return (
    <table className="grid">
      <thead>
        <tr>{renderHeading()}</tr>
      </thead>
      <tbody>{renderRows(props.airportData)}</tbody>
    </table>
  );
}
