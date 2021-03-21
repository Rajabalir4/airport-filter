import React, { Component } from "react";
import Grid from "./Grid";
import { TableProperties, CheckboxFilters } from "../utils/utils";
import airports from "../data/airports";
import Checkbox from "./Checkbox";
import Fuse from 'fuse.js'

export default class FilterAirportContainer extends Component {
  state = {
    index: 0,
    filters: [],
    rows: 4,
    searchString:""
  };
  componentDidMount() {
    this.setState({ airportData: airports });
  }
  render() {
    const { airportData ,filters,index,rows,searchString} = this.state;

    if (!airportData) return <></>;
    let rowData,tempData ;
    tempData= [...airportData];
    rowData = tempData.splice(index,rows) // to achieve immutiblity
    return (
      <div className="container">
        <div className="heading-main">
          Filter <span className="opac">airports</span>
        </div>

        <div>
          <div className="filter-wrapper">
            <div className="checkbox-filters">
              <div className="heading-md">Type</div>
              {Object.keys(CheckboxFilters).map((key,index) => {
                return (
                  <Checkbox
                    label={CheckboxFilters[key]}
                    key={index}
                    checked={filters.includes(key)}
                    handleCheck={() => this.handleCheck(key)}
                  />
                );
              })}
            </div>

            <div className="search-filters">
              <div className="heading-md">Filter by search</div>
              <input type="text" className="input-box" value={searchString} onChange={this.handleChange} />
            </div>
          </div>

          <div className="grid-container">
            <Grid
              TableProperties={TableProperties}
              airportData={rowData}
            />
          </div>

          {this.renderPagingBar(index,rows,airportData)}
        </div>

        
      </div>
    );
  }

  renderPagingBar=(index,rows,airportData)=>{
    const styleDisableArrows = {
      PointerEvent:"none",
      opacity:"0.4",
      cursor: "not-allowed"
    }
    return <div className="paging-bar">
    <img
      className="arrow"
      src={require("../images/left-arrow.svg").default}
      alt="left arrow"
      style={index===0?styleDisableArrows:{}}
      onClick={()=>index>=0?this.handlePaging("DEC"):{}}
    />
    <span className="text-sm">
      showing <b>{index+1} - {(airportData.length)<rows?airportData.length:index+rows}</b> of <b>{airportData.length}</b> results{" "}
    </span>
    <img
      className="arrow"
      src={require("./../images/right-arrow.svg").default}
      alt="right arrow"
      style={airportData.length===index?styleDisableArrows:{}}
      onClick={()=>index <airportData.length ? this.handlePaging("INC"):{}}
    />
  </div>
  }

  handlePaging = (action)=>{
    const {index,rows} = this.state;
    if(action ==="INC")
    this.setState({index:index+rows})
    else if(action==="DEC")
    this.setState({index:index-rows})
  }
  handleChange = (e)=>{
    const { filters } = this.state;
    this.setState({searchString:e.target.value})
    this.ApplyFilters(filters);
  }

  ApplyFilters= (filters) =>{
    
    let {searchString} = this.state;
    const options = {
      keys: Object.keys(TableProperties)
    };
    
    

    var filteredData,fuse;
    const cb = (filt) => (airport) => {
      return filt.includes(airport.type)? true : false;
    };

    if(filters.length>0 )
    filteredData=[...airports.filter(cb(filters))]
    else 
    filteredData= [...airports]

    if(searchString.length>1){
      fuse = new Fuse(filteredData, options);
      filteredData = fuse.search(searchString).map(result=>result.item);
    }
    

    this.setState({
      airportData: filteredData
    });
  }

  handleCheck = (key) => {
    const { filters } = this.state;
    let tempFilter = filters.includes(key)
      ? [...filters.filter((f) => f !== key)]
      : [...filters, key];
      this.setState({
        filters: tempFilter 
      });
    this.ApplyFilters(tempFilter)
   
  
  };
}
