import React from 'react';

class Basemap extends React.Component {
    onChange = (e) => {
        var bm = e.currentTarget.value;

        if (this.props.onChange) {
            this.props.onChange(bm);
        }
    }

    render() {
        return (
            <div className="basemaps-container">
                <select value={this.props.basemap} onChange={this.onChange}>
                    <option value="osm">OSM</option>
                    <option value="hot">OSM HOT</option>
                    <option value="dark">Dark</option>
                    <option value="stamen">Stamen</option>
                </select>
            </div>
        );
    }
};

export default Basemap;