import React from 'react';
import data from "../../../config/imageList.json";
export default class Imagess extends React.Component {
    constructor() {
        super();
        offsetLeft:0;
        console.log(data);
    }

    render() {
        var styles = {
            imagebox:'absolute',
            zIndex:1,
            width:12000,
            height:400,
            left: this.state.offsetLeft
        }
        const {imageList} = this.data.imageList;
        console.log(imageList);
        const newsList =  imageList.map((item, index) => (
                            <img src={item.imgName}/>
            ));
        return(
            <div>
                <div className="showbox">
                    <div style={styles.imagebox}>
                        <img className="image" src="/a/b"/>
                        {newsList}
                    </div>
                    <button className="arrow prev" onClick={(e)=> this.handleClick(-1)}> &lt; </button>
                    <button className="arrow next" onClick={this.handleClick(this, 1)}> &gt; </button>
                </div>

                <div className="message">
                    {}
                </div>
            </div>

        ) ;
    }




}




